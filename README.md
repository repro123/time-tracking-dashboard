# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![](./preview.jpg)

### Links

- Solution URL: [https://www.frontendmentor.io/solutions/time-tracking-dashboard-HRz4XeruV6](https://www.frontendmentor.io/solutions/time-tracking-dashboard-HRz4XeruV6)
- Live Site URL: [https://time-tracking-dashboard-repro.vercel.app/](https://time-tracking-dashboard-repro.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS (Tailwind utilities included / plain CSS available)
- Vanilla JavaScript modules (`scripts/`)

### What I learned

This project reads local JSON data and updates the UI based on the selected timeframe. Key code snippets used in the project are below.

- Fetching local JSON data (`scripts/data.js`):

```js
export async function fetchData() {
  const res = await fetch("data.json");
  if (!res.ok) throw new Error("error don sele");
  const data = await res.json();

  return data;
}
```

- UI helpers and mappings (`scripts/helper.js`):

Show / hide tab panels:

```js
export function showTabpanel(panel) {
  panel.classList.add("grid");
  panel.classList.remove("hidden");
}

export function hideTabpanel(panel) {
  panel.classList.remove("grid");
  panel.classList.add("hidden");
}
```

Previous-period labels mapping:

```js
export const previousPeriod = {
  daily: "Yesterday",
  weekly: "Last Week",
  monthly: "Last Month",
};
```

Background-class mapping for activity cards:

```js
export const bgColors = {
  Work: "bg-work",
  Play: "bg-play",
  Study: "bg-study",
  Exercise: "bg-exercise",
  Social: "bg-social",
  "Self Care": "bg-self-care",
};
```

These utilities make it simple to toggle views and keep the markup minimal while the JavaScript handles dynamic content.

### URL state (deep-linking)

The app updates the browser URL when a timeframe is selected so the current view is shareable and preserved on reload or navigation. This handler sets the `panel` search parameter and uses `history.pushState`:

```js
tabBtns.forEach((tabBtn) => {
  tabBtn.addEventListener("click", function () {
    panels.forEach((panel) => {
      const selectedPanel = panel.id === tabBtn.getAttribute("aria-controls");
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
```

On page load and on `popstate`, the app reads the `panel` parameter and renders the corresponding timeframe so links are deep-linkable.

## Author

- Website - [Bello Ibrahim](https://bello-ibrahim.vercel.app)
- Frontend Mentor - [@repro123](https://www.frontendmentor.io/profile/repro123)

## Acknowledgments

Thanks to the Frontend Mentor team for the challenge and the community for feedback.
