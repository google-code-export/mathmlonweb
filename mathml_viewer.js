//-------------------------------------------------------------
//	Created by: Ionel Alexandru 
//	Mail: ionel.alexandru@gmail.com
//	Site: www.learn-math.info
//---------------------------------------------------------------

var nbFlash = 0;
var flashMathML = new Array();

function getElement(id) {
	return document.getElementById ? document.getElementById(id) : document.all[id];
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
	return '<OBJECT classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" name="'+name+'" id="'+name+'" width="'+w+'" height="'+h+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" align="middle"><param name=wmode value="transparent"><PARAM NAME="allowScriptAccess" VALUE="always"><PARAM NAME="allowFullScreen" VALUE="true"><PARAM NAME="movie" VALUE="'+flashUrl+'"><PARAM NAME="loop" VALUE="false"><PARAM NAME="quality" VALUE="high"><PARAM NAME="bgcolor" VALUE="#ffffff"><embed src="'+flashUrl+'" wmode="transparent" loop="false" quality="high" bgcolor="#ffffff" width="'+w+'" height="'+h+'" name="'+name+'" id="'+name+'" swliveconnect=true  allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" /></OBJECT>';
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

function displayText(text){
	text = formatXML(text);
	var dT = getElement("dT");
	if(!dT){
		var div = document.createElement('div');
		div.setAttribute("id", "dT");
		
		var pElem = document.createElement("h3");
		pElem.appendChild(document.createTextNode("MathML"));
		pElem.align="center";
		pElem.style.cursor="pointer";
		pElem.onclick=hideBox;
		
		div.appendChild(pElem);
		
		var textElem = document.createElement("textarea");
		textElem.value = text;
		textElem.setAttribute("id", "textId");
		

		textElem.style.width="500px";textElem.style.height="400px";textElem.setAttribute("id", "textId");
		div.appendChild(textElem);
		
		var x = (document.body.clientWidth - 500)/2 + document.body.scrollLeft;
		var y = (document.body.clientHeight - 400)/2 + document.body.scrollTop;
		div.style.top = y +"px"; div.style.left = x+ "px"; div.style.width = "500px"; div.style.height = "400px";
		div.style.position = "absolute";
		div.style.float = "none";
		div.style.background="dddddd"; div.style.border ="1 solid";
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
	
	xml = xml.replace(/  /g," ");	
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