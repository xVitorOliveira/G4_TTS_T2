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

//Réglage de la voix
function getSpeechInstance(msg) {
	var newSI = new SpeechSynthesisUtterance(msg);
	newSI.volume = 1;
	newSI.rate = 1.5;
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
function prepareForSpeak(elmt) {
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
}

//Listener sur les éléments texte
for (var i = 0, l = pTab.length; i < l; ++i) {
	pTab[i].addEventListener("mouseover", function(event) {
		var accept = false;
		var elmt = null;
		var msg = "";

		prepareForSpeak(this);

		event.stopPropagation();
	}, false);
}