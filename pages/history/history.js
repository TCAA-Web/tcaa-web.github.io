import { useFetch } from "../../javascript/helpers/useFetch.js";
import { createDataset } from "../../javascript/layout/createDataset.js";
import { getDate } from "../../javascript/helpers/getDate.js";
import { createMainLayout } from "../../javascript/layout/createMainLayout.js";
import { newEl } from "../../javascript/helpers/newEl.js";
import { getArea } from "../../javascript/helpers/getArea.js";
import { getWindowSize } from "../../javascript/helpers/getWindowSize.js";

let { area } = getArea();

if (!area) {
  document.location.href = "/";
}

let _isDesktop = (window.onresize = getWindowSize());

if (_isDesktop) {
  document.location.href = "/pages/dashboard";
}

async function calendarHandler(e) {
  document.querySelector("#selected").innerHTML =
    "Valgt dato: " + e.target.value;

  let { year, month, day } = getDate(e.target.value);
  let { area, areaText } = getArea();
  let { data, error } = await useFetch(
    `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`
  );
  if (data) {
    createMainLayout([
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
      createDataset(data),
    ]);
  } else {
    createMainLayout([
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
      newEl({
        type: "h4",
        text: "Der er ingen data for denne dato",
        class: "errorText",
      }),
    ]);
  }
}

async function getInitialData() {
  // Date fetch call
  let { area, areaText } = getArea();
  let { day, month, year } = getDate();
  let { data, error } = await useFetch(
    `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`
  );
  createMainLayout([
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
    createDataset(data),
  ]);
}
getInitialData();
