let windowHeight = document.documentElement.clientHeight;
let arrowTop = document.getElementById("arrowTop");

document.addEventListener("scroll", () => {
    if (scrollY > windowHeight) {
        arrowTop.classList.add("active");
    } else arrowTop.classList.remove("active");
});
arrowTop.addEventListener("click", () =>
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    })
);

//    fixed menu  bg

let programFix = document.querySelector(".nav-fixed");
let mainContent = document.querySelector(".header-title");

const progFixed = () => {
    let scrollTop = window.scrollY;
    let routeCenter = mainContent.offsetHeight / 2;

    if (scrollTop >= routeCenter) {
        programFix.classList.add("animation-nav");
    } else {
        programFix.classList.remove("animation-nav");
    }
};

window.addEventListener("scroll", () => {
    progFixed();
});

//    burger

let burger = document.getElementsByClassName("burger")[0];
let show = document.getElementsByClassName("nav-items")[0];

burger.addEventListener("click", () => {
    burger.classList.toggle("show-menu");
    show.classList.toggle("show");
});

//  scroll to element

const smoothLinks = document.querySelectorAll(".nav-link");
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener("click", function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute("href");

        document.querySelector(id).scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });
}

// slider
var slider = document.getElementById("slider"),
    sliderItems = document.getElementById("items"),
    prev = document.getElementById("prev"),
    next = document.getElementById("next");

slide(slider, sliderItems, prev, next);

function slide(wrapper, items, prev, next) {
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName("slide"),
        slidesLength = slides.length,
        slideSize = items.getElementsByClassName("slide")[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add("loaded");

    // Mouse and Touch events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener("touchstart", dragStart);
    items.addEventListener("touchend", dragEnd);
    items.addEventListener("touchmove", dragAction);

    // Click events
    prev.addEventListener("click", function () {
        shiftSlide(-1);
    });
    next.addEventListener("click", function () {
        shiftSlide(1);
    });

    // Transition events
    items.addEventListener("transitionend", checkIndex);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == "touchstart") {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == "touchmove") {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = items.offsetLeft - posX2 + "px";
    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, "drag");
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, "drag");
        } else {
            items.style.left = posInitial + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir, action) {
        items.classList.add("shifting");

        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft;
            }

            if (dir == 1) {
                items.style.left = posInitial - slideSize + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = posInitial + slideSize + "px";
                index--;
            }
        }

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove("shifting");

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}

//    tabs  filter  section

let faqItemWrapper = document.querySelectorAll(".faq-item-wrapper");
let faqItem = document.querySelectorAll(".fag-item");

faqItemWrapper.forEach(
    (item) =>
        (item.onclick = () => {
            item.parentNode.classList.toggle("change-bg");
            item.nextElementSibling.classList.toggle("faq-active");
            let labelIcon = item.lastElementChild;
            let icons = labelIcon.lastElementChild;
            icons.classList.toggle("faq-rotate");
        })
);
