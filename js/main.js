// Salt & Light Tool Rental — shared site behavior

document.addEventListener("DOMContentLoaded", function () {
  // Inject inline SVG icons wherever a data-icon attribute is present
  if (typeof ICONS !== "undefined") {
    document.querySelectorAll("[data-icon]").forEach(function (el) {
      var key = el.getAttribute("data-icon");
      if (ICONS[key]) el.innerHTML = ICONS[key];
    });
  }

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("nav-open");
    });
  }

  // Highlight current page in nav
  var here = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === here || (here === "" && href === "index.html")) {
      link.classList.add("is-active");
    }
  });

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
