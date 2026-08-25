const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const lang = document.querySelector("#langSwitch");

menu?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".main-nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

lang?.addEventListener("click", () => {
  const rtl = document.documentElement.dir === "rtl";
  document.documentElement.dir = rtl ? "ltr" : "rtl";
  document.documentElement.lang = rtl ? "en" : "ar";
  lang.textContent = rtl ? "العربية" : "English";
  document.body.classList.toggle("ltr", rtl);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let value = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const tick = () => {
      value = Math.min(target, value + step);
      el.textContent = value;
      if (value < target) requestAnimationFrame(tick);
    };
    tick();
    observer.unobserve(el);
  });
}, {threshold: .7});
document.querySelectorAll("[data-count]").forEach(el => observer.observe(el));

document.querySelector("#contactForm")?.addEventListener("submit", e => {
  e.preventDefault();
  document.querySelector("#formStatus").textContent =
    "تم استلام طلبك تجريبياً. اربط النموذج بخدمة البريد أو نظام القبول عند الإطلاق.";
  e.target.reset();
});

document.querySelector("#newsletterForm")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("تم الاشتراك بنجاح (وضع تجريبي).");
  e.target.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();
