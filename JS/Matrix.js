function Matrix(y,x){
	this.dimX = x;//int (columns)
	this.dimY = y;//int (rows)
	this.val = new Array();//array(array(),array(),ect.)
	

	this.isMatrix = function(y,x){//int,int->bool
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

	this.clone = function(){//WIP: new matrix points to same storage as parent matrix
		var t = new Matrix(this.dimY,this.dimX);
		for(var i = 0; i<this.dimX; i++){
			for(var j = 0; j<this.dimY; j++){
				t.altElement(i,j,this.getElement(i,j));
			}
		}
		return t;
	}

	this.addColumns = function(n){//int->void
		for(var i=0;i<this.dimY;i++){
			for(var j=0;j<n;j++){
				this.val[i][this.dimX+j]=0;
			}
		}
		this.dimX += n;
	}

	this.addRows = function(n){//int->void
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

	this.altElement = function(y,x,n){//int,int,number->void
		if(this.beautify){
			n = n;
		}
		this.val[y][x] = n;
	}

	this.dropRow = function(y){//int->void
		this.val.splice(y,1);
		this.dimY--;
	}

	this.dropColumn = function(x){//int->void
		for(row of this.val){
			row.splice(x,1);
		}
		this.dimX--;
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

	this.getElement = function(y,x){//int,int->number
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
					sum.altElement(j,i,(this.getElement(j,i)+m.getElement(j,i)));
				}
			}
			return sum;
		}
	}

	this.cMultiply = function(c){//number->Matrix
		var cm = new Matrix(this.dimX,this.dimY);
		for(var i=0;i<this.dimY;i++){
			for(var j=0;j<this.dimX;j++){
				cm.altElement(i,j,(this.getElement(i,j)*c));
			}
		}
		return cm;
	}

	this.leftMultiply = function(m){//Matrix->Matrix//The owner matrix is on the right, the guest matrix on the left.
		if(m.dimX!=this.dimY || typeof(m)!="object"){
			console.warn("Warning: These matrices cannot be multiplied");
		}else{
			var mn = new Matrix(m.dimY,this.dimX);
			for(var n=0;n<m.dimY;n++){
				for(var p=0;p<this.dimX;p++){
					var j=0;
					for(var i=0;i<this.dimY;i++){
						j+=(m.getElement(n,i)*this.getElement(i,p));
					}

					mn.altElement(n,p,j);
				}
			}

		}
		return mn;
	}

	this.rightMultiply = function(m){//Matrix->Matrix//The owner matrix is on the left, the guest matrix on the right.
		return m.leftMultiply(this);
	}

	this.transpose = function(){//->Matrix
		var t = new Matrix(this.dimX,this.dimY)
		for(var i=0;i<this.dimY;i++){
			for(var j=0;j<this.dimX;j++){
				t.altElement(j,i,this.getElement(i,j));
			}
		}
		return t;
	}

	this.trace = function(){//->number
		var tr = 0;
		var c = Math.min(this.dimX,this.dimY);
		for(var i=0;i<c;i++){
			tr+=this.getElement(i,i);
		}
		return tr;
	}

	this.minor = function(i){//int->Matrix
		var c = this.clone();
		c.dropRow(0);
		c.dropColumn(i);
		return c;
	}

	this.trueminor = function(posy,posx){//int,int->Matrix
		var c = this.clone();
		c.dropRow(posy);
		c.dropColumn(posx);
		return c;
	}

	this.det = function(){//->number
		if(this.dimY!=this.dimX){
			console.error("Cannot give a determinant of a non-square matrix");
			return false;
		}else if(this.dimY == 2){
			return ((this.getElement(0,0)*this.getElement(1,1))-(this.getElement(1,0)*this.getElement(0,1)));
		}else{
			var d = 0;
			var minor = undefined;
			for(var i=0;i<this.dimY;i++){
				minor = this.minor(i); 
				
				if(i%2==0){
					d+=(minor.det()*this.getElement(0,i));
					
				}else{
					d-=(minor.det()*this.getElement(0,i));
					
				}
			}
			return d;

		}
	}

	this.inverse = function(){//->Matrix
		if(this.dimX!=this.dimY){
			console.error("Cannot return an inverse matrix of a non-square matrix");
			return false;
		}else if(this.det()==0){
			console.warn("Cannot return inverse, matrix is singular");
			return false;
		}else{
			var inv = new Matrix(this.dimX,this.dimY);
			for(var i=0;i<this.dimY;i++){
				for(var j=0;j<this.dimX;j++){
					
					var c = this.trueminor(j,i);
					
					if((j+i)%2==0){
						c = c.det();
					}else{
						c = c.det()*-1;
					}
						;
					c /= this.det();
					
					inv.altElement(i,j,c);
				}
			}
		}
		return inv;//this.leftMultiply(inv).val -> [I]
	}



	for(var i=0;i<y;i++){//init
		this.val[i] = new Array();
		for(var j=0;j<x;j++){
			this.val[i][j] = 0;
		}
	}
}



/*TODO
diagonalizations?
*/


var n = new Matrix(2,2);//debug dummies
n.altRow(0,[1,2]);
n.altRow(1,[3,4]);

var m = new Matrix(3,3);
m.altRow(0,[1,2,3]);
m.altRow(1,[4,8,6]);
m.altRow(2,[7,-2,9]);

var q = new Matrix(4,4);
q.altRow(0,[2,-1,4,5]);
q.altRow(1,[-1,0,0,3]);
q.altRow(2,[4,3,5,-3]);
q.altRow(3,[2,2,-3,0]);

//open question: where does "this" refer to?
