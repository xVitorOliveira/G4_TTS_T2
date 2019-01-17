var pTab = document.querySelectorAll("body *, a, img");
var lastElmt = null;
var speechInstance = new SpeechSynthesisUtterance("");
var speaker = window.speechSynthesis;

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

function reset() {
	speaker.cancel();
	if (lastElmt) {
		lastElmt.style.border = 'initial';
		lastElmt.style.boxShadow = 'initial';
	}
}

for (var i = 0, l = pTab.length; i < l; ++i) {
	pTab[i].addEventListener("mouseover", function(event) {
		var accept = false;
		var elmt = null;
		var msg = "";

		if( this.tagName.toLowerCase() === 'a' || this.tagName.toLowerCase() === 'img') {
			elmt = this;
			accept = true;
			msg = this.title !== null && this.title !== "" ? this.title + ". " : "";
			msg += this.href !== null ? "Lien vers " + this.href : "";
		}

		else {
			elmt = getTextParent(this);
			if (elmt.textContent !== "" && elmt !== lastElmt) {
				accept = true;
				msg = elmt.textContent;
			}
		}

		if(accept) {
			reset();

			elmt.style.border = "solid rgb(151, 187, 244) 3px";
	    	elmt.style.boxShadow = "0 0 5px rgb(151, 187, 244)";

	    	console.log("msg : " + msg);

	    	speechInstance = new SpeechSynthesisUtterance(msg);
	    	speaker.speak(speechInstance);

	    	lastElmt = elmt;

	    	event.stopPropagation();
		}
	}, false);
}