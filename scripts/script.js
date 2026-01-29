import { showTabpanel, hideTabpanel } from "./helper.js";

let appData = null;

const tabBtns = Array.from(document.querySelectorAll("button[role=tab]"));
console.log(tabBtns);

tabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", function () {
    const panels = document.querySelectorAll("dl[role='tabpanel']");
    panels.forEach((panel) => {
      const selectedPanel = panel.id === tabBtn.getAttribute("aria-controls");
      selectedPanel ? showTabpanel(panel) : hideTabpanel(panel);
      if (selectedPanel) {
        const panelData = panel.dataset.panel;
        renderData(appData, panelData);
      }
    });

    tabBtns.forEach((tab) => {
      const isSelectedBtn = tab === tabBtn ? true : false;
      tab.setAttribute("aria-selected", String(isSelectedBtn));
    });
  });
});

async function fetchData() {
  const res = await fetch("data.json");
  if (!res.ok) throw new Error("error don sele");
  const data = await res.json();

  return data;
}

async function init() {
  try {
    const data = await fetchData();
    appData = data;
    const panel = null;
    renderData(data, panel);
    console.log(data);
  } catch (error) {
    console.error(error, error.message);
  }
}

init();

function renderData(data, panel) {
  if (!panel) return;
  console.log(data, panel);
  console.log(data.filter((d) => d.timeframes[panel]));

  const dlContainer = document.querySelector(`dl[data-panel='${panel}']`);
  console.log(dlContainer);

  const html = data.map((d) => {
    return `
            <div
              class="rounded-2xl bg-work relative pt-8 cursor-pointer hover:opacity-80"
            >
              <img
                src="./images/icon-${d.title.toLowerCase()}.svg"
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
                  class="mt-4 flex items-center justify-between gap-4 lg:flex-col lg:items-start"
                >
                  <dd class="text-3xl lg:text-4xl font-bold">${d.timeframes[panel]}hrs</dd>
                  <p>Yesterday - ${d.timeframes[panel]}hrs</p>
                </div>
              </div>
            </div>
    `;
  });
}
