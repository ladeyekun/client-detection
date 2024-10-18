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
const statusColor = select('.box-status');

listen('load', window, () => {
    loadWindow();
    loadSystem();
    loadBatteryInfo();
    updateNetworkStatus();
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
    sysOS.innerText = getSysOS();
    sysBrowser.innerText = getBrowser();
}

function updateNetworkStatus() {
    let status = navigator.onLine;
    onlineStatus.innerText = status ? 'Online' : 'Offline';
    statusColor.classList = status ? 'box-status online' : 'box-status offline';
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
    batteryStatus.innerText = battery.charging ? 'Plugged in' : 'idle';
}



function getSysOS() {
    //let platform = navigator.platform.toLowerCase();
    let userAgent = navigator.userAgent.toLowerCase();
    console.log(userAgent);
    let os = '';

    switch (true) {
        case userAgent.includes('win'):
            os = 'Windows';
            break;

        case userAgent.includes('like mac'):
            os = 'iOS';
            break;
            
        case userAgent.includes('mac'):
            os = 'Mac/iOS';
            break;

        case userAgent.includes('android'):
            os = 'Android';
            break;

        case userAgent.includes('x11'):
            os = 'Linux';
            break;
    
        default:
            os = 'Unknown OS';
    }
    return os;
}

function getBrowser() {
    let userAgent = navigator.userAgent.toLowerCase();
    let browserName = '';

    switch (true) {
        case userAgent.includes('edg'):
            browserName = 'Edge';
            break;

        case userAgent.includes('firefox'):
            browserName = 'Firefox';
            break;
            
        case userAgent.includes('chrome') && userAgent.includes('safari'):
            browserName = 'Chrome';
            break;

        case userAgent.includes('safari') && !userAgent.includes('chrome'):
            browserName = 'Safari';
            break;

        default:
            browserName = 'Unknown browser';
    }

    return browserName;
}

