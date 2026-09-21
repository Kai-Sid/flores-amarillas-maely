(() => {
  const surprise = document.getElementById("surprise");
  const celebrate = document.getElementById("celebrate");
  const openButton = document.getElementById("open");
  const stars = document.getElementById("stars");
  const fireflies = document.getElementById("fireflies");
  const petals = document.getElementById("petals");
  const sparkles = document.getElementById("sparkles");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const narrow = window.innerWidth < 480;
  const DAWN_DELAY = prefersReducedMotion ? 0 : 1000;
  const DAY_DELAY = prefersReducedMotion ? 0 : 1700;
  const OPENING_HOLD = prefersReducedMotion ? 0 : 2400;

  let opened = false;

  function scatter(layer, count, extra) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i += 1) {
      const el = document.createElement("span");
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 55}%`;
      el.style.animationDelay = `${Math.random() * 4}s`;
      extra?.(el);
      fragment.append(el);
    }

    layer.append(fragment);
  }

  function startPetals(count) {
    petals.replaceChildren();
    if (prefersReducedMotion) return;

    for (let i = 0; i < count; i += 1) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.animationDuration = `${9 + Math.random() * 8}s`;
      petal.style.animationDelay = `${-Math.random() * 12}s`;
      petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
      petal.style.setProperty("--spin", `${180 + Math.random() * 180}deg`);
      petal.style.opacity = String(0.38 + Math.random() * 0.5);
      petals.append(petal);
    }
  }

  function startSparkles(count) {
    sparkles.replaceChildren();
    if (prefersReducedMotion) return;

    for (let i = 0; i < count; i += 1) {
      const spark = document.createElement("span");
      spark.style.left = `${18 + Math.random() * 64}%`;
      spark.style.top = `${18 + Math.random() * 50}%`;
      spark.style.animationDuration = `${3.4 + Math.random() * 3}s`;
      spark.style.animationDelay = `${Math.random() * 2.8}s`;
      sparkles.append(spark);
    }
  }

  function lockSurprise() {
    surprise.classList.remove("is-active");
    surprise.setAttribute("aria-hidden", "true");
    surprise.inert = true;
  }

  function showDay() {
    document.body.classList.add("is-day");
    celebrate.classList.add("is-active");
    celebrate.removeAttribute("aria-hidden");
    celebrate.inert = false;
    startSparkles(narrow ? 10 : 14);
    startPetals(narrow ? 14 : 18);
  }

  function openGift() {
    if (opened) return;
    opened = true;

    openButton.classList.add("is-pressed");
    document.body.classList.add("is-opening");
    lockSurprise();

    window.setTimeout(() => {
      startPetals(narrow ? 16 : 22);
    }, prefersReducedMotion ? 0 : 200);

    window.setTimeout(() => {
      document.body.classList.add("is-dawn");
    }, DAWN_DELAY);

    window.setTimeout(showDay, DAY_DELAY);
    window.setTimeout(() => {
      document.body.classList.remove("is-opening");
    }, OPENING_HOLD);
  }

  scatter(stars, narrow ? 26 : 40);
  scatter(fireflies, narrow ? 6 : 8, (el) => {
    el.style.setProperty("--dx", `${-22 + Math.random() * 44}px`);
    el.style.setProperty("--dy", `${-28 + Math.random() * 18}px`);
    el.style.top = `${42 + Math.random() * 38}%`;
  });

  startPetals(narrow ? 6 : 8);

  openButton.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    openButton.classList.add("is-pressed");
    openGift();
  });

  openButton.addEventListener("click", (event) => {
    event.preventDefault();
    openGift();
  });

  document.addEventListener("keydown", (event) => {
    if (opened) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGift();
    }
  });
})();
