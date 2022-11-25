const max_opacity = 0.6;
var update_interval = 40;
var fade_in_speed = 0.02;
var isLoaded = false;
var curOpacity = 1;
var fadeOutInterval;

function GetFadeOpacity(element) {
    var scroll = $(window).scrollTop();
    var opacity = ((800 + scroll) / 800) - 1;
    if (isLoaded) {
        if (opacity < max_opacity) {
            element.css({ "opacity": opacity });
        }
        else {
            element.css({ "opacity": max_opacity });
        }
    }
}

$(window).scroll(function () {
    GetFadeOpacity($(".fade-on-scroll"));
});

function FadeOut(amount, element) {
    curOpacity = curOpacity - amount;
    element.css({ "opacity": curOpacity });
    if (curOpacity <= 0) {
        element.css({ "opacity": 0 });
        clearInterval(fadeOutInterval);
        isLoaded = true;
    }
}

$("#godot-container").ready(function () {
    $(".fade-on-scroll").css({ "opacity": 1 });
    isLoaded = false;

    setTimeout(() => {

        fadeOutInterval = setInterval(function () {
            FadeOut(fade_in_speed, $(".fade-on-scroll"));
        }, update_interval);
    }, 200);

});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));