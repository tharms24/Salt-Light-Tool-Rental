// Salt & Light Tool Rental — catalog rendering + filtering (tools.html)

document.addEventListener("DOMContentLoaded", function () {
  var grid = document.getElementById("tool-grid");
  var filterBar = document.getElementById("filter-bar");
  var emptyState = document.getElementById("empty-state");
  if (!grid) return;

  fetch("data/tools.json")
    .then(function (res) { return res.json(); })
    .then(function (data) { init(data.categories, data.tools); })
    .catch(function (err) {
      grid.innerHTML = '<p class="text-center">Tool list is temporarily unavailable. Please message us directly for current inventory.</p>';
      console.error(err);
    });

  function init(categories, tools) {
    renderFilters(categories);
    renderTools(tools);

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      var cat = btn.dataset.category;
      var filtered = cat === "all" ? tools : tools.filter(function (t) { return t.category === cat; });
      renderTools(filtered);
    });
  }

  function renderFilters(categories) {
    var html = '<button class="filter-btn is-active" data-category="all">All Tools</button>';
    categories.forEach(function (c) {
      html += '<button class="filter-btn" data-category="' + c.id + '">' + c.label + '</button>';
    });
    filterBar.innerHTML = html;
  }

  function renderTools(tools) {
    if (!tools.length) {
      grid.innerHTML = "";
      emptyState.classList.add("is-visible");
      return;
    }
    emptyState.classList.remove("is-visible");

    grid.innerHTML = tools.map(function (t) {
      var media = t.image
        ? '<img src="' + t.image + '" alt="' + t.name + '">'
        : '<div class="icon">' + (ICONS[t.icon] || ICONS.wrench) + '</div>';
      var tag = t.featured ? '<span class="tool-tag">Featured</span>' : "";
      var catLabel = catLabelFor(t.category);

      return (
        '<article class="tool-card" data-category="' + t.category + '">' +
          '<div class="tool-media">' + tag + media + '</div>' +
          '<div class="tool-body">' +
            '<div class="tool-cat">' + catLabel + '</div>' +
            '<h3>' + t.name + '</h3>' +
            '<p>' + t.blurb + (t.includes ? " " + t.includes + "." : "") + '</p>' +
            '<div class="tool-rates">' +
              '<div><strong>$' + t.dayRate + '</strong><span>Per Day</span></div>' +
              '<div><strong>$' + t.weekendRate + '</strong><span>Per Weekend</span></div>' +
            '</div>' +
            '<a class="btn btn-navy btn-block" href="contact.html?tool=' + encodeURIComponent(t.name) + '">Reserve This Tool</a>' +
          '</div>' +
        '</article>'
      );
    }).join("");
  }

  function catLabelFor(id) {
    var map = {
      nailers: "Nail Guns & Fasteners",
      drills: "Drills & Drivers",
      saws: "Saws",
      sanding: "Sanders & Grinders",
      demo: "Concrete & Demolition",
      power: "Outdoor Power",
      access: "Ladders & Access"
    };
    return map[id] || id;
  }
});
