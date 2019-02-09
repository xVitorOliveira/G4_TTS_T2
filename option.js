document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        onoff: document.querySelector('[name="onoff"]').value,
        speed: document.querySelector('[name="speed"]').value,
        voix: document.querySelector('[name="voix"]').value
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector('[name="onoff"]').value = result.onoff || true;
    }
    function setCurrentChoice2(result) {
        document.querySelector('[name="speed"]').value = result.speed || 1;
    }
    function setCurrentChoice3(result) {
        document.querySelector('[name="voix"]').value = result.voix || 1;
    }
    function onError(error) {
        console.log(error);
    }
    var getting = this.browser.storage.sync.get("onoff");
    var getting2 = this.browser.storage.sync.get("speed");
    var getting3 = this.browser.storage.sync.get("voix");
    getting.then(setCurrentChoice, onError);
    getting2.then(setCurrentChoice2, onError);
    getting3.then(setCurrentChoice3, onError);
}



