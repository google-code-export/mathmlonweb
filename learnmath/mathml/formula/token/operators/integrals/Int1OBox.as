package learnmath.mathml.formula.token.operators.integrals{
/*-------------------------------------------------------------
	Created by: Ionel Alexandru 
	Mail: ionel.alexandru@gmail.com
	Site: www.learn-math.info
---------------------------------------------------------------*/
import learnmath.mathml.formula.*;
import learnmath.mathml.formula.token.*;
import learnmath.mathml.formula.token.operators.*;
import learnmath.mathml.formula.token.operators.integrals.*;
import learnmath.mathml.formula.script.*;
import flash.geom.*;
import flash.display.MovieClip;

public class Int1OBox extends IntOBox{

	public function	Int1OBox(parentBox:Box):void{
		super(parentBox);
	}
	
	override public function calculate():void{
		var h1:Number = FontConstant.getHeight(style, "X");
		step = h1/10;
		finalBounds.width=k*h1 + step;
		intWidth = k*h1;
		finalBounds.height=h1;
		finalBounds.y=finalBounds.y-finalBounds.height/2;
		//ResizeBox.addBox(this);
	}
	
	
	override public function draw(graph:MovieClip):void{
		drawIntegral(graph, finalBounds.x, finalBounds.y, finalBounds.width-step, finalBounds.height)
		drawIntegral(graph, finalBounds.x + step, finalBounds.y, finalBounds.width-step, finalBounds.height)
	}

	override public function toString():String{
		return "Int1OBox";
	}
}

}