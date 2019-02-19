var speedo=1,voixo=1,modeONOFF=1;
//Get les parametres depuis le browser
var getting  = browser.storage.sync.get("onoff");
var getting2 = browser.storage.sync.get("speed");
var getting3 = browser.storage.sync.get("voix");


function onError(error) {
     console.log(error);
}

//Prends les paremetres du browser et les attribue dans les variables speedo, voixo et modeONOFF. 
function onGot(item) {
    if (item.onoff){
        modeONOFF = item.onoff;
        //Load le parametre On et Off dans le formulaire du menu.
        document.getElementById(modeONOFF+"ONOFF").checked = true;
    }
    if (item.speed){
        speedo = item.speed;
        //Load le parametre speed dans le formulaire du menu.
        document.getElementById("SPEED").value = speedo; 
    }
    if (item.voix){
        voixo = item.voix;
        //Load le parametre voix dans le formulaire du menu.
        document.getElementById(voixo+"VOIX").checked = true;
    }
}

getting.then(onGot, onError);
getting2.then(onGot, onError);
getting3.then(onGot, onError);

//Quand on appuye sur le bouton save et ensuite stock les parametres du formulaire dans le browser.
document.querySelector("form").addEventListener("submit", saveOptions);
function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        onoff: document.querySelector('[name="onoff"]:checked').value,
        speed: document.querySelector('[name="speed"]').value,
        voix: document.querySelector('[name="voix"]:checked').value
    });
}


