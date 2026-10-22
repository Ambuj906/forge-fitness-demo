"use strict";

(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  if (!menuButton || !navigation) {
    console.warn("FORGE FITNESS: Navigation elements were not found.");
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 680px)");

  function setMenuState(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    navigation.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  }

  function closeMenu() {
    setMenuState(false);
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();

      if (mobileQuery.matches) {
        menuButton.focus();
      }
    }
  });

  mobileQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      closeMenu();
    }
  });

  // Keep in-page navigation usable when the mobile menu is open.
  window.addEventListener("pageshow", closeMenu);

  // Log a helpful confirmation when the page script initializes.
  console.info("FORGE FITNESS: Navigation initialized.");
})();
