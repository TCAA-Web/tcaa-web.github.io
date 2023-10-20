export async function registerSW() {
  let sw = undefined;
  // hvis serviceworker er understøttet så registrer SW.
  if ("serviceWorker" in navigator) {
    console.log("Serviceworker script running...");
    console.log("Serviceworker is being registered");
    sw = await navigator.serviceWorker.register("/serviceworker.js", {
      type: "module", // service worker kan registreres så man kan importere modules
    });

    // Lytter efter beskeder som kommer fra service workeren
    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log(`The service worker sent me a message: ${event.data}`);
      // Sender beskeden til brugeren
      showLocalNotification('Besked fra Elprisen.nu', event.data, sw)
    });
  }
  return sw;
}

// Sender en lokal notifikation til brugeren. Virker kun når klienten er åben. Ellers kræves server til PUSH
// Options til at bestemme hvordan notifikationer ser ud
export const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body: body,
    vibrate: [1, 2, 3],
    icon: "assets/appIcons/mainIcon.svg",
  };
  swRegistration.showNotification(title, options);
};

// Tilladelse til at sende lokale notifikationer
export const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
  return permission;
};

// From this stackoverflow post: https://stackoverflow.com/questions/39783683/how-to-get-notification-from-service-worker
export function serviceWorkerRequest(message) {
  if ("serviceWorker" in navigator) {
    if (navigator.serviceWorker.controller == null) {
      return Promise.reject("No service worker controller.");
    }
    return new Promise(function (resolve, reject) {
      let messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = function (event) {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      // Sender en besked til serviceWorkeren med "message" som parameter
      navigator.serviceWorker.controller.postMessage(message, [
        messageChannel.port2,
      ]);
    });
  } else {
    return Promise.reject("No service worker.");
  }
}

registerSW()