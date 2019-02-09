/*document.addEventListener("DOMContentLoaded", restoreOptions);*/

document.querySelector("form").addEventListener("submit", saveOptions);
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        onoff: document.querySelector('[name="onoff"]:checked').value,
        speed: document.querySelector('[name="speed"]').value,
        voix: document.querySelector('[name="voix"]:checked').value
    });
}
var onoffs = document.querySelector('name="onoff"]');
document.querySelector('[name="onoff"]:checked').checked = false;
for(var i = 0, l = onoffs; i < l; ++i) { if(onoffs[i].value == onoff) { onoffs[i].checked="checked";}}
document.querySelector('[name="speed"]').value=speed;
var voice = document.querySelector('name="voix"]');
document.querySelector('[name="voix"]:checked').checked = false;
for(var i = 0, l = voice; i < l; ++i) { if(voice[i].value == voix) { voice[i].checked="checked";}}
/*
function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector('[name="onoff"]').value = result.onoff || 1;
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
}*/



