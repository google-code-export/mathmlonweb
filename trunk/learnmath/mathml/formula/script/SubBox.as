package learnmath.mathml.formula.script{
/*-------------------------------------------------------------
	Created by: Ionel Alexandru 
	Mail: ionel.alexandru@gmail.com
	Site: www.learn-math.info
---------------------------------------------------------------*/
import learnmath.mathml.formula.*;
import learnmath.mathml.formula.layout.*;
import flash.geom.*;
import flash.display.MovieClip;

public class SubBox extends Box{
	
	public var base:Box;
	public var sub:Box;
	
	public function	SubBox(parentBox:Box):void{
		super(parentBox);
	}
	
	override public function calculate():void{
		var cP:Point = new Point();
		cP.x = originPoint.x;
		cP.y = originPoint.y;
		base.calculateBox(cP);
		
		var cE:Point = new Point();
		cE.x = originPoint.x + base.finalBounds.width;
		if(sub is FracBox){
			cE.y = originPoint.y + base.finalBounds.height/2;
		}else{
			cE.y = originPoint.y + base.finalBounds.height/3;
		}
		sub.calculateBox(cE);

		finalBounds.x = base.finalBounds.x;
		finalBounds.y = base.finalBounds.y;
		finalBounds.width = base.finalBounds.width + sub.finalBounds.width;
		finalBounds.height = sub.finalBounds.y + sub.finalBounds.height - base.finalBounds.y;
	}


	override public function moveMyChildren():void{
		var cP:Point = new Point();
		cP.x = originPoint.x;
		cP.y = originPoint.y;
		base.moveOriginTo(cP);
		
		var cS:Point = new Point();
		cS.x = originPoint.x + base.finalBounds.width;
		if(sub is FracBox){
			cS.y = originPoint.y + base.finalBounds.height/2;
		}else{
			cS.y = originPoint.y + base.finalBounds.height/3;
		}
		sub.moveOriginTo(cS);
	}


	override public function copyParentStyle(_styleParent:Style):void{
		var s:int = 3;
		if(sub is FracBox){ s = 5}
		super.copyParentStyle(_styleParent);
		
		base.copyParentStyle(this.style);
		var newStyle:Style = this.style.getCopy();
		newStyle.size = newStyle.size -s;
		newStyle.fontweight='bold';
		sub.copyParentStyle(newStyle);
	}
	
	override public function draw(graph:MovieClip):void{
		base.drawBox(graph);
		sub.drawBox(graph);
	}
}

}