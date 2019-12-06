function Matrix(x,y){
	this.dimX = x;
	this.dimY = y;
	this.val = [];
	this.addColumns = function(n){
		this.dimX += n;
	}
	this.addRows = function(n){
		this.dimY += n;
	}





	for(var i=0;i<x;i++){
		for(var j=0;j<y;j++){
			this.val[i][j] = 0;
		}
	}
}