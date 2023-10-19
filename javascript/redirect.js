import { getWindowSize } from "../javascript/helpers/getWindowSize.js"

let _isDesktop = window.onresize = getWindowSize()

if (_isDesktop){
	document.location.href = "/pages/dashboard"
}

if (!_isDesktop){
	document.location.href ="/pages/overview"
}

if (!localStorage.getItem('area')){
    localStorage.setItem('area', 'DK1')
}

if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('../serviceworker.js')
	.then(reg => console.log('service worker registered', reg))
	.catch(err => console.error('service worker not registered', err)) 
}