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
const onlineStatus = select('.box-status h2');

listen('load', window, () => {
    loadWindow();
    loadSystem();
    updateNetworkStatus();
    loadBatteryInfo();
});

listen('resize', window, () => {
    loadWindow();
});

listen('orientationchange', window, () => {
    loadWindow();
});

listen('online', window, () => {
    updateNetworkStatus();
});

listen('offline', window, () => {
    updateNetworkStatus();
});

function loadWindow() {
    windowWidth.innerText = `${winWidth()}px`;
    windowHeight.innerText = `${winHeight()}px`;
    windowOrientation.innerText = getScreenOrientation();
}

function loadSystem() {
    sysLang.innerText = getSysLang();
    //sysOS.innerText = getSysOS();
}

function updateNetworkStatus() {
    onlineStatus.innerText = isNetworkOnline ? 'Online' : 'Offline';
}

const winWidth = () => window.innerWidth;
const winHeight = () => window.innerHeight;

const getSysLang = () => navigator.language;

function getScreenOrientation() {
    let type = window.screen.orientation.type;
    return type.startsWith('landscape') ? 'landscape' : 'portrait';
}

function loadBatteryInfo() {
    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            updateBatteryInfo(battery);

            listen('levelchange', battery, () => {
                updateBatteryInfo(battery);
            });
            
            listen('chargingchange', battery, () => {
                updateBatteryInfo(battery);
            });
        });
    } else {
        batteryLevel.innerText = 'Not available';
        batteryStatus.innerText = 'Not available';
    }
}

function updateBatteryInfo(battery) {
   
    batteryLevel.innerText = `${Math.round(battery.level * 100)}%`;

    batteryStatus.innerText = battery.charging ? 'Plugged in' : 'Idle';
}



function getSysOS() {
    let userAgent = navigator.userAgent;
    console.log(userAgent);
    const match = '/([A-Z][a-z]+)\/(\d+\.\d+)/';
    const matches = userAgent.search(match);
    return matches;
}

function isNetworkOnline() {
    return navigator.onLine ? true : false;
}
