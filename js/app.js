// Scroll
gsap.registerPlugin(ScrollTrigger, Draggable);

let mm = gsap.matchMedia();
mm.add("(min-width: 800.98px)", () => {
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
        .to(".about-content-body", { duration: 4, bottom: 0 }, "+=.5")
        .to(".about-title", { duration: 4, x: 72 }, "-=4")
        .to(".about-cta", { duration: 4, x: -72 }, "-=4")
        .to(".about-footer", { duration: 4, x: -96 }, "-=4");
    
    const heroParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        }
    });
    heroParallax.to(".hero-scroll", { duration: 1, y: 96 })
                .to(".hero-title small", { duration: 1, x: 56 }, "-=1")
                .to(".hero-title span", { duration: 1, x: -90 }, "-=1")

    const skillsParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top +=350",
            scrub: true,
        }
    });
    skillsParallax.to(".skills-box", { duration: 1, y: 90 })
                .to(".skills-point-4", { duration: 1, y: 100 }, "-=1")
                .to(".skills-point-6", { duration: 1, x: 80 }, "-=1")
                .to(".skills-point-7", { duration: 1, x: -80 }, "-=1")
                .to(".skills-point-8", { duration: 1, x: -100 }, "-=1")
    
    const experienceParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#experience",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        }
    });
    experienceParallax.fromTo(".experience-image-object .overlay", { opacity: 0, y: 0}, { duration: 1, scale: 2.5, transformOrigin:"50% 50%", y: "-35%", opacity: 1 })
    
    const portfolioParallax = gsap.timeline({
        scrollTrigger: {
            trigger: ".portfolio-content",
            start: "top +=250",
            end: "bottom bottom",
            scrub: true,
        }
    });
    $(".portfolio-project").each(function(i, v) {
        if(i%2 == 0) {
            portfolioParallax.to($(v), { duration: 1, y: 100 })
        } else {
            portfolioParallax.to($(v), { duration: 1, y: -100 }, "-=.5")
        }
    })
    
    const touchParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#touch",
            start: "top +=200",
            end: "bottom bottom",
            scrub: true,
        }
    });
    touchParallax.to(".touch-left", { duration: 1, x: 0 })
                .to(".touch-right", { duration: 1, x: 0 }, "-=1")

    // Experience
    var slideLength;
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
    
});

mm.add("(max-width: 800.98px)", () => {
    var draggable = Draggable.create($(".experience-slider-inner"), {
        type: "x",
        inertia: true,
        bounds: {minX: - ( $(".experience-slider-inner")[0].offsetWidth + 300), maxX: 0},
    })[0];
    var minX = - ($(".experience-slider-inner")[0].offsetWidth + 300)
    $(".experience-nav.prev").click(function() {
        if(draggable.x < 0) {
            var newDrag = draggable.x + 200
            draggable.x = newDrag
            gsap.set(".experience-slider-inner", {x: newDrag})
            draggable.update(true)
        }
    })
    $(".experience-nav.next").click(function() {
        if(draggable.x > minX) {
            var newDrag = draggable.x - 200
            draggable.x = newDrag
            gsap.set(".experience-slider-inner", {x: newDrag})
            draggable.update(true)
        }
    })

    const hero = gsap.timeline({
        scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        }
    });
    hero.to(".hero-image", { duration: 2, opacity: 1, scale: 1, y: 32 })
        .fromTo("#about", { rotationX: "-90deg", transformPerspective: 500, force3D: true, transformOrigin: "top center", transformStyle: "preserve-3d" }, { duration: 5, rotationX: "0deg" })
        .to(".about-content-body", { duration: 6, bottom: 0 }, "+=4")
        .to(".about-title", { duration: 2, x: 8 }, "-=4")
        .to(".about-cta", { duration: 2, x: -8 }, "-=4")
        .to(".about-footer", { duration: 2, x: -24 }, "-=4");
    
    const heroParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
        }
    });
    heroParallax.to(".hero-scroll", { duration: 1, y: 24 })
                .to(".hero-title small", { duration: 1, x: 24 }, "-=1")
                .to(".hero-title span", { duration: 1, x: -32 }, "-=1")
    
    const skillsParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#skills",
            start: "top +=100",
            scrub: true,
        }
    });
    skillsParallax.to(".skills-box", { duration: 1, y: 40 })
                .to(".skills-point-4", { duration: 1, y: 48 }, "-=1")
                .to(".skills-point-6", { duration: 1, x: 32 }, "-=1")
                .to(".skills-point-7", { duration: 1, x: -32 }, "-=1")
                .to(".skills-point-8", { duration: 1, x: -32 }, "-=1")
    
    const portfolioParallax = gsap.timeline({
        scrollTrigger: {
            trigger: ".portfolio-content",
            start: "top +=100",
            end: "bottom bottom",
            scrub: true,
        }
    });
    $(".portfolio-box-outer").each(function(i, v) {
        if(i == 0) {
            portfolioParallax.to($(v), { duration: 1, y: -60 });
        } else {
            portfolioParallax.to($(v), { duration: 1, y: -60 }, "-=.5");
        }
    })
    portfolioParallax.to(".portfolio-cta", { duration: 1, y: -60 }, "-=.5");
    
    const touchParallax = gsap.timeline({
        scrollTrigger: {
            trigger: "#touch",
            start: "top +=200",
            end: "bottom bottom",
            scrub: true,
        }
    });
    touchParallax.to(".touch-left", { duration: 1, x: 0 })
                .to(".touch-right", { duration: 1, x: 0 }, "-=1");

    const touchParallaxText = gsap.timeline({
        scrollTrigger: {
            trigger: "#touch",
            start: "top +=210",
            end: "bottom bottom",
            scrub: true,
        }
    });
    touchParallaxText.to(".touch-contact", { duration: 1, y: 80 })
                .to(".touch-title", { duration: 1, y: 80 }, "-=.8");
})