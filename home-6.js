const h1 = SplitType.create("h1", {
  types: "lines, words",
});

const overheadSplit = SplitType.create("#hero-overhead", {
  types: "lines, words",
});

let heroLoad = gsap.timeline({
  defaults: { duration: 3, ease: "expo.out" },
});

heroLoad
  .set(".section_home-hero, .header_navbar, .home_hero-donut", { autoAlpha: 1 })
  .from("#home_hero-donut", { rotate: 220, transformOrigin: "0 50%" }, 0)
  .from(h1.words, { yPercent: 187.5, stagger: 0.03, rotate: -20 }, 0)
  .from("#hero-button", { yPercent: 180, rotate: -10 }, 0)
  .from(".home-hero_image-wrapper img", { yPercent: 100, scale: 2 }, 0)
  .from(".header_navbar", { yPercent: -100 }, "<0.5");

// scrolled hero
gsap.to(".home-hero_image-wrapper", {
  yPercent: 7,
  scrollTrigger: {
    trigger: ".section_home-hero",
    start: "top 10%",
    end: "bottom top",
    scrub: 1.5,
  },
});

gsap.to(".section_map h2", {
  yPercent: 25,
  scrollTrigger: {
    trigger: ".section_map",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5,
  },
});



Splide.defaults = {
  perPage: 3,
  arrows: true,
  perMove: 1,
  updateOnMove: true,
  arrowPath:
    "M12.5977 21.4433C12.583 21.4583 12.4756 21.9137 12.3592 22.4552C12.2427 22.9968 12.1664 23.4454 12.1896 23.4523C12.2128 23.4591 12.5882 23.5097 13.0239 23.5647C13.8989 23.6751 14.9227 23.9579 15.5648 24.2663C17.566 25.2278 18.9068 26.9845 19.279 29.1327L19.3738 29.6797L20.2517 29.6674L21.1297 29.6551L21.2061 29.157C21.7065 25.8937 24.111 23.737 27.7483 23.2888C27.9858 23.2595 28.18 23.2258 28.1798 23.2139C28.1783 23.1041 27.7143 21.2909 27.679 21.257C27.6536 21.2325 27.4308 21.2541 27.1841 21.3051C24.4525 21.8701 22.2448 23.4088 21.3403 25.378L21.1234 25.8504L20.9704 16.2014L20.8736 10.1L19.0969 10.125L19.1717 16.2424L19.2892 25.8691L18.9808 25.2809C18.1806 23.755 16.6362 22.5597 14.5761 21.8719C13.9892 21.676 12.6534 21.3866 12.5977 21.4433Z",
};

new Splide("#flugel-slider", {
  pagination: false,
  perPage: 3,
  type: "loop",
  speed: 1500,
  height: "52.75rem",
  direction: "ttb",
  focus: "center",
  gap: "5rem",
  flickMaxPages: 1,
  ease: "cubic-bezier(.19, 1, .22, 1)",
  breakpoints: {
    640: {
      gap: 0,
    },
    479: {
      drag: false,
    },
  },
}).mount();

//section animations

gsap.from(".experience_heading-wrapper h2", {
  scrollTrigger: { trigger: ".experience_heading-wrapper", start: "top 75%" },
  xPercent: -70,
  opacity: 0,
  duration: 2.5,
  ease: "expo.out",
  stagger: 0.2,
});

gsap.fromTo(
  ".huge-background-text.is-all-events-second",
  { yPercent: -20 },
  {
    yPercent: 20,
    scrollTrigger: {
      trigger: ".section_experience",
      start: "15% top",
      end: "bottom top",
      scrub: 4,
    },
  },
);

gsap.fromTo(
  ".huge-background-text.is-all-events",
  { yPercent: 20 },
  {
    yPercent: -20,
    scrollTrigger: {
      trigger: ".section_experience",
      start: "top 50%",
      end: "60% top",
      scrub: 4,
    },
  },
);

if (viewportWidth > 479) {
  gsap.to(".experience_events-list > :nth-child(odd)", {
    yPercent: 40,
    scrollTrigger: {
      trigger: ".section_experience",
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
    },
  });

  gsap.to(".experience_events-list > :nth-child(even)", {
    yPercent: -20,
    scrollTrigger: {
      trigger: ".section_experience",
      start: "top bottom",
      end: "bottom top",
      scrub: 3,
    },
  });
}

let aufenthaltSection = gsap.timeline({
  defaults: { duration: 1.5, ease: "expo.out" },
  scrollTrigger: { trigger: ".section_privaten-aufenthalt", start: "top 80%" },
});

aufenthaltSection
  .from(
    ".privaten-aufenthalt_image-circle, #auftenhalt-image",
    {
      scale: 0,
      ease: "back.out",
      stagger: { each: 0.2, from: "end" },
    },
    0,
  )
  .from(
    ".privaten-aufenthalt_heading",
    { xPercent: -70, opacity: 0, stagger: 0.1 },
    0,
  );

const bigNumber = SplitType.create(".home-uber-uns_big-number", {
  types: "lines, words, chars",
});

let uberUnsSection = gsap.timeline({
  defaults: { duration: 1.5, ease: "expo.out" },
  scrollTrigger: { trigger: "#home-uber", start: "top 50%" },
});

uberUnsSection
  .from(
    bigNumber.chars,
    {
      yPercent: 110,
      transformOrigin: "0 50%",
      stagger: 0.05,
      rotate: -20,
    },
    0,
  )
  .from(
    ".home-uber-uns_small-number",
    {
      yPercent: 125,
      delay: 0.55,
      rotate: 20,
    },
    0,
  )
  .from(".home-uber-uns_image", { x: "-50vw", yPercent: -60, rotate: -40 }, 0)
  .from(".line-horizontal.is-home-uber-uns", { width: 0, duration: 3 }, 0)
  .from(
    ".location-card-data.is-home-uber-uns",
    { opacity: 0, duration: 3 },
    0.5,
  );

gsap.from(".flugel_splide-background", {
  rotate: 180,
  xPercent: 60,
  ease: "expo.out",
  duration: 3,
  transformOrigin: "100% 50%",
  scrollTrigger: {
    trigger: ".section_flugel",
    start: "top 60%",
  },
});
