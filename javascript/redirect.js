import { getWindowSize } from "../javascript/helpers/getWindowSize.js";
import { registerSW } from "../clientServiceWorker.js";

let _isDesktop = (window.onresize = getWindowSize());

if (_isDesktop) {
  document.location.href = "/pages/dashboard";
}

if (!_isDesktop) {
  document.location.href = "/pages/overview";
}

if (!localStorage.getItem("area")) {
  localStorage.setItem("area", "DK1");
}
if (!localStorage.getItem("tax")) {
  localStorage.setItem("tax", false);
}
if (!localStorage.getItem("notifications")) {
  localStorage.setItem("notifications", false);
}

// Registers service worker on first visit
registerSW()