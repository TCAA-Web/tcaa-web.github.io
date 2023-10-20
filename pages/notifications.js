import { serviceWorkerRequest } from "../clientServiceWorker.js";
import { createFormattedHours } from "../javascript/helpers/createFormattedHours.js";
import { getDate } from "../javascript/helpers/getDate.js";
import { getExtremes } from "../javascript/helpers/getExtremes.js";
import { useFetch } from "../javascript/helpers/useFetch.js";

// interval til at sende beskeder til brugeren
if (localStorage.getItem('notifications')){
    let shouldShowNotify = localStorage.getItem('notifications')
    let interval = ""
    // hvis brugeren har valgt at modtage notifikationer
    if (JSON.parse(shouldShowNotify) == true){
            interval = setInterval(async function () {
            let { year, month, day } = getDate(new Date());
            let { data } = await useFetch(
              `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK1.json`
            );
            let {min} = getExtremes(data)
            const message = `Dagens laveste pris: ${min.DKK_per_kWh.toFixed(3)} DKK - for område VEST findes kl. ${createFormattedHours(new Date(min.time_start).getHours())} `;
            // send en besked til serviceWorkeren med message som indhold
            // SW sender en besked tilbage til clienten som lytter efter messages. Hvis man havde en server
            // kunne beskeden sendes derfra selv når brugeren ikke har klienten åben
            serviceWorkerRequest(message);
        }, 10000);
    }
    else {
        clearInterval(interval)
    }
}