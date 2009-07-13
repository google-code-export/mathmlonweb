//-------------------------------------------------------------
//	Created by: Ionel Alexandru 
//	Mail: ionel.alexandru@gmail.com
//	Site: www.learn-math.info
//---------------------------------------------------------------

var nbFlash = 0;
var flashMathML = new Array();
var textToEdit = "";
var idToEdit = "";


function getElement(id) {
	return document.getElementById ? document.getElementById(id) : document.all[id];
}

function getSWF(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1) {
        return window[movieName];
    }
    else {
      if(document[movieName].length != undefined){
          return document[movieName][1];
      }
        return document[movieName];
    }
}

function getFlashElement(id) {
         if (navigator.appName.indexOf("Microsoft") != -1) {
             return window[id];
         } else {
             return document[id];
         }
     }

function searchAndReplace(){
	var list=document.getElementsByTagName("m:math");
	replaceAllTags(list)
	list=document.getElementsByTagName("math");
	replaceAllTags(list)
}

function replaceAllTags(list){
	var size = list.length;
	for(var i=0; i<size;i++){
		replaceTag(list[0]);
	}
}

function replaceTag(mathmlTag){
	var mathmlText = getMathMLString(mathmlTag.innerHTML);
	nbFlash =nbFlash + 1;
	
	var parent = mathmlTag.parentNode;
	parent.setAttribute("id", "DivF" + nbFlash);
	parent.style.width=1;
	parent.style.height=1;
	parent.innerHTML = getFlash("mathmlViewer.swf?htmlId=F" + nbFlash , '100%', '100%', "F" + nbFlash);
	parent.style.display="inline-block";
	parent.style.zIndex=0;
	flashMathML["F" + nbFlash] = mathmlText;
	
}

function getMathML(name){
	return flashMathML[name];
}
	
	
function getMathMLString(text){
	if(text.indexOf("<?")==0){
		text = text.substring(text.indexOf("/>") + 2);
	}
	
	text = text.replace(/\n/g,"");
	text = text.replace(/m:m/g,"m");
	return text;
}


function getFlash(flashUrl, w, h, name){
	return '<OBJECT classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" name="'+name+'" id="'+name+'" width="'+w+'" height="'+h+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" align="middle"><param name=wmode value="transparent"><PARAM NAME="allowScriptAccess" VALUE="always"><PARAM NAME="allowFullScreen" VALUE="true"><PARAM NAME="movie" VALUE="'+flashUrl+'"><PARAM NAME="loop" VALUE="false"><PARAM NAME="quality" VALUE="high"><PARAM NAME="bgcolor" VALUE="#ffffff"><embed src="'+flashUrl+'" wmode="transparent" loop="false" quality="high" bgcolor="#ffffff" width="'+w+'" height="'+h+'" name="'+name+'" id="'+name+'" swliveconnect=true  allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" /></OBJECT>';
}


function resizeFlash(name, w, h){
	var obj = getElement("Div" + name);
	obj.style.width = parseFloat(w);
	obj.style.height = parseFloat(h);
}


function encodeText(text){
	text = encodeURIComponent(text);
	return text;
}

function viewMathML(id, text){
	idToEdit = id;
	textToEdit = text;
	displayText(text);
}


function editMathML(id, text){
	var div = getElement('editDiv');
	div.style.width = 805;
	div.style.height = 405;

	var top = (getHeight() - 405)/2;
	var left = (getWidth() - 805)/2;
	div.style.left = left;
	top = top + getScrollY();
	div.style.top = top;
	
	textToEdit = text;
	idToEdit = id;
	
	setTimeout(setTextInEditor, 800);
	var editor = getSWF('editML');
	editor.setMathML(textToEdit);
}

function setTextInEditor(){
	var editor = getSWF('editML');
	editor.setMathML(textToEdit);
	editor.focus();
	clearTimeout();
}

// these methods are called by editor
function resizeEditor(name, w, h){
}

function closeEditorWithJavascript(mathML){
	var div = getElement('editDiv');
	div.style.width = 0;
	div.style.height = 0;
}
function getMathMLFromJavascript(){
	return textToEdit;
}

function saveMathMLToJavascript(mathML){
	var f = getSWF(idToEdit);
	textToEdit = mathML;
	f.setMathML(mathML);
}

