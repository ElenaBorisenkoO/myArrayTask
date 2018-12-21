export default MyArray;

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

		


		myArray.prototype.map = function(){
			var resultArr=[];
			if(arguments.length!==0 && (typeof arguments[0]==='function')){

				for(let i=0; i<this.elements.length; i++){
					
					arguments[0](this.elements[i],i,this.elements);
					resultArr[i] = this.elements[i];
					
				}

			}

			return resultArr;
		}


		myArray.prototype.toString = function(){

			var resultString =" ";

			for(let i =0; i<this.elements.length; i++){

				resultString+= this.elements[i];
			}

			return resultString;
		}



		myArray.prototype.filter = function(){

			var filterElements=[];

			if(arguments.length!==0 && (typeof arguments[0]==='function')){

				for(let i=0; i<this.elements.length; i++){

					if(arguments[0](this.elements[i],i,this.elements)){
						filterElements[i] = this.elements[i];
					}		     
				}		 	
			}
			return filterElements;
		}




		myArray.prototype.reduce = function () {
                //if array is undefined or array is empty we shoudn't do anything
                if (this.elements === undefined) {
                	return undefined;
                }
                if (this.elements.length === 0) {
                	return undefined;
                }

                //if array contains at least 1 elem
                var accumulator;
                if (arguments.length !== 0 && (typeof arguments[0] === 'function')) {
                	let start;
                	if (arguments[1] !== undefined) {
                        //passing init value
                        accumulator = arguments[1];
                        start = 0;
                    } else {
                        //default valu = 1st element in array
                        let dv = typeof this.elements[0] === 'object' ? "" : 0;
                        accumulator = arguments[0](dv, this.elements[0], 0, this.elements);
                        start = 1;
                    }

                    for (let i = start; i < this.elements.length; i++) {
                    	accumulator = arguments[0](accumulator, this.elements[i], i, this.elements);
                    }
                }
                return accumulator;
            };

            let reducer = (acc, item) => acc + item;




            myArray.from = function (elements, mapFunction) {
                //check if arrayLike element present
                if (elements === undefined || elements === null) {
                	throw new Error("first argument not defined");
                }

                //check if element is iterable
                if (!(typeof elements[Symbol.iterator] === 'function')) {
                	throw new Error("arrayLike element is not iterable");
                }

                let applyMapFunction = (mapFunction !== undefined && typeof mapFunction === 'function');

                var newInstance = new myArray();
                
                for (let i = 0; i < elements.length; i++) {
                	newInstance[i] = applyMapFunction ? mapFunction(elements[i]) : elements[i];
                }
                return newInstance;
            };

          
            myArray.prototype.sort = function (comparator) {

            	function defaultComparator(a, b) {
            		let aString = a.toString();
            		let bString = b.toString();
            		if (aString === bString) {
            			return 0;
            		} else if (aString < bString) {
            			return -1;
            		} else {
            			return 1;
            		}
            	}

            	if (!(comparator !== undefined && typeof comparator === 'function')) {
            		comparator = defaultComparator;
            	}

            	let barrier = this.elements.length - 1;
            	for (let i = 0; i < this.elements.length; i++) {
            		for (let j = 0; j < barrier; j++) {
            			let result = comparator(this.elements[j], this.elements[j + 1]);
            			if (result > 0) {
            				let temp = this.elements[j];
            				this.elements[j] = this.elements[j + 1];
            				this.elements[j + 1] = temp;
            			}
            		}
            		barrier--;
            	}
                return this.elements;
            };