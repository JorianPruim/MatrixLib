function Matrix(x,y){
	this.dimX = x;//int (columns)
	this.dimY = y;//int (rows)
	this.val = new Array();//array(array(),array(),ect.)

	this.isMatrix = function(x,y){//int,int->bool
		if(typeof(this)!="object"){
			return false;
		}else if(this.val.length != y){
			return false;
		}else{
			check = true;
			for(var i of this.val){
				if(i.length!=x){
					check = false;
				}else{continue;}
			}
			return check;
		}
	}

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

	this.altRow = function(y,arr){//int,array->void
		if(typeof(arr)!="object" || arr.length!=this.dimX){
			console.warn("Warning: faulty array recieved, expected array of length " + this.dimX);
		}else if(y>this.dimY || y<0){
			console.warn("Warning: row does not exist");
		}else{
			this.val[y] = arr;
		}
	}

	this.altColumn = function(x,arr){//int,array->void
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

	this.altElement = function(x,y,n){//int,int,int->void
		this.val[y][x] = n;
	}

	this.dropRow = function(y){//int->void
		this.val.splice(y,1);
	}

	this.dropColumn = function(x){//int->void
		for(row of this.val){
			row.splice(x,1);
		}
	}

	this.getRow = function(y){//int->array
		return this.val[y];
	}

	this.getColumn = function(x){//int->array
		var col = new Array();
		for(var i=0;i<this.dimY;i++){
			col.push(this.val[i][x]);
		}
		return col;
	}

	this.getElement = function(x,y){
		return this.val[y][x];
	}

	this.mAdd = function(m){//Matrix->Matrix
		if(typeof(m)!="object"){
			console.warn("Warning: the matrix you want to add is not a matrix");
		}else if(!m.isMatrix(this.dimX,this.dimY)){
			console.warn("Warning: cannot add matrices of diffrent sizes");
		}else{
			var sum = new Matrix(this.dimX,this.dimY);
			for(var i=0;i<this.dimX;i++){
				for(var j=0;j<this.dimY;j++){
					sum.altElement(i,j,(this.getElement(i,j)+m.getElement(i,j)));
				}
			}
			return sum;
		}
	}

	this.cMultiply = function(c){//int->Matrix
		var cm = new Matrix(this.dimX,this.dimY);
		for(var i=0;i<this.dimY;i++){
			for(var j=0;j<this.dimX;j++){
				cm.altElement(j,i,(this.getElement(j,i)*c));
			}
		}
		return cm;
	}


	for(var i=0;i<y;i++){
		this.val[i] = new Array();
		for(var j=0;j<x;j++){
			this.val[i][j] = 0;
		}//init
	}
}
/*TODO
scalar multiplication
matrix multiplication (left/right)
transposes
trace
determinants
inverses
cofactor?
*/



var m = new Matrix(2,2);
m.altRow(0,[1,2]);
m.altRow(1,[3,4]);
var n = m.cMultiply(2);
