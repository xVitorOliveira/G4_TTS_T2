var modeONOFF = true;
var speedo = 1;
var voixo = "man";

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
    if (item.onoff)
        modeONOFF = item.onoff;
    if (item.speed)
        speedo = item.speed;
    if (item.voix)
        voixo = item.voix;
}

var getting = browser.storage.sync.get("onoff");
var getting2 = browser.storage.sync.get("speed");
var getting3 = browser.storage.sync.get("voix");
getting.then(onGot, onError);
getting2.then(onGot, onError);
getting3.then(onGot, onError);

//speechSynthesisUtteranceInstance.rate = 1.5;
//speechSynthesisUtteranceInstance.pitch = 1.5;    

if(modeONOFF){
    var pTab = document.querySelectorAll("body *, a, img");
    var lastElmt = null;
    var speechInstance = new SpeechSynthesisUtterance("");
    var speaker = window.speechSynthesis;


    //Récupère le plus ancien parent qui possède au moins un noeud textuel non-vide comme fils
    function getTextParent(elmt) {
        var parent = elmt.parentNode;
        var childs;

        while(parent.tagName && parent.tagName.toLowerCase() !== 'body' && parent!== document) {
            childs = parent.childNodes;

            for (var i = 0; i < childs.length; i++) {
                if(childs[i].nodeType === Node.TEXT_NODE && childs[i].textContent !== "") {
                    return getTextParent(parent);
                }
            }
        }
        return elmt;
    }

    //Réinitialise le speaker et le style de la page
    function reset() {
        speaker.cancel();
        if (lastElmt) {
            lastElmt.style.border = 'initial';
            lastElmt.style.boxShadow = 'initial';
        }
    }

    //TextToSpeach du message passe en parametre
    function tts(elmt, msg) {
        reset();

        speechInstance = new SpeechSynthesisUtterance(msg);
        speechInstance.volume = 1;
        speaker.speak(speechInstance);

        elmt.style.border = "solid rgb(151, 187, 244) 3px";
        elmt.style.boxShadow = "0 0 5px rgb(151, 187, 244)";

        lastElmt = elmt;
    }

    //Listener sur les éléments texte
    for (var i = 0, l = pTab.length; i < l; ++i) {
        pTab[i].addEventListener("mouseover", function(event) {
            var accept = false;
            var elmt = null;
            var msg = "";

            //Test si l'element est un lien ou une image
            if( this.tagName.toLowerCase() === 'a' || this.tagName.toLowerCase() === 'img') {
                elmt = this;
                msg = (this.title && this.title !== null && this.title !== "") ? this.title + ". " : "";
                console.log(this.href !== "");
                msg += (this.href && this.href !== null && this.href !== "") ? "Lien vers " + this.href : "";
                tts(elmt, msg);
            }

            //Test sur le parent le plus élevé contenant du texte
            else {
                elmt = getTextParent(this);
                if (elmt.textContent !== "" && elmt !== lastElmt) {
                    msg = elmt.textContent;
                    tts(elmt, msg);
                }
            }

            event.stopPropagation();
        }, false);
    }

    document.onkeyup = function(e) {
        if (e.which == 17 && e.which == 18 && e.which == 70)
            readWithShortcuts("front");
        else if (e.which == 17 && e.which == 18 && e.which == 74) 
            readWithShortcuts("back");
    };

    function readWithShortcuts(mode){
        if(speechInstance != null)
            window.speechSynthesis.cancel(speechInstance);

        if (i != 0 && mode == "back")   
            i--;

        var accept = false;
        var elmt = null;
        var msg = "";
        //Test si l'element est un lien ou une image
        if( pTab[i].tagName.toLowerCase() === 'a' || pTab[i].tagName.toLowerCase() === 'img') {
            elmt = pTab[i];
            msg = (pTab[i].title && pTab[i].title !== null && pTab[i].title !== "") ? pTab[i].title + ". " : "";
            console.log(pTab[i].href !== "");
            msg += (pTab[i].href && pTab[i].href !== null && pTab[i].href !== "") ? "Lien vers " + pTab[i].href : "";
            tts(elmt, msg);
        }
        //Test sur le parent le plus élevé contenant du texte
        else {
            elmt = getTextParent(pTab[i]);
            if (elmt.textContent !== "" && elmt !== lastElmt) {
                msg = elmt.textContent;
                tts(elmt, msg);
            }
        }
        event.stopPropagation();

        if(mode == "front")
            i++;
    }  
}

