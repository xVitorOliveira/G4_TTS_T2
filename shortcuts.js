    document.onkeyup = function(e) {
        if (e.which == 16 && e.which == 70)
            readWithShortcuts("front",this);
        else if (e.which == 16 && e.which == 74) 
            readWithShortcuts("back",this);
    };
    

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


    function readWithShortcuts(mode,tab){
    if(speechInstance != null)
        window.speechSynthesis.cancel(speechInstance);

    if (i != 0 && mode == "back")   
        i--;

    while(i <= l) {
        if( tabTTS[i].tagName.toLowerCase() === 'a' || tabTTS[i].tagName.toLowerCase() === 'img') {
            elmt = tab;
            accept = true;
            msg = tabTTS[i].title !== null && tabTTS[i].title !== "" ? tabTTS[i].title + ". " : "";
            msg += tabTTS[i].href !== null ? "Lien vers " + tabTTS[i].href : "";
        }
        else {
            elmt = getTextParent(tabTTS[i]);
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
            window.speechSynthesis.speak(speechInstance=new SpeechSynthesisUtterance(msg));
            lastElmt = elmt;
            event.stopPropagation();
        }
    }

    if(mode == "front")
        i++;
    }