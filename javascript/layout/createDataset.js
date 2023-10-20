import { applyTax } from "../helpers/applyTax.js";
import { getMinMax } from "../helpers/getMinMax.js";
import { newEl } from "../helpers/newEl.js";

export function createDataset(_arr) {

  function createFormattedHours(_hour) {
    let res;
    _hour < 10 ? (res = "0" + _hour + ".00") : (res = _hour + ".00");
    return res;
  }
  let minMaxArray = getMinMax(_arr.map((i) => i.DKK_per_kWh));

  // from this fiddle: https://jsfiddle.net/jongobar/sNKWK/
  function getColor(value) {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }

  let content = newEl({type: "section"});
  if (_arr) {
    content.classList.add("timeWrapper");
    content.innerHTML = _arr
      .map((item, index) => {
        return `
                    <div class="timeContainer">
                        <p>kl. ${createFormattedHours(
                          new Date(item.time_start).getHours()
                        )}</p>
                        <p style="color:${getColor(
                          minMaxArray[index]
                        )}">${applyTax(item.DKK_per_kWh).toFixed(3)} kr</p>
                    </div>`;
      })
      .join("");
  } else {
    content.innerHTML = "That data does not exist... yet";
  }

  return content;
}
