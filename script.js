"use strict";

const tabBtns = Array.from(document.querySelectorAll("button[role=tab]"));
console.log(tabBtns);

tabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", function () {
    const panels = document.querySelectorAll("dl[role='tabpanel']");
    panels.forEach((panel) => {
      panel.id === tabBtn.getAttribute("aria-controls")
        ? showTabpanel(panel)
        : hideTabpanel(panel);
    });

    tabBtns.forEach((tab) => {
      const isSelectedBtn = tab === tabBtn ? true : false;
      tab.setAttribute("aria-selected", String(isSelectedBtn));
    });
  });
});

function showTabpanel(panel) {
  panel.classList.add("grid");
  panel.classList.remove("hidden");
}

function hideTabpanel(panel) {
  panel.classList.remove("grid");
  panel.classList.add("hidden");
}
