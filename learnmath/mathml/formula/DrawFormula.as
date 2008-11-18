/*-------------------------------------------------------------
	Created by: Ionel Alexandru 
	Mail: ionel.alexandru@gmail.com
	Site: www.learn-math.info
---------------------------------------------------------------*/
import learnmath.mathml.formula.*;
import flash.events.MouseEvent;
import flash.geom.*;

class DrawFormula{
	var parentBox:Box;
	static var index:Number = 0;
	static var allText;
	
	public function DrawFormula(box:Box){
		parentBox=box;
	}
	
	public function clear(){
		if(allText!=null){
			for(var i=0; i<allText.length; i++){
				var text:TextField = allText[i];
				text.removeTextField();
			}
			allText = new Array();
		}
	}
	
	public function draw(graph:MovieClip, style:Style, leftMiddlePoint:Point):Rectangle{

		ResizeBox.clear();
		parentBox.copyParentStyle(style);
		parentBox.calculateBox(leftMiddlePoint);
		ResizeBox.resizeChildren();
		parentBox.draw(graph);

		var newBounds:Rectangle =  new Rectangle();
		newBounds.x = parentBox.finalBounds.x;
		newBounds.y = parentBox.finalBounds.y;
		newBounds.width = parentBox.finalBounds.width;
		newBounds.height = parentBox.finalBounds.height;
		
		return newBounds;
		
	}
	
	static function createText(graph:MovieClip, startPoint:Point, text:String, style:Style){
			var width = FontConstant.getWidth(style, text);
			var height = FontConstant.getHeight(style, text);
			graph.createTextField("g" + index, graph.getNextHighestDepth(), 0, 0, width, height);
			var l:TextField = eval("graph.g" + index);
			l.selectable = false;
			l._x = startPoint.x;
			l._y = startPoint.y;
			l.text = text;
			l.setTextFormat(FontConstant.getTextFormat(style, style.color));
			//l.onSetFocus = function(l:TextField) {
    		//	trace("" + l.text);
			//};
			index = index + 1;
			addTextField(l);
	}
	
	static function calculateText(bounds:Rectangle, text:String, style:Style){
			bounds.width = FontConstant.getWidth(style, text);
			bounds.height = FontConstant.getHeight(style, text);
	}
	
	static function drawRectangle(graph:MovieClip, bounds:Rectangle){
		graph.lineStyle(1, 0x000000, 100);
		graph.moveTo(bounds.x, bounds.y);
		graph.lineTo(bounds.x + bounds.width, bounds.y);
		graph.lineTo(bounds.x + bounds.width, bounds.y + bounds.height);
		graph.lineTo(bounds.x, bounds.y + bounds.height);
		graph.lineTo(bounds.x, bounds.y);

	}
	
	static function addTextField(text:TextField){
		if(allText==null){
			allText = new Array();
		}
		allText[allText.length] = text;
	}
	
}