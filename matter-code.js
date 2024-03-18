gsap.registerPlugin(ScrollTrigger);

//hero load
let uberHero = gsap.timeline({
  defaults: {
    ease: "expo.out",
    duration: 2,
  },
});

const uberHeroSplit = SplitType.create("#split-hero", {
  types: "lines",
});

uberHero
  .set(".section_uber-uns-hero, .header_navbar, .uber-uns_hero-donut", {
    autoAlpha: 1,
  })
  .from(".uber-uns_hero-donut", { rotation: -190, yPercent: -120 }, 0)
  .from("h1", { yPercent: 160, stagger: 0.2 }, 0)
  .from(uberHeroSplit.lines, { yPercent: 100, opacity: 0, stagger: 0.1 }, 0.5)
  .from(".overflow-hidden.is-uber-uns-hero", { height: 0 }, 0)
  .from(
    ".overflow-hidden.is-uber-uns-hero img",
    { scale: 1.5, transformOrigin: "50% 0" },
    0,
  )
  .from(
    ".uber-uns_hero-image2, .uber-uns_hero-image3",
    {
      opacity: 0,
      rotate: 10,
      yPercent: -15,
      xPercent: -30,
      stagger: { each: 0.2, from: "end" },
    },
    0.2,
  );

//team
gsap.from(".team_donut", {
  rotate: 120,
  duration: 2,
  transformOrigin: "50% 0",
  xPercent: -30,
  ease: "expo.out",
  scrollTrigger: {
    start: "top 50%",
    trigger: ".team_collection-list",
  },
});

//team slider
// gsap.set(".popup-slider", { display: "none" });

let itemClick = gsap.timeline({
  paused: true,
  defaults: {
    ease: "expo.out",
    duration: 1,
  },
});

itemClick
  .set(".popup-slider", { display: "flex" })
  .set("body", { overflow: "hidden" })
  .from(".team-popup_background-text", { xPercent: -110 }, 0.7)
  .from(".popup-background", { width: 0 }, 0.5)
  .from(".popup-left-donut", { rotate: 90, yPercent: -50, xPercent: -70 }, 0.75)
  .from(".popup-slider .splide", { xPercent: -100 }, 0.7)
  .from(".button.is-popup", { y: "-5rem" }, "<");

function SlideNumberPopup(Splide, Components) {
  const { track } = Components.Elements;

  let wrapperElm, totalElm;

  function mount() {
    const arrowsWrapper = document.querySelector(".popup-arrows-wrapper");

    if (!arrowsWrapper) {
      console.error("Element with class 'popup-arrows-wrapper' not found.");
      return;
    }

    wrapperElm = document.createElement("div");
    wrapperElm.classList.add("map_popup-slide-numbers-wrapper");
    wrapperElm.style.textAlign = "center";
    arrowsWrapper.appendChild(wrapperElm);

    currentElm = document.createElement("div");
    currentElm.classList.add("map_popup-current-number");
    currentElm.style.display = "inline-block";
    wrapperElm.appendChild(currentElm);

    totalElm = document.createElement("div");
    totalElm.classList.add("map_popup-total-number");
    totalElm.style.display = "inline-block";
    wrapperElm.appendChild(totalElm);

    update();
    Splide.on("move", update);
  }

  function update() {
    currentElm.textContent = Splide.index + 1;
    totalElm.textContent = `/${Splide.length}`;
  }

  return {
    mount,
  };
}

let items = document.querySelectorAll(".team_collection-item");
let mapBackButton = document.querySelector(".button.is-popup");

items.forEach(function (item, index) {
  let teamHover = gsap.timeline({
    paused: true,
    defaults: {
      ease: "expo.out",
      duration: 0.75,
    },
  });

  teamHover
    .to(item.querySelector("img"), { scale: 1.1 })
    .fromTo(
      item.querySelector(".team_collection-arrow-cutter"),
      { width: 0 },
      { width: "auto", marginLeft: "1rem" },
      0,
    )
    .to(
      item.querySelector(".team_collection-title-content"),
      {
        paddingRight: "1rem",
      },
      0,
    );

  if (viewportWidth > 992) {
    item.addEventListener("mouseenter", function () {
      teamHover.play().timeScale(1);
    });

    item.addEventListener("mouseleave", function () {
      teamHover.reverse().timeScale(-3);
    });
  }

  item.addEventListener("click", function () {
    itemClick.play().timeScale(1);
    setTimeout(function () {
      popupSplide.go(index);
    }, 100);
  });
});

let popupSplide = new Splide(".splide.is-popup", {
  type: "loop",
  perPage: 1,
  pagination: false,
  speed: 1500,
  updateOnMove: true,
  lazyLoad: false,
}).mount({ SlideNumberPopup });

//

let popupBackButton = document.querySelector(".button.is-popup");
popupBackButton.addEventListener("click", function () {
  itemClick.reverse().timeScale(-2);
});

gsap.from(".team_circle", {
  scale: 0,
  duration: 2,
  xPercent: 30,
  ease: "expo.out",
  scrollTrigger: {
    start: "bottom bottom",
    trigger: ".team_collection-list",
  },
});

