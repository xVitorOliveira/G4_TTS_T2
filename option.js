document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
function saveOptions(e) {
    /*if(document.querySelector('[name="pwd]"').value)) { 
       document.getElementById("on").checked; 
    }else{
       document.getElementById("off").checked;
    }*/
    e.preventDefault();
    browser.storage.sync.set({
        onoff: document.querySelector('[name="onoff"]').value,
        speed: document.querySelector('[name="speed"]').value,
        voix: document.querySelector('[name="voix"]').value
    });
}
function restoreOptions() {
    /*if(document.querySelector('[name="pwd"]').value)) { 
       document.getElementById("on").checked; 
    }else{
       document.getElementById("off").checked;
    }*/
    function setCurrentChoice(result) {
        document.querySelector('[name="onoff"]').value = result.onoff || true;
    }
    function setCurrentChoice2(result) {
        document.querySelector('[name="speed"]').value = result.speed || 1;
    }
    function setCurrentChoice3(result) {
        document.querySelector('[name="voix"]').value = result.voix || "man";
    }
    function onError(error) {
        console.log(`Error: ${error}`);
    }
    var getting = browser.storage.sync.get("onoff");
    var getting2 = browser.storage.sync.get("speed");
    var getting3 = browser.storage.sync.get("voix");
    getting.then(setCurrentChoice, onError);
    getting2.then(setCurrentChoice2, onError);
    getting3.then(setCurrentChoice3, onError);
}



