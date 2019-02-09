var modeONOFF=true;
var speedo=1;
var voixo=1;

console.log(modeONOFF);
console.log(speedo);
console.log(voixo);

console.log(browser);


var getting  = browser.storage.sync.get("onoff");
var getting2 = browser.storage.sync.get("speed");
var getting3 = browser.storage.sync.get("voix");

console.log(getting);
console.log(getting2);
console.log(getting3);

getting.then(onGot, onError);
getting2.then(onGot, onError);
getting3.then(onGot, onError);

console.log(modeONOFF);
console.log(speedo);
console.log(voixo);

//Récupération du code source via l'élément body
var body = document.querySelector("body");

//Initialisation des variables qui réguleront la lecture
var lastElmt = null;
var elmtIndex;
var keyBack = false, keyFront = false, keyStop = false, keyEnter = false, keyRepeat = false, keyAlt = false, keyCtrl = false;

//Initialisation de la voix
var speechInstance = new SpeechSynthesisUtterance("");
var speaker = window.speechSynthesis;

//Traitement des images et des liens pour les lires en TTS
function addSpecials(tab) {
	var specials = document.querySelectorAll("a, img");

	for (var i = 0; i < specials.length; i++) {
		if(tab.indexOf(specials[i]) === -1) {
			tab.push(specials[i]);
		}
	}

	return tab;
}

//Return true si un element du tableau est un noeud texte non vide
function containsTextNodes(elmts) {
	for (var i = 0; i < elmts.length; i++) {
		if(elmts[i].nodeType === Node.TEXT_NODE && elmts[i].textContent.trim() !== "") return true;
	}
}

//Initialise le tableau des éléments à lire en TTS
function getAllTTSChilds(tab, elmt) {
	var childs = elmt.childNodes;

	if(elmt.textContent !== null && elmt.textContent.trim() !== "") {
		if((elmt.tagName === "TABLE" || elmt.tagName === "A" || containsTextNodes(childs)) && tab.indexOf(elmt) === -1) {
			tab.push(elmt);
		}
		else {
			for(var i = 0, l = childs.length; i < l ; i ++) {
				tab = getAllTTSChilds(tab, childs[i]);
			}
		}
	}
	return tab;
}

//Initialisation de elmtTab, qui contient les elements à lire en TTS
var elmtTab = [];
elmtTab = getAllTTSChilds(elmtTab, body);
elmtTab = addSpecials(elmtTab);

//Réinitialise le speaker et le style de la page
function reset() {
	speaker.cancel();
	if (lastElmt) {
		lastElmt.style.border = 'initial';
		lastElmt.style.boxShadow = 'initial';
	}
}

//Paramétrage de la voix de la voix
function getSpeechInstance(msg) {
	var newSI = new SpeechSynthesisUtterance(msg);
	//newSI.volume = 1;
    newSI.pitch = voixo;
	newSI.rate = speedo;
	return newSI;
}

//TextToSpeach du message passe en parametre
function tts(elmt, msg) {
	reset();

	speechInstance = getSpeechInstance(msg);
	speaker.speak(speechInstance);

	elmt.style.border = "solid rgb(151, 187, 244) 3px";
	elmt.style.boxShadow = "0 0 5px rgb(151, 187, 244)";

	lastElmt = elmt;
}

//Prépare le message à lire, si un message doit être lu
function prepareForSpeak(elmt) {
	var msg = null;

	//Test si l'element est un lien ou une image
	if( elmt.tagName.toLowerCase() === 'a' ) msg = elmt.textContent + ": lien" + (elmt.href ? " vers " + elmt.href : "");
	if( elmt.tagName.toLowerCase() === 'img' ) msg = "Image" + (elmt.alt ? " : " + elmt.alt : (elmt.title ? " : " + elmt.title : ""));
	
	if(msg) tts(elmt, msg);

	else {
		if (elmt.textContent !== "" && elmt !== lastElmt) {
			msg = elmt.textContent;
			tts(elmt, msg);
		}
	}
}

//Active ou désactive les interrupteurs de shortcuts
function toggleKeys(n, on) {
	switch (n) {
		case 13 : keyEnter 	= on; break;
		case 17 : keyCtrl 	= on; break;
		case 18 : keyAlt 	= on; break;
		case 70 : keyBack 	= on; break;
		case 72 : keyRepeat = on; break;
		case 74 : keyFront 	= on; break;
		case 83 : keyStop 	= on; break;
		default : return;
	}
}

//Retourne un index modulé à la taille du tableau
function getIndex(index, length) {
	index = index%length;
	while (index < 0) {
		index += length;
	}
	return index;
}

//Effectue la fonction demandée par le shortcut
function readWithShortcuts(mode){
	elmtIndex = (elmtIndex == null ? 0 : elmtIndex);

	switch (mode) {
		case "S" 	: speaker.cancel(); break;
		case "B" 	: elmtIndex --; prepareForSpeak(elmtTab[getIndex(elmtIndex, elmtTab.length)]); break;
		case "F" 	: elmtIndex ++; prepareForSpeak(elmtTab[getIndex(elmtIndex, elmtTab.length)]); break;
		case "R" 	: lastElmt = null; prepareForSpeak(elmtTab[getIndex(elmtIndex, elmtTab.length)]); break;
		case "E"	: if(elmtTab[getIndex(elmtIndex, elmtTab.length)].tagName === "A") { window.open(elmtTab[getIndex(elmtIndex, elmtTab.length)].href,'_blank'); } break;
		default		: break;
	}
}

//Assossie le traitement à faire en fonction du shortcut entré
function prepareShortCuts() {
	if (keyStop) {
		readWithShortcuts("S");
		keyStop = false;
	}
	else if (keyBack) {
		readWithShortcuts("B");
		keyBack = false;
	}
	else if (keyFront) {
		readWithShortcuts("F");
		keyFront = false;
	}
	else if (keyRepeat) {
		readWithShortcuts("R");
		keyRepeat = false;
	}
	else if (keyEnter) {
		readWithShortcuts("E");
		keyEnter = false;
	}
}

function onError(error) {
     console.log(error);
}

function onGot(item) {
    if (item.onoff)
        modeONOFF = item.onoff;
    if (item.speed)
        speedo = item.speed;
    if (item.voix)
        voixo = item.voix;
}

if(modeONOFF){
    //Listener sur les éléments texte
    for (var i = 0, l = elmtTab.length; i < l; ++i) {
        elmtTab[i].addEventListener("mouseover", function(event) {
            elmtIndex = elmtTab.indexOf(this);
            prepareForSpeak(this);
            event.stopPropagation();
        }, false);
    }
}

//Listener sur les touches enfoncées
document.addEventListener("keydown", function(e) {
	if(e.keyCode === 13 || e.keyCode === 17 || e.keyCode === 18 || e.keyCode === 70 || e.keyCode === 72 || e.keyCode === 74 || e.keyCode === 83) {
		toggleKeys(e.keyCode, true);
		if(keyAlt && keyCtrl && (keyStop || keyRepeat || keyBack || keyFront || keyEnter)) {
			prepareShortCuts();
		}
	}
}, false);

//Listener sur les touches qui ne sont plus enfoncées
document.addEventListener("keyup", function(e) {
	if(e.keyCode === 13 || e.keyCode === 17 || e.keyCode === 18 || e.keyCode === 70 || e.keyCode === 72 || e.keyCode === 74 || e.keyCode === 83) {
		toggleKeys(e.keyCode, false);
	}
}, false);
