import { useFetch } from "../../javascript/helpers/useFetch.js";
import { createDataset } from "../../javascript/layout/createDataset.js";
import { getDate } from "../../javascript/helpers/getDate.js";
import { createMainLayout } from "../../javascript/layout/createMainLayout.js";
import { newEl } from "../../javascript/helpers/newEl.js";
import { getArea } from "../../javascript/helpers/getArea.js";
import { createCircleSmall } from "../../javascript/layout/createCircleSmall.js";
import { getExtremes } from "../../javascript/helpers/getExtremes.js";
import { getWindowSize } from "../../javascript/helpers/getWindowSize.js";
import { applyTax } from "../../javascript/helpers/applyTax.js";

let { area } = getArea();

if (!area) {
  document.location.href = "/";
}

let _isDesktop = window.onresize = getWindowSize()

if (_isDesktop){
	document.location.href = "/pages/dashboard"
}

let { day, month, year } = getDate();
let { data, error } = await useFetch(
  `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`
);

let { min, max } = getExtremes(data);

let layoutContent = [
  newEl({ type: "h1", text: "OVERSIGT" }),
  newEl({
    type: "div",
    append: [
      createCircleSmall(applyTax(min.DKK_per_kWh).toFixed(3), 'LAVESTE PRIS'),
      createCircleSmall(applyTax(max.DKK_per_kWh).toFixed(3), 'HØJESTE PRIS'),
    ],
    class: "circleContainer",
  }),
  createDataset(data),
];
createMainLayout(layoutContent);
