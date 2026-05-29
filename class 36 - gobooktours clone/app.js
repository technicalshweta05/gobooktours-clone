// =========================
// AOS INIT
// =========================

AOS.init({
    duration: 1000,
    once: true
});


// =========================
// STICKY HEADER
// =========================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    }
    else{
        header.classList.remove("scrolled");
    }

});


// =========================
// MOBILE MENU TOGGLE
// =========================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

});


// =========================
// MOBILE MEGA MENU ACCORDION
// =========================

const megaParents = document.querySelectorAll(".mega-parent");

megaParents.forEach(parent => {

    const trigger = parent.querySelector("a");

    trigger.addEventListener("click", (e) => {

        if(window.innerWidth < 992){

            e.preventDefault();

            parent.classList.toggle("active");

        }

    });

});


// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({
                behavior:"smooth"
            });

        }

    });

});


// =========================
// HERO SLIDER
// =========================

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dot");

let currentSlide = 0;
let sliderInterval;

// SHOW SLIDE

function showSlide(index){

    slides.forEach((slide) => {

        slide.classList.remove("active");

    });

    dots.forEach((dot) => {

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

// NEXT SLIDE

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

// AUTOPLAY

function startSlider(){

    sliderInterval = setInterval(() => {

        nextSlide();

    }, 5000);

}

startSlider();

// DOT CLICK

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        currentSlide = index;

        showSlide(currentSlide);

    });

});

// PAUSE ON HOVER

const heroSlider = document.querySelector(".hero-slider");

heroSlider.addEventListener("mouseenter", () => {

    clearInterval(sliderInterval);

});

heroSlider.addEventListener("mouseleave", () => {

    startSlider();

});

// =========================
// TOUCH SWIPE
// =========================

let touchStartX = 0;
let touchEndX = 0;

heroSlider.addEventListener("touchstart", (e) => {

    touchStartX = e.changedTouches[0].screenX;

});

heroSlider.addEventListener("touchend", (e) => {

    touchEndX = e.changedTouches[0].screenX;

    if(touchStartX - touchEndX > 50){

        nextSlide();

    }

    if(touchEndX - touchStartX > 50){

        currentSlide--;

        if(currentSlide < 0){
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }

});


// =========================
// COUNTER ANIMATION
// =========================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.getAttribute("data-target");

            let count = 0;

            const updateCounter = () => {

                const increment = target / 100;

                if(count < target){

                    count += increment;

                    counter.innerText = Math.ceil(count).toLocaleString();

                    requestAnimationFrame(updateCounter);

                }
                else{

                    counter.innerText = target.toLocaleString();

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

}, { threshold:0.5 });

counters.forEach(counter => {

    counterObserver.observe(counter);

});