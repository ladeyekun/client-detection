'use strict';

function select(selector, scope = document) {
    return scope.querySelector(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const sysOS = select('.sys-os');
const sysLang = select('.sys-lang');
const sysBrowser = select('.sys-browser');
const windowWidth = select('.window-width');
const windowHeight = select('.window-height');
const windowOrientation = select('.window-orientation');
const batteryLevel = select('.battery-level');
const batteryStatus = select('.battery-status');

function loadWindow() {
    windowWidth.innerText = `${window.innerWidth}px`;
    windowHeight.innerText = `${window.innerHeight}px`;
    windowOrientation = window.orientation;
}

function getScreenOrientation(type) {
    switch(type) {
        case 'landscape-primary':
        case 'landscape-secondary':
            return 'landscape';
            break;

        case 'portrait-primary':
        case 'portrait-secondary':
            return 'landscape';
            break;
        
    }
}
console.log(window);

