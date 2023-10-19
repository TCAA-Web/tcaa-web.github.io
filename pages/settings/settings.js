import { getArea } from "../../javascript/helpers/getArea.js";
import { getWindowSize } from "../../javascript/helpers/getWindowSize.js";
import { newEl } from "../../javascript/helpers/newEl.js";
import { reset } from "../../javascript/helpers/reset.js";
import { createMainLayout } from "../../javascript/layout/createMainLayout.js";

let { area } = getArea();
if (!area) {
  document.location.href = "/";
}
let isDesktop = window.onresize = getWindowSize()

function selectHandler(e) {
  let area = e.target.value;
  localStorage.setItem("area", area);
  reset();
  createMainLayout(layoutContent);
}

let layoutContent = [
  newEl({ type: "h1", text: "Indstillinger" }),
  newEl({ type: "p", text: "Her finder du dine indstillinger:" }),
  newEl({ type: "label", html: `<span>Vælg område</span>` }),
  newEl({
    type: "select",
    html: `<option default disabled>Vælg område</option><option value=DK1 ${
      area == "DK1" ? "selected" : null
    }>Vest</option><option value=DK2  ${
      area == "DK2" ? "selected" : null
    }>Øst</option>`,
    event: { name: "change", func: selectHandler },
    class: "selectField",
  }),
];

createMainLayout(layoutContent, isDesktop);