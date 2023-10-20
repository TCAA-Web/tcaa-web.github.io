import { getArea } from "../../javascript/helpers/getArea.js";
import { getWindowSize } from "../../javascript/helpers/getWindowSize.js";
import { newEl } from "../../javascript/helpers/newEl.js";
import { reset } from "../../javascript/helpers/reset.js";
import { createMainLayout } from "../../javascript/layout/createMainLayout.js";
import { requestNotificationPermission, showLocalNotification, registerSW, } from "../../clientServiceWorker.js";

let { area } = getArea();
if (!area) {
  document.location.href = "/";
}
let isDesktop = (window.onresize = getWindowSize());
let checked = localStorage.getItem('tax')


function selectHandler(e) {
  let area = e.target.value;
  localStorage.setItem("area", area);
  reset();
  createMainLayout(layoutContent);
}

async function handleChangeNotifications(e){
  localStorage.setItem('notifications', e.target.checked)
  if (e.target.checked == true){
    let request = await requestNotificationPermission()
    if (request == 'granted'){
      let swRegistration = await registerSW()
      showLocalNotification('Besked fra Elprisen.nu', 'Du vil nu modtage en notifikation når el-prisen er lavest', swRegistration)
    }
    console.log(request)
  }
}
function handleChangeTax(e) {
  console.log(e.target.checked);
  localStorage.setItem('tax', e.target.checked)
}
function toggleOptionsOnStart(){
  if (localStorage.getItem('tax')){
    let check = document.querySelector('#taxcheck')
    let storedBool = localStorage.getItem('tax')
    if (check.checked != storedBool){
      check.checked = JSON.parse(storedBool)
    }
  }
  if (localStorage.getItem('notifications')){
    let checkNotification = document.querySelector('#notifications')
    let storedNotifyBool = localStorage.getItem('notifications')
    if (checkNotification.checked != storedNotifyBool){
      checkNotification.checked = JSON.parse(storedNotifyBool)
    } 
  }

}


let layoutContent = [
  newEl({ type: "section", append:[
    newEl({ type: "h1", text: "Indstillinger" }),
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
    newEl({type: 'div', html: `
    <p>Inkl moms:</p>
      <label class="switch">
        <input type="checkbox" id="taxcheck">
        <span class="slider round"></span>
      </label>
    `, event: {name: "change", func: (e) => handleChangeTax(e)},
     }),
     newEl({type: 'div', html: `
     <p>Pris alarm:</p>
       <label class="switch">
         <input type="checkbox" id="notifications">
         <span class="slider round"></span>
       </label>
     `, event: {name: "change", func: (e) => handleChangeNotifications(e)},
      })
  ], class: "settingsContainer"})
];

createMainLayout(layoutContent, isDesktop);
toggleOptionsOnStart()