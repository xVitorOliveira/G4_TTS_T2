var body = document.querySelector("body");
var lastElmt = null;
var speechInstance = new SpeechSynthesisUtterance("");
var speaker = window.speechSynthesis;
var elmtIndex;
var keyBack = false, keyFront = false, keyStop = false, keyEnter = false, keyRepeat = false, keyAlt = false, keyCtrl = false;

function addSpecials(tab) {
	var specials = document.querySelectorAll("a, img");

	for (var i = 0; i < specials.length; i++) {
		if(tab.indexOf(specials[i]) === -1) {
			tab.push(specials[i]);
		}

	}

	return tab;
}

function containsTextNodes(elmts) {
	for (var i = 0; i < elmts.length; i++) {
		if(elmts[i].nodeType === Node.TEXT_NODE && elmts[i].textContent.trim() !== "") return true;
	}
}

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

	/*if(containsTextNodes(childs)) {
		if(elmt.textContent !== null && elmt.textContent.trim() !== "") {
			tab.push(elmt);
			return tab;
		}
		else {
			return tab;
		}
	}
	else {
		for(var i = 0, l = childs.length; i < l ; i ++) {
			tab = getAllTTSChilds(tab, childs[i]);
		}
		return tab;
	}/*

	/*for (var i = 0; i < childs.length; i++) {

		if(childs[i].nodeType === Node.TEXT_NODE && childs[i].textContent.trim() !== "" && tab.indexOf(elmt) === -1) tab.push(elmt);

		else if (childs[i].textContent !== null && childs[i].textContent.trim() !== "") tab = getAllTTSChilds(tab, childs[i]);
	}

	return tab;
}*/

var elmtTab = [];
elmtTab = getAllTTSChilds(elmtTab, body);
elmtTab = addSpecials(elmtTab);


/*
//Récupère tous les éléments utiles d'une page
function getAllElement() {
	//console.log("a" + pTab.length);
	var arrayElmt = [];
	var elmt;
	for (var i = 0, l = pTab.length; i < l; ++ i) {
		if( pTab[i].tagName.toLowerCase() === 'a' ||  pTab[i].tagName.toLowerCase() === 'img' ) {
			console.log(pTab[i]);
			arrayElmt.push(pTab[i]);
		}
		else {
			elmt = getTextParent(pTab[i]);
			if (elmt.textContent !== "" && arrayElmt.indexOf(elmt) === -1) {
				console.log(elmt);
				arrayElmt.push(elmt);
			}
		}
	}
	console.log("b" + arrayElmt.length);
	return arrayElmt;
}

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
}*/

//Réinitialise le speaker et le style de la page
function reset() {
	speaker.cancel();
	if (lastElmt) {
		lastElmt.style.border = 'initial';
		lastElmt.style.boxShadow = 'initial';
	}
}

//Réglage de la voix
function getSpeechInstance(msg) {
	var newSI = new SpeechSynthesisUtterance(msg);
	newSI.volume = 1;
	newSI.rate = 2;
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

//Si l'element contient un texte qui doit être lu, le message est envoye a la fonction tts
/*function prepareForSpeak(elmt) {
	msg = null;

	//Test si l'element est un lien ou une image
	if( elmt.tagName.toLowerCase() === 'a' ) msg = "Lien" + (elmt.href ? " vers " + elmt.href : "");
	if( elmt.tagName.toLowerCase() === 'img' ) msg = "Image" + (elmt.alt ? " : " + elmt.alt : (elmt.title ? " : " + elmt.title : ""));
	
	if(msg) tts(elmt, msg);

	//Test sur le parent le plus élevé contenant du texte
	else {
		elmt = getTextParent(elmt);
		if (elmt.textContent !== "" && elmt !== lastElmt) {
			msg = elmt.textContent;
			tts(elmt, msg);
		}
	}
}*/

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

function toggleKeys(n, on) {
	//console.log("n : " + n + "\non : " + on);
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

function getIndex(index, length) {
	index = index%length;
	while (index < 0) {
		index += length;
	}
	return index;
}

function readWithShortcuts(mode){
	elmtIndex = (elmtIndex == null ? 0 : elmtIndex);

	switch (mode) {
		case "S" 	: speaker.cancel(); break;
		case "B" 	: elmtIndex --; prepareForSpeak(elmtTab[getIndex(elmtIndex, elmtTab.length)]); break;
		case "F" 	: elmtIndex ++; prepareForSpeak(elmtTab[getIndex(elmtIndex, elmtTab.length)]); break;
		case "R" 	: lastElmt = null; prepareForSpeak(elmtTab[getIndex(elmtIndex, elmtTab.length)]); break;
		case "E"	: if(elmtTab[getIndex(elmtIndex, elmtTab.length)].tagName === "A") { window.open(elmtTab[getIndex(elmtIndex, elmtTab.length)].href,'_blank'); } break;
		default			: break;
	}

	//console.log(elmtIndex);

    /*if(speechInstance != null)
        window.speechSynthesis.cancel(speechInstance);

    if (elmtIndex != 0 && mode == "back")
        elmtIndex--;

   	var accept = false;
	var elmt = null;
	var msg = "";

	prepareForSpeak(this);

	event.stopPropagation();

    if(mode == "front") elmtIndex++;*/
}



//Listener sur les éléments texte
for (var i = 0, l = elmtTab.length; i < l; ++i) {
	elmtTab[i].addEventListener("mouseover", function(event) {
		elmtIndex = elmtTab.indexOf(this);
		prepareForSpeak(this);
		event.stopPropagation();
	}, false);
}


if (elmtTab.length >= 1) {
	document.addEventListener("keydown", function(e) {
		//console.log("down : " + e.keyCode);
		if(e.keyCode === 13 || e.keyCode === 17 || e.keyCode === 18 || e.keyCode === 70 || e.keyCode === 72 || e.keyCode === 74 || e.keyCode === 83) {
			toggleKeys(e.keyCode, true);
			if(keyAlt && keyCtrl && (keyStop || keyRepeat || keyBack || keyFront || keyEnter)) {
				prepareShortCuts();
			}
		}
	}, false);

	document.addEventListener("keyup", function(e) {
		if(e.keyCode === 13 || e.keyCode === 17 || e.keyCode === 18 || e.keyCode === 70 || e.keyCode === 72 || e.keyCode === 74 || e.keyCode === 83) {
			toggleKeys(e.keyCode, false);
		}
	}, false);

}