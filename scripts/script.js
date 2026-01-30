import {
  showTabpanel,
  hideTabpanel,
  previousPeriod,
  bgColors,
} from "./helper.js";
import { fetchData } from "./data.js";

let appData = null;

const tabBtns = Array.from(document.querySelectorAll("button[role=tab]"));
const panels = document.querySelectorAll("ul[role='tabpanel']");
const loader = document.getElementById("loader");

function toggleLoader(show) {
  if (show) {
    loader.classList.remove("hidden");
    loader.classList.add("grid");
  } else {
    loader.classList.add("hidden");
    loader.classList.remove("grid");
  }
}

tabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", function () {
    panels.forEach((panel) => {
      const selectedPanel = panel.id === tabBtn.getAttribute("aria-controls");
      selectedPanel ? showTabpanel(panel) : hideTabpanel(panel);
      if (selectedPanel) {
        const panelData = panel.dataset.panel;
        const url = new URL(window.location.href);
        url.searchParams.set("panel", panelData);
        history.pushState({}, "", url);
        renderData(appData, panelData);
      }
    });

    tabBtns.forEach((tab) => {
      const isSelectedBtn = tab === tabBtn ? true : false;
      tab.setAttribute("aria-selected", String(isSelectedBtn));
    });
  });
});

async function init() {
  toggleLoader(true);
  try {
    const data = await fetchData();
    appData = data;

    onInitialPageLoad();
  } catch (error) {
    console.error(error, error.message);
  } finally {
    toggleLoader(false);
  }
}

init();

function onInitialPageLoad() {
  const url = new URL(window.location.href);
  const panel = url.searchParams.get("panel") || "daily";

  renderOnPageLoadOrPopstate(appData, panel);
}

function renderOnPageLoadOrPopstate(appData, panel) {
  renderData(appData, panel);

  panels.forEach((p) => {
    p.dataset.panel === panel ? showTabpanel(p) : hideTabpanel(p);
  });

  tabBtns.forEach((btn) => {
    const selBtn = btn.id === `${panel}-tab` ? true : false;
    btn.setAttribute("aria-selected", String(selBtn));
  });
}

function renderData(data, panel) {
  if (!panel) return;

  const dlContainer = document.querySelector(`ul[data-panel='${panel}']`);

  const html = data
    .map((d) => {
      return `<li class="panel hover:scale-95 transition-transform duration-1000 border-2 border-transparent focus-within:border-white relative rounded-2xl ${bgColors[d.title]}" id="${d.title.toLowerCase().replaceAll(" ", "-")}">
              <img
                src="./images/icon-${d.title.trim().toLowerCase().replaceAll(" ", "")}.svg"
                alt=""
                class="absolute top-0 right-0 "
              />
            <article aria-labelledby="${d.title
              .toLowerCase()
              .replaceAll(" ", "-")}"
              class="rounded-2xl relative pt-8 overflow-hidden"
            >
              
              <div class="rounded-2xl bg-card-bg p-6 mt-6 ">
                <div class="flex items-center justify-between">
                <h2>
                  <a href="#" id="${d.title.toLowerCase().replaceAll(" ", "-")}" class="text-white hover:underline">${d.title}</a></h2>
                  <button
                    aria-label="Expand details"
                    class="border border-transparent cursor-pointer hover:border-work rounded-full size-8 grid place-items-center relative z-30"
                  >
                    <img src="./images/icon-ellipsis.svg" alt="" />
                  </button>
                </div>

                <div
                  class="mt-6 flex items-center justify-between gap-4 lg:flex-col lg:items-start"
                >
                  <p class="text-3xl lg:text-4xl font-bold">${d.timeframes[panel].current}hrs</p>
                  <p>${previousPeriod[panel]} - ${d.timeframes[panel].previous}hrs</p>
                </div>
              </div>
            </article></li>
    `;
    })
    .join("");

  dlContainer.innerHTML = html;

  const liPanel = Array.from(dlContainer.querySelectorAll(".panel"));
  getEachPanel(liPanel);
}

window.addEventListener("popstate", function () {
  const url = new URL(window.location.href);
  const urlPanel = url.searchParams.get("panel") || "daily";

  renderOnPageLoadOrPopstate(appData, urlPanel);
});

function getEachPanel(panel) {
  panel.forEach((p) => {
    p.style.cursor = "pointer";

    p.addEventListener("click", function (e) {
      const link = p.querySelector("a");
      if (e.target.closest("button")) return;
      window.location.href = link.href;
    });
  });
}
