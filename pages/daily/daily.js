import { useFetch } from "../../javascript/helpers/useFetch.js"
import { getDate } from "../../javascript/helpers/getDate.js"
import { createMainLayout } from "../../javascript/layout/createMainLayout.js"
import { newEl } from "../../javascript/helpers/newEl.js"
import { getArea } from "../../javascript/helpers/getArea.js"
import { createCircleLarge } from "../../javascript/layout/createCircleLarge.js"
import { getCurrentItem } from "../../javascript/helpers/getCurrentItem.js"
import { getWindowSize } from "../../javascript/helpers/getWindowSize.js"

let {area} = getArea()

if (!area){
    document.location.href ="/"
}

let _isDesktop = window.onresize = getWindowSize()

if (_isDesktop){
	document.location.href = "/pages/dashboard"
}

async function getInitialData() {
    let {area, areaText} = getArea()
    let {day, month, year} = getDate()
    let {data, error} = await useFetch(`https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_${area}.json`)
    let currentItem = getCurrentItem(data)

    createMainLayout([
        newEl({type: 'h1', text: 'ELPRISEN LIGE NU'}), 
        createCircleLarge(currentItem[0].DKK_per_kWh.toFixed(3)),
        newEl({type: 'p', text: `${new Date(currentItem[0].time_start).getHours() + ":00 - " + new Date(currentItem[0].time_end).getHours() + ":00"}`})
    ]
    )
}
getInitialData()