// editor end

function saveFromJavascript(){
	var textElem = getElement("textId");
	var f = getSWF(idToEdit);
	textToEdit = textElem.value;
	f.setMathML(textToEdit);
}



function displayText(text){
	text = formatXML(text);
	var dT = getElement("dT");
	if(!dT){
		var div = document.createElement('div');
		div.setAttribute("id", "dT");
		
		var center = document.createElement("center");
		var save = document.createElement("a");
		center.appendChild(save);
		save.appendChild(document.createTextNode("Save/Display"));
		save.align="center";
		save.style.cursor="pointer";
		save.onclick=saveFromJavascript;
		
		center.appendChild(document.createTextNode("                 "));
		
		var hide = document.createElement("a");
		center.appendChild(hide);
		hide.appendChild(document.createTextNode("Close"));
		hide.align="center";
		hide.style.cursor="pointer";
		hide.onclick=hideBox;

		div.appendChild(center);

		var textElem = document.createElement("textarea");
		textElem.value = text;
		textElem.setAttribute("id", "textId");
		

		textElem.style.width="500px";textElem.style.height="400px";textElem.setAttribute("id", "textId");
		textElem.wrap="off";
		div.appendChild(textElem);
		
		var x = (document.body.clientWidth - 500)/2 + document.body.scrollLeft;
		var y = (document.body.clientHeight - 400)/2 + document.body.scrollTop;
		div.style.top = y +"px"; div.style.left = x+ "px"; div.style.width = "500px"; div.style.height = "400px";
		div.style.position = "absolute";
		div.style.float = "none";
		div.style.background="#dddddd"; div.style.border ="1 solid";
		div.style.zIndex=100;

		document.body.appendChild(div);
	}else{
		dT.style.display = "block";
		var t = getElement("textId");
		t.value = text;

		var x = (document.body.clientWidth - 500)/2 + document.body.scrollLeft;
		var y = (document.body.clientHeight - 400)/2 + document.body.scrollTop;
		dT.style.top = y +"px"; dT.style.left = x+ "px";
	}
}

function formatXML(xml){
	var cTab = 0;
	
	while(xml.indexOf("  ")>-1){
		xml = xml.replace(/  /g," ");	
	}
	xml = xml.replace(/\r/g,"");	
	xml = xml.replace(/\t/g,"");	
	xml = xml.replace(/\n/g,"");	
	xml = xml.replace(/> </g,"><");	
	xml = xml.replace(/></g,">\n<");
	xml = xml.replace(/><</g,">&lt;<");	
	xml = xml.replace(/>></g,">&gt;<");	
	xml = xml + "\n";
	
	var newXml = "";
	var i=0;
	
	var endChar = "\n";
	if(xml.indexOf("\r")>-1){ endChar = "\r"; }
	
	while(xml.indexOf(endChar, i)>-1){
		var endI = xml.indexOf(endChar, i);
		var line = xml.substring(i, endI+1);
		if(line.indexOf("</")==0){
			cTab = cTab -1;
		}
		newXml = newXml + getTabs(cTab) + line;
		if(line.indexOf("</")==-1){
			cTab = cTab +1;
		}
		
		i = endI + 1;
	}
	return newXml;
}


function getTabs(n){
	vartabs = "";
	for(i=0; i<n; i++){
		vartabs = vartabs + "\t";
	}
	return vartabs;
}

function hideBox(){
	var dT = getElement("dT");
	dT.style.display = "none";
}

function getWidth(){
  var myWidth = 0;
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    myWidth = window.innerWidth;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myWidth = document.documentElement.clientWidth;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myWidth = document.body.clientWidth;
  }
	return myWidth;
}

function getHeight(){
  var myHeight = 0;
  if( typeof( window.innerHeight ) == 'number' ) {
    //Non-IE
    myHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    myHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    myHeight = document.body.clientHeight;
  }
  return myHeight;
}

function getScrollY(){
	var scrollY=0;
	if( typeof(window.pageYOffset)=='number'){
		scrollY = window.pageYOffset;
	}else if(document.body && document.body.scrollTop){
		scrollY = document.body.scrollTop
	}else if(document.documentElement && document.documentElement.scrollTop){
		scrollY = document.documentElement.scrollTop;
	}
	return scrollY;
}
