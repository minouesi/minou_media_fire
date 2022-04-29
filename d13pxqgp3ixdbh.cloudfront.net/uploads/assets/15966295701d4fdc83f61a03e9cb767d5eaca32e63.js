function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

var decodedGlobalVariables = "{}";

try {
	decodedGlobalVariables = b64DecodeUnicode(globalString);
}
catch(e) {}

globalVariables = JSON.parse(decodedGlobalVariables);

var waitForLocker = function() {
    setTimeout(function() {
        if (typeof CPABUILDContentLocker !== 'undefined' && CPABUILDContentLocker !== null && 'userSettings' in CPABUILDContentLocker && 'onCloseURL' in CPABUILDContentLocker.userSettings) {
            CPABUILDContentLocker.userSettings.onCloseURL = globalVariables.redirect_url;
        }
        else {
            waitForLocker();
        }
    }, 50);
};

waitForLocker();