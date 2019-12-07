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

	this.altRow = function(y,arr){//array->void
		if(typeof(arr)!="object" || arr.length!=this.dimX){
			console.warn("Warning: faulty array recieved, expected array of length " + this.dimX);
		}else if(y>this.dimY || y<0){
			console.warn("Warning: row does not exist");
		}else{
			this.val[y] = arr;
		}
	}

	this.altColumn = function(x,arr){
		if(typeof(arr)!="object" || arr.length!=this.dimY){
			console.warn("Warning: faulty array recieved, expected array of length " + this.dimY);
		}else if(x>this.dimX || x<0){
			console.warn("Warning: column does not exist");
		}else{
			for(var i=0;i<this.dimY;i++){
				this.val[i][x] = arr[i];
			}
		}
	}

	for(var i=0;i<y;i++){
		this.val[i] = new Array();
		for(var j=0;j<x;j++){
			this.val[i][j] = 0;
		}//init
	}
}
/*Todo

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
