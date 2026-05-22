const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

Promise.all([
  fetch("partials/header.html").then((r) => r.text()),
  fetch("partials/aside.html").then((r) => r.text()),
  fetch("partials/footer.html").then((r) => r.text()),
]).then(([headerHTML, asideHTML, footerHTML]) => {
  document.querySelector("header").innerHTML = headerHTML;
  document.querySelector("aside").innerHTML = asideHTML;
  document.querySelector("footer").innerHTML = footerHTML;
});
