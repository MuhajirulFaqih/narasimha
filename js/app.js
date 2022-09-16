// Scroll
gsap.registerPlugin(ScrollTrigger, Draggable);

// Hero
const hero = gsap.timeline({
    scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: "#hero",
    }
});
hero.fromTo(".hero-image", {opacity: 0, scale: 0, y: 400 }, { duration: 1, opacity: 1, scale: 1, y: 0 })
.fromTo("#about", {scale: 0, y: -80 }, { duration: 3.5, scale: 1, y: 0 }, "+=.5")
.to(".about-content-body", { duration: 4, bottom: 0 }, "+=.5");

// Experience
var slideLength, maxScroll;
var proxy = $(".experience-slider-inner");
var trigger = ScrollTrigger.create({
    scrub: true,
    trigger: "#experience",
    pin: ".experience-sticky",
    start: "top top",
    end: "bottom bottom",
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onRefresh: onResize,
    onUpdate: updateHandler
});
var draggable = Draggable.create(proxy, {
    type: "x",
    bounds: {minX: (- $(".experience-slider-inner")[0].offsetWidth), maxX: 0},
    onDrag: function() {
        var xPosition = - this.x
        var xTotal = - $(".experience-slider-inner")[0].offsetWidth
        var percentage = (xPosition / xTotal) * -1
        var yStart = trigger.start
        var yEnd = trigger.end
        var scrollValue = ((yEnd - yStart) * percentage) + yStart
        if(percentage <= 0) {
            trigger.scroll(scrollValue + 10)
        } else {
            trigger.scroll(scrollValue - 10)
        }
    }
})[0];
function onResize () {
    if (trigger) {
        slideLength = $(".experience-slider-inner")[0].offsetWidth; 
        updateHandler();
    }
}
function updateHandler () {
    if (trigger.isActive) {
        draggable.enable()
    } else {
        draggable.disable()
    }
    gsap.set(".experience-slider-inner", {x: - (slideLength * trigger.progress) });
}
$(".experience-nav.prev").click(function() {
    var valueScroll = $("html, body").scrollTop()
    $("html, body").animate({scrollTop: valueScroll - 400}, 300, "easeInCubic");
})
$(".experience-nav.next").click(function() {
    var valueScroll = $("html, body").scrollTop()
    $("html, body").animate({scrollTop: valueScroll + 400}, 300, "easeInCubic");
})