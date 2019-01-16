/*function getText(t) {
	var string = "";
  var childs;
  
  if(t.hasChildNodes()) {
  	childs = t.childNodes;
    
    for(var i = 0, l = childs.length; i < l; ++i) {
      string += getText(childs[i]);
    }
  }

  else {
    alert(t.innerText);
    string += t.textContent;
  }

  return string;
}*/


/*var pTab = document.querySelectorAll("*");
var msg;

for (var i = 0, l = pTab.length; i < l; ++i) {
	pTab[i].addEventListener("mouseover", function() {
    msg = new SpeechSynthesisUtterance(this.textContent);
    window.speechSynthesis.speak(msg);
  }, false);
}*/

var pTab = document.querySelectorAll("body > *");
var msg;
var relatedTarget;

function hasTextChild(elmt) {
	var childs = elmt.childNodes;
	for(var i = 0, l = childs.length; i < l; ++ i) {
		if (childs[i].nodeType === Node.TEXT_NODE) return true;
	}

	return false;
}

function isSpecial(elmt) {
	return this.tagName.toLowerCase() === "a" || this.tagName.toLowerCase() === "img";
}

for (var i = 0, l = pTab.length; i < l; ++i) {
	pTab[i].addEventListener("mouseover", function(event) {
		
		relatedTarget = event.relatedTarget;

	    while (relatedTarget != pTab[i] && relatedTarget.nodeName != 'BODY' && relatedTarget != document) {
	        relatedTarget = relatedTarget.parentNode;
	    }

		if (relatedTarget != pTab[i] && (hasTextChild(this) || isSpecial(this))) {
			
			console.log(this.tagName);
			console.log('yeah');
			this.style.border = "solid rgb(151, 187, 244) 3px";
			this.style.boxShadow = "0 0 5px rgb(151, 187, 244)";

			event.stopPropagation();

			if (this.tagName.toLowerCase() === "a" || this.tagName.toLowerCase() === "img") {
				msg = this.title !== null ? this.title + ". " : "";
				msg += this.href !== null ? "Lien vers " + this.href : "";
			}

			else {
				msg = this.textContent;
			}

			window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
		}
	}, false);

	pTab[i].addEventListener("mouseout", function() {
		if (true) {
			this.style.border = "initial";
			this.style.boxShadow = "initial";
		}
	}, false);
}