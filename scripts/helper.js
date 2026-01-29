export function showTabpanel(panel) {
  panel.classList.add("grid");
  panel.classList.remove("hidden");
}

export function hideTabpanel(panel) {
  panel.classList.remove("grid");
  panel.classList.add("hidden");
}

export const previousPeriod = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};

export const bgColors = {
  Work: "bg-work",
  Play: "bg-play",
  Study: "bg-study",
  Exercise: "bg-exercise",
  Social: "bg-social",
  "Self Care": "bg-self-care",
};
