const projects = {
  "form-001": { number: "001", title: "FORM", type: "Editorial Design", year: "2026", asset: "assets/form-001.svg", role: "[Replace with role]", client: "[Temporary project]", tools: "[Replace with tools]", description: "A placeholder editorial system for an imagined cultural reader. Replace the text, images and project facts with the final case study.", narrative: "This temporary case study demonstrates how an editorial project can hold a confident typographic rhythm, a restrained image language and an easy-to-scan project story." },
  "object-002": { number: "002", title: "OBJECT", type: "Visual Identity", year: "2026", asset: "assets/object-002.svg", role: "[Replace with role]", client: "[Temporary project]", tools: "[Replace with tools]", description: "A flexible identity placeholder built around volume, sequence and a single clear graphic gesture.", narrative: "Use this space to tell the real project’s story: what was needed, what informed the idea, and how the resulting identity worked across touchpoints." },
  "type-003": { number: "003", title: "TYPE", type: "Typography & Logotype", year: "2025", asset: "assets/type-003.svg", role: "[Replace with role]", client: "[Temporary project]", tools: "[Replace with tools]", description: "A temporary study in typographic structure, logotype construction and precise visual hierarchy.", narrative: "A strong type-focused case study is less about decoration than decisions: proportions, spacing, contrast, repetition and the way a mark behaves in the world." },
  "frame-004": { number: "004", title: "FRAME", type: "Photography", year: "2025", asset: "assets/frame-004.svg", role: "[Replace with role]", client: "[Temporary project]", tools: "[Replace with tools]", description: "A temporary photographic sequence organised around observation, framing and the pace of looking.", narrative: "Replace this paragraph with context for the photographic work: the commission or self-initiated premise, locations, collaborators and what the images are intended to reveal." },
  "motion-005": { number: "005", title: "MOTION", type: "Video & Motion Design", year: "2024", asset: "assets/motion-005.svg", role: "[Replace with role]", client: "[Temporary project]", tools: "[Replace with tools]", description: "A motion placeholder whose stills suggest tempo, editing and a graphic system in time.", narrative: "For a video project, add a working embedded film or an accessible linked video here. This static prototype keeps the source light and GitHub Pages friendly." },
  "study-006": { number: "006", title: "STUDY", type: "Graphic Experiments", year: "2024", asset: "assets/study-006.svg", role: "[Replace with role]", client: "[Temporary project]", tools: "[Replace with tools]", description: "An open-ended temporary study for experiments that don’t fit neatly into a single discipline.", narrative: "Graphic experiments earn their place when their question is visible. Use this space to name the question, show iterations and explain what shifted along the way." }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const homeView = document.querySelector("#home-view");
const projectView = document.querySelector("#project-view");
const viewed = new Set(JSON.parse(sessionStorage.getItem("karol-viewed") || "[]"));
const cursor = document.querySelector(".cursor-preview");
const cursorImage = cursor.querySelector("img");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let activeProject = null;
let activeImage = 0;

function pad(value) { return String(value).padStart(2, "0"); }

function updateClock() {
  const clock = document.querySelector(".live-clock time");
  if (!clock) return;
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  clock.textContent = `${values.hour}:${values.minute}:${values.second}`;
  clock.dateTime = new Date().toISOString();
}

function updateViewed() {
  document.querySelector("#viewed-count").textContent = pad(viewed.size);
  sessionStorage.setItem("karol-viewed", JSON.stringify([...viewed]));
}

function projectMarkup(project) {
  const caption = `${project.number} — ${project.title} / temporary visual`;
  return `
    <div class="project-hero">
      <a class="project-back" href="#work">← Back to index</a>
      <p class="project-kicker">Project ${project.number} / ${project.type}</p>
      <h1 class="project-title">${project.title}</h1>
      <p class="project-description">${project.description}</p>
      <div class="project-meta">
        <p><span>Discipline</span>${project.type}</p>
        <p><span>Year</span>${project.year}</p>
        <p><span>Role</span>${project.role}</p>
        <p><span>Client / Tools</span>${project.client}<br>${project.tools}</p>
      </div>
    </div>
    <div class="project-gallery" data-gallery>
      ${["Primary visual", "Detail / temporary visual", "System / temporary visual"].map((label, index) => `<figure class="project-image"><img src="${project.asset}" alt="${project.title} — ${label}" ${index ? "loading=\"lazy\"" : ""}/><button type="button" class="zoom" data-image="${index}" aria-label="Enlarge ${label}">+</button><figcaption><span>${caption}</span><span>${pad(index + 1)} / 03</span></figcaption></figure>`).join("")}
    </div>
    <div class="project-narrative"><h2>Project note</h2><p>${project.narrative}</p></div>
    <nav class="project-next" aria-label="Next project"><span>Continue to</span><a href="#project/${nextProject(project.number)}">${projects[nextProject(project.number)].title}<span>↗</span></a></nav>
  `;
}

function nextProject(number) {
  const ids = Object.keys(projects);
  return ids[(ids.findIndex((id) => projects[id].number === number) + 1) % ids.length];
}

function showProject(id) {
  const project = projects[id];
  if (!project) { window.location.hash = "#top"; return; }
  activeProject = id;
  projectView.innerHTML = projectMarkup(project);
  projectView.hidden = false;
  homeView.hidden = true;
  document.title = `${project.title} — KAROL`;
  viewed.add(id);
  updateViewed();
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
}

function showHome() {
  activeProject = null;
  projectView.hidden = true;
  projectView.innerHTML = "";
  homeView.hidden = false;
  document.title = "KAROL — Graphic Design";
  if (window.location.hash && window.location.hash !== "#top") {
    requestAnimationFrame(() => document.querySelector(window.location.hash)?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }
}

function route() {
  const match = window.location.hash.match(/^#project\/([\w-]+)$/);
  if (match) showProject(match[1]); else showHome();
}

function openLightbox(index) {
  if (!activeProject) return;
  activeImage = index;
  const project = projects[activeProject];
  lightboxImage.src = project.asset;
  lightboxImage.alt = `${project.title} — temporary visual ${index + 1} of 3`;
  lightboxCaption.textContent = `${project.number} / ${project.title} — ${pad(index + 1)} / 03`;
  if (!lightbox.open) lightbox.showModal();
}

function moveLightbox(direction) { openLightbox((activeImage + direction + 3) % 3); }

document.addEventListener("click", (event) => {
  const menuLink = event.target.closest(".primary-nav a");
  if (menuLink) closeMenu();
  const zoom = event.target.closest(".zoom");
  if (zoom) openLightbox(Number(zoom.dataset.image));
  if (event.target.closest(".lightbox__close")) lightbox.close();
  if (event.target.closest(".lightbox__previous")) moveLightbox(-1);
  if (event.target.closest(".lightbox__next")) moveLightbox(1);
});

window.addEventListener("hashchange", route);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeProject && !lightbox.open) window.location.hash = "#work";
  if (lightbox.open && event.key === "ArrowLeft") moveLightbox(-1);
  if (lightbox.open && event.key === "ArrowRight") moveLightbox(1);
});

