class OwnArray<T>{
    length: number;
    elementData: any[] = [];
    constructor(...data: any) {
        if (data.length === 1 && typeof data[0] === 'number') {
            this.elementData.length = data[0];
        } else {
            this.length = data.length;
            for (let i = 0; i < data.length; i++) {
                this.elementData[i] = data[i];
            }
        }
    }
    forEach(callback: (data: any, index: number, src: any) => any, thisArg: any = this): void {  //что делать с thisArg, если он не задан. Нужен ли он вообще?Какой тип?
        for (let i = 0; i < this.length; i++) {
            callback(this.elementData[i], i, this);
        }
    }
    push(...data: any): number {
        for (let i = 0; i < data.length; i++) {
            const currentLength = this.length;
            this.elementData[currentLength] = data[i];
            this.length += 1;
        }
        return this.length;
    }
    pop(): any {
        const resultElement = this.elementData[this.elementData.length - 1];

        if (this.elementData.length !== 0) {
            let newElements = new OwnArray();
            for (let i = 0; i < this.elementData.length - 1; i++) {
                newElements.elementData[i] = this.elementData[i];
            }
            this.elementData.length -= 1;
        }
        return resultElement;
    }
}


let x = new OwnArray(1, 2, 3);
//x.forEach((thisArg:any,data:any,index:number,src:any):void => console.log(thisArg), x);
//x.forEach((elem) => console.log(elem));
// console.log(x.push(8,7,7,"geg"));
// console.log(x);
console.log(x.pop());
console.log(x);
