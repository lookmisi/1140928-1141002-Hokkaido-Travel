document.addEventListener("DOMContentLoaded", () => {
    initTimelineToggle();
    initSectionControls();
    initBackToTop();
    initTimelineHighlight();
});

function initTimelineToggle() {
    const toggle = document.querySelector(".timeline__toggle");
    const nav = document.querySelector(".timeline__items");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        nav.toggleAttribute("data-open");
    });
}

function initSectionControls() {
    const expandButtons = document.querySelectorAll("[data-expand]");
    const collapseButtons = document.querySelectorAll("[data-collapse]");

    expandButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const group = btn.getAttribute("data-expand");
            toggleDetails(group, true);
        });
    });

    collapseButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const group = btn.getAttribute("data-collapse");
            toggleDetails(group, false);
        });
    });
}

function toggleDetails(group, shouldOpen) {
    if (!group) return;
    const scope = document.querySelectorAll(`[data-group="${group}"] details, [data-day="${group}"] details`);
    scope.forEach((detail) => {
        if (shouldOpen) {
            detail.setAttribute("open", "");
        } else {
            detail.removeAttribute("open");
        }
    });
}

function initBackToTop() {
    const btn = document.querySelector(".back-to-top");
    if (!btn) return;
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initTimelineHighlight() {
    const sections = document.querySelectorAll("main > section[id]");
    const links = document.querySelectorAll(".timeline__item");
    if (!sections.length || !links.length) return;

    const map = new Map();
    links.forEach((link) => {
        const hash = link.getAttribute("href");
        if (hash && hash.startsWith("#")) {
            map.set(hash.slice(1), link);
        }
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const link = map.get(entry.target.id);
                if (!link) return;
                if (entry.isIntersecting) {
                    links.forEach((l) => l.classList.remove("is-active"));
                    link.classList.add("is-active");
                }
            });
        },
        {
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
        }
    );

    sections.forEach((section) => observer.observe(section));
}
