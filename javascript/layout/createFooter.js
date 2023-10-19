import { getArea } from "../helpers/getArea.js";
import { newEl } from "../helpers/newEl.js";

export function createFooter(_priceCalcString) {

  let a = "undefined"
  let {area} = getArea() 
  if (area == "DK1") {a = 'Vest Danmark'}
  if (area == "DK2") {a = 'Øst Danmark'}

  let footer = newEl({type: "footer"});
  footer.classList.add("footerStyle");
  footer.innerHTML = `   
       <div><p>Priserne er </p> <b>${_priceCalcString ? 'inkl.' : 'ex.'} moms </b> <p> og uden afgifter</p></div>
      <div> <p>Du vises lige nu priserne for</p> <b>${a}</b></div>
    `;
  return footer;
}
