// import "./index.scss";
"use strict";

(function () {
   const menuButton = document.getElementById("menu-button");
   const primaryNavigation = document.getElementById("primary-navigation");
   const menuBackground = document.getElementById("menu-bg");
   const maxSizeForMobile = "719px";
   const minSizeForDesktop = "720px";

   const mediaChangeToMobile = window.matchMedia(`(max-width: ${maxSizeForMobile})`);
   const mediaChangeToDesktop = window.matchMedia(`(min-width: ${minSizeForDesktop})`);

   const toggleMenu = (state, { input }) => {
      input.setAttribute("aria-expanded", !state);
      primaryNavigation.dataset.open = !state;
      menuBackground.dataset.open = !state;
   };

   const toggleElementVisibliity = (...domElements) => {
      domElements.forEach((domEl) => domEl.setAttribute("style", "visibility:hidden; --ttime:0s"));
      setTimeout(() => {
         domElements.forEach((domEl) => domEl.removeAttribute("style"));
      }, 100);
   };

   const dispatchClickEvent = ({ input }) => {
      input.dispatchEvent(new Event("click"));
   };

   mediaChangeToMobile.addEventListener("change", (e) => {
      if (e.target.matches) {
         toggleElementVisibliity(primaryNavigation, menuButton, menuBackground);
      }
   });

   mediaChangeToDesktop.addEventListener("change", (e) => {
      if (e.target.matches && primaryNavigation.dataset.open === "true")
         toggleMenu(e.target.matches, { input: menuButton });
   });

   menuButton.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-menu");
      if (!btn) return;

      let state = btn.matches("[aria-expanded=true]");
      toggleMenu(state, { input: btn });
   });

   menuBackground.addEventListener("click", (e) => {
      if (e.target.dataset.open === "true") dispatchClickEvent({ input: menuButton });
   });
})();
