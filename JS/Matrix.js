function Matrix(x,y){
	this.dimX = x;//#columns
	this.dimY = y;//#rows
	this.val = new Array();//->array(array(),array(),ect.)
	this.addColumns = function(n){//->void
		for(var i=0;i<this.dimY;i++){
			for(var j=0;j<n;j++){
				this.val[i][this.dimX+j]=0;
			}
		}
		this.dimX += n;
	}
	this.addRows = function(n){//->void
		for(var i=0;i<n;i++){
			this.val[this.dimY+i] = new Array();
			for(var j=0;j<this.dimX;j++){
				this.val[this.dimY+i][j] = 0;
			}
		}
		this.dimY+=n;
	}





	for(var i=0;i<y;i++){
		this.val[i] = new Array();
		for(var j=0;j<x;j++){
			this.val[i][j] = 0;
		}
	}
}
/*Todo
alter rows/columns
drop rows/columns
get rows/columns
matrix addition
scalar multiplication
matrix multiplication (left/right)
determinants
transposes
inverses
trace
conjugate?
*/



var m = new Matrix(2,2);
