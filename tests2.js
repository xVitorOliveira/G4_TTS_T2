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


var pTab = document.querySelectorAll("*");
var msg;

for (var i = 0, l = pTab.length; i < l; ++i) {
	pTab[i].addEventListener("mouseover", function() {
    msg = new SpeechSynthesisUtterance(this.textContent);
    window.speechSynthesis.speak(msg);
  }, false);
}