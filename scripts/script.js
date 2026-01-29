import {
  showTabpanel,
  hideTabpanel,
  previousPeriod,
  bgColors,
} from "./helper.js";
import { fetchData } from "./data.js";

let appData = null;

const tabBtns = Array.from(document.querySelectorAll("button[role=tab]"));
const panels = document.querySelectorAll("dl[role='tabpanel']");

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
  try {
    const data = await fetchData();
    appData = data;
    onInitialPageLoad();
  } catch (error) {
    console.error(error, error.message);
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

  const dlContainer = document.querySelector(`dl[data-panel='${panel}']`);

  const html = data
    .map((d) => {
      return `
            <div
              class="rounded-2xl ${bgColors[d.title]} relative pt-8 cursor-pointer hover:opacity-80"
            >
              <img
                src="./images/icon-${d.title.trim().toLowerCase().replaceAll(" ", "")}.svg"
                alt=""
                class="absolute top-0 right-0 z-10"
              />
              <div class="rounded-2xl bg-card-bg p-6 mt-6 relative z-20">
                <div class="flex items-center justify-between">
                  <dt>${d.title}</dt>
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
                  <dd class="text-3xl lg:text-4xl font-bold">${d.timeframes[panel].current}hrs</dd>
                  <p>${previousPeriod[panel]} - ${d.timeframes[panel].previous}hrs</p>
                </div>
              </div>
            </div>
    `;
    })
    .join("");

  dlContainer.innerHTML = html;
}

window.addEventListener("popstate", function () {
  const url = new URL(window.location.href);
  const urlPanel = url.searchParams.get("panel") || "daily";

  renderOnPageLoadOrPopstate(appData, urlPanel);
});