const menu = document.querySelector(".menu-button");
const nav = document.querySelector(".primary-nav");
function closeMenu() { menu.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }
menu.addEventListener("click", () => { const open = menu.getAttribute("aria-expanded") === "true"; menu.setAttribute("aria-expanded", String(!open)); nav.classList.toggle("is-open", !open); });

if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.querySelectorAll(".project-row").forEach((row) => {
    row.addEventListener("pointerenter", () => { cursorImage.src = projects[row.dataset.project].asset; cursor.classList.add("is-visible"); });
    row.addEventListener("pointermove", (event) => { cursor.style.left = `${event.clientX + 24}px`; cursor.style.top = `${event.clientY + 24}px`; });
    row.addEventListener("pointerleave", () => cursor.classList.remove("is-visible"));
  });
}

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-inview"); observer.unobserve(entry.target); } }), { threshold: .08 });
document.querySelectorAll(".reveal, [data-reveal]").forEach((element) => observer.observe(element));

function updateScrollProgress() {
  const root = document.documentElement;
  const max = root.scrollHeight - root.clientHeight;
  document.querySelector(".scroll-progress i").style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
  document.querySelector(".site-header").classList.toggle("is-scrolled", window.scrollY > 12);
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });

async function finishIntro() {
  const loading = document.querySelector(".loading");
  if (prefersReducedMotion) { loading.remove(); return; }
  const counter = loading.querySelector(".loading__count");
  const line = loading.querySelector(".loading__line i");
  for (let i = 0; i <= 100; i += 5) {
    counter.textContent = pad(i);
    line.style.width = `${i}%`;
    await new Promise((resolve) => setTimeout(resolve, 23));
  }
  await new Promise((resolve) => setTimeout(resolve, 180));
  loading.classList.add("is-done");
  setTimeout(() => loading.remove(), 800);
}

document.querySelector("#year").textContent = new Date().getFullYear();
updateClock(); updateViewed(); updateScrollProgress(); route(); finishIntro();
setInterval(updateClock, 1000);
