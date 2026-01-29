export function showTabpanel(panel) {
  panel.classList.add("grid");
  panel.classList.remove("hidden");
}

export function hideTabpanel(panel) {
  panel.classList.remove("grid");
  panel.classList.add("hidden");
}
