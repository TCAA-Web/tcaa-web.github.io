import { useFetch } from "../../javascript/helpers/useFetch.js";
import { createDataset } from "../../javascript/layout/createDataset.js";
import { getDate } from "../../javascript/helpers/getDate.js";
import { createMainLayout } from "../../javascript/layout/createMainLayout.js";
import { newEl } from "../../javascript/helpers/newEl.js";
import { getArea } from "../../javascript/helpers/getArea.js";
import { createCircleSmall } from "../../javascript/layout/createCircleSmall.js";
import { getExtremes } from "../../javascript/helpers/getExtremes.js";
import { getCurrentItem } from "../../javascript/helpers/getCurrentItem.js";
import { createCircleLarge } from "../../javascript/layout/createCircleLarge.js";
import { applyTax } from "../../javascript/helpers/applyTax.js";

let { area } = getArea();

if (!area) {
  document.location.href = "/";
}
async function calendarHandler(e) {
  document.querySelector("#selected").innerHTML =
    "Valgt dato: " + e.target.value;

  let { year, month, day } = getDate(e.target.value);
  let { area, areaText } = getArea();
  let { data, error } = await useFetch(
    `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`
  )
  setDate = e.target.value
  createDashboard(data)
};

async function createDashboard (_data) {
  let { day, month, year } = getDate();
  let { data, error } = await useFetch(
    `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`
    );
 let currentItem = getCurrentItem(data);

  let { min, max } = getExtremes(data);

  createMainLayout([
    newEl({type: "section", append: [

      newEl({type: "div", append: [
        newEl({ type: "h1", text: "ELPRISEN LIGE NU" }),
        createCircleLarge(applyTax(currentItem[0]).DKK_per_kWh.toFixed(3)),
        newEl({
          type: "div",
          append: [
            createCircleSmall(applyTax(min.DKK_per_kWh).toFixed(3), "LAVESTE PRIS"),
            createCircleSmall(applyTax(max.DKK_per_kWh).toFixed(3), "HØJESTE PRIS"),
          ],
          class: "circleContainer",
        }),
      ]}),
      newEl({ type: "div", append: [
        newEl({ type: "h1", text: "OVERSIGT" }),
        createDataset(data),
        newEl({
          type: "p",
          text: `${
            new Date(currentItem[0].time_start).getHours() +
            ":00 - " +
            new Date(currentItem[0].time_end).getHours() +
            ":00"
          }`,
        }),
  
      ]}),
      newEl({type: 'div', append: [
        newEl({ type: "h1", text: "HISTORIK" }),
        newEl({
          type: "input",
          text: "Click me",
          attr: [{ name: "type", value: "date" }],
          event: { name: "change", func: calendarHandler },
          class: "calender",
        }),
        newEl({
          type: "p",
          text: `ELPRISERNE D. ${day}/${month}-${year}`,
          attr: [{ name: "id", value: "selected" }],
        }),
        _data || data ? createDataset(_data ? _data : data) : newEl({type: "p", text: "Kunne ikke finde"}),
      ]})
    ], class:"dashboardContainer"})
  ], true);
}

createDashboard()