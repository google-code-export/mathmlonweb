package learnmath.mathml.formula.entities{
/*-------------------------------------------------------------
	Created by: Ionel Alexandru 
	Mail: ionel.alexandru@gmail.com
	Site: www.learn-math.info
---------------------------------------------------------------*/
import learnmath.mathml.formula.entities.*;

public class EntityGroup{
	
	public function getEntities():String{
		return "";
	}

	public function getAllCodes():Array{
		var allCodes:String = getEntities();
		var list:Array = new Array();
		
		var search:String = "<! ";
		var index:Number = allCodes.indexOf(search);
		while(index>-1){
			index = index + 3;
			var code:String = allCodes.substring(index, allCodes.indexOf(" ", index));
			list[list.length] = code;
			
			index = allCodes.indexOf(search, index);
		}
		
		return list;
	}

	public function getAllUnicodes():Array{
		var allCodes:String = getEntities();
		var list:Array = new Array();
		
		var search:String = " &#x";
		var index:Number = allCodes.indexOf(search);
		while(index>-1){
			index = index + 1;
			var unicode:String = allCodes.substring(index, allCodes.indexOf(" ", index));
			list[list.length] = unicode;
			
			index = allCodes.indexOf(search, index + 1);
		}
		
		return list;
	}

	// Ex:unicode = &#x02AEF;
	public function getCode(unicode:String):String{
		if(unicode=="") return "";
		var allCodes:String = getEntities();
		var index:int = allCodes.indexOf(unicode);	
		if(index>-1){
			var firstIndex:int = allCodes.lastIndexOf("<!", index) + 3;	
			var code:String = allCodes.substring(firstIndex, allCodes.indexOf(" ", firstIndex));
			return "&" + code + ";";
		}
		return "";
	}

	// Ex:code = &code;
	public function getUnicode(code:String):String{
		if(code=="") return "";
		
		var allCodes:String = getEntities();
		var search:String = "<! " + code.substring(1, code.length-1) + " ";
		var index:int = allCodes.indexOf(search);	
		if(index>-1){
			var firstIndex:int = allCodes.indexOf("&#x", index);	
			var unicode:String = allCodes.substring(firstIndex, allCodes.indexOf(" ", firstIndex));
			return unicode;
		}
		return "";
	}

	public function getChar(code:String):String{
		var unicode:String = getUnicode(code);
		if(unicode=="") return "";
		
		if(unicode.indexOf(";&#x")>-1){
			var index:int = unicode.indexOf(";&#x");
			var letter1:Number = Number(new Number("0x" + unicode.substring(3, index)).toString(10));
			var letter2:Number = Number(new Number("0x" + unicode.substring(index+4, unicode.length-1)).toString(10));
			var s:String = String.fromCharCode( letter1 ) + String.fromCharCode( letter2 );
			return s;
		}else{
			var letter:Number = Number(new Number("0x" + unicode.substring(3, unicode.length-1)).toString(10));
			return String.fromCharCode( letter );
		}
	}

}

}