Splide.defaults = {
  arrows: true,
  perMove: 1,
  updateOnMove: true,
};

//puzzle

gsap.to("#puzzle-animated path", {
  opacity: 0,
  stagger: { each: 0.1, from: "random" },
  duration: 0.1,
  scrollTrigger: {
    trigger: ".section_join",
    start: "top 90%",
    end: "center 50%",
    scrub: 1,
  },
});

//big puzzle
let bigPuzzle = gsap.timeline({
  scrollTrigger: {
    trigger: ".join_component-second",
    start: "top 70%",
    end: "bottom 60%",
    scrub: 2,
  },
  onComplete: ScrollTrigger.refresh(),
});

bigPuzzle
  .from(".join_big-puzzle-1", { yPercent: -450, rotation: -156 })
  .from("#puzzle-content1", { opacity: 0 }, "<20%")
  .from(".join_big-puzzle-2", { yPercent: -450, rotation: 204 })
  .from("#puzzle-content2", { opacity: 0 }, "<20%")
  .from(".join_big-puzzle-3", { yPercent: -520, rotation: -114 })
  .from("#puzzle-content3", { opacity: 0 }, "<20%")
  .from(".join_big-puzzle-4", { yPercent: -450, rotation: 99 })
  .from("#puzzle-content4", { opacity: 0 }, "<20%");

//geschichte slider
function SlideNumber(Splide, Components) {
  const { track } = Components.Elements;

  let wrapperElm, currentElm, totalElm;

  function mount() {
    const wrapper = document.querySelector(".geschichte_slider-static");

    if (!wrapper) {
      console.error(
        "Element with class 'geschichte_arrows-wrapper' not found.",
      );
      return;
    }

    wrapperElm = document.createElement("div");
    wrapperElm.classList.add("geschichte_slider-numbers-wrapper");
    wrapperElm.style.textAlign = "center";
    wrapper.appendChild(wrapperElm);

    currentElm = document.createElement("div");
    currentElm.classList.add("geschichte_slider-current-number");
    currentElm.style.display = "inline-block";
    wrapperElm.appendChild(currentElm);

    totalElm = document.createElement("div");
    totalElm.classList.add("geschichte_slider-total-number");
    totalElm.style.display = "inline-block";
    wrapperElm.appendChild(totalElm);

    update();
    Splide.on("move", update);
  }

  function update() {
    currentElm.textContent = Splide.index + 1;
    totalElm.textContent = `/${Splide.length}`;
  }

  return {
    mount,
  };
}

// image slider

let mapSplide = new Splide(".splide.is-geschichte", {
  perPage: 3,
  type: "loop",
  speed: 1500,
  focus: "center",
  flickMaxPages: 1,
  pagination: false,
  ease: "cubic-bezier(.19, 1, .22, 1)",
  flickMaxPages: 1,
});

let mapSplideSecond = new Splide(".splide.is-geschichte-second", {
  perPage: 1,
  type: "fade",
  speed: 1500,
  focus: "center",
  flickMaxPages: 1,
  pagination: false,
  arrows: false,
  ease: "cubic-bezier(.19, 1, .22, 1)",
});

mapSplide.sync(mapSplideSecond);
mapSplide.mount();
mapSplideSecond.mount();

//geschichte heading

gsap.from(".geschichte_heading-wrapper h2", {
  yPercent: 130,
  duration: 2,
  ease: "expo.out",
  stagger: 0.1,
  scrollTrigger: {
    start: "top 70%",
    trigger: ".geschichte_heading-wrapper",
  },
});

//history slider

let timelineSplide = new Splide(".splide.is-timeline", {
  perPage: 1,
  type: "loop",
  direction: "ttb",
  // heightRatio: 1.333,
  height: "52rem",
  width: "100%",
  speed: 1500,
  focus: "center",
  flickMaxPages: 1,
  pagination: false,
  ease: "cubic-bezier(.19, 1, .22, 1)",
  breakpoints: {
    479: { height: "25rem" },
  },
});

let timelineTextSplide = new Splide(".splide.is-timeline-text", {
  perPage: 1,
  type: "fade",
  speed: 1500,
  focus: "center",
  flickMaxPages: 1,
  pagination: false,
  arrows: false,
  ease: "cubic-bezier(.19, 1, .22, 1)",
});

timelineSplide.sync(timelineTextSplide);
timelineSplide.mount();
timelineTextSplide.mount();

let timelineControls = document.querySelectorAll(
  ".timeline_years-control-item",
);

timelineControls.forEach((control, index) => {
  control.addEventListener("click", () => {
    timelineSplide.go(index);
    timelineTextSplide.go(index);
    updateTimelineControls(index); // Update the timeline controls
  });
});

function updateTimelineControls(activeIndex) {
  timelineControls.forEach((item) => item.classList.remove("is-active"));
  timelineControls[activeIndex].classList.add("is-active");
}

timelineTextSplide.on("move", function () {
  var activeIndex = timelineTextSplide.index;
  updateTimelineControls(activeIndex);
});

function refreshSplideSize() {
  timelineSplide.refresh();
}

function debounce(func, delay) {
  var timeoutId;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

window.addEventListener("resize", debounce(refreshSplideSize, 300));
