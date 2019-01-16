var pTab = document.querySelectorAll("body *, a, img");
var lastElmt = null;

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
			else if(elmt === lastElmt) {
				elmt.style.border = "solid rgb(151, 187, 244) 3px";
	    		elmt.style.boxShadow = "0 0 5px rgb(151, 187, 244)";
			}
		}

		if(accept) {
			elmt.style.border = "solid rgb(151, 187, 244) 3px";
	    	elmt.style.boxShadow = "0 0 5px rgb(151, 187, 244)";
	    	//console.log(msg);
	    	window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
	    	lastElmt = elmt;

	    	event.stopPropagation();
		}
	}, false);

	pTab[i].addEventListener("mouseout", function() {
		this.style.border = "initial";
		this.style.boxShadow = "initial";
	}, true);
}