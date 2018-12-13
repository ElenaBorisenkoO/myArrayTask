function myArray(){

	this.elements = [];

	for(var i=0; i<arguments.length; i++){

		this.elements[i]=arguments[i];
	}
}

myArray.prototype.push = function(){

	if(arguments.length!==0){

		var len = this.elements.length;

		for(let i=0; i<arguments.length; i++){
			this.elements[len+i]=arguments[i];
		}
	}
	return this.elements.length;
};

myArray.prototype.pop = function(){

	var x;

	if(this.elements.length!==0){
		x = this.elements[this.elements.length-1];

		var newelements = [];

		for (let i =0; i<this.elements.length-1; i++){
			newelements[i]=this.elements[i];
		}
		this.elements=newelements;
	}
	return x;

}

myArray.prototype.forEach = function(){

			//if(callback !== undefined && (typeof callback ==='function')){

				if( arguments.length!==0 && (typeof arguments[0]==='function')){

					for(let i=0; i<this.elements.length; i++){

						arguments[0](this.elements[i],i,this.elements);

					//callback(this.elements[i],i,this.elements);
				}
			}
		}
