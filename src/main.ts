class OwnArray {
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
forEach(callback: Function, thisArg?: any) {  //что делать с thisArg, если он не задан. Нужен ли он вообще?Какой тип?
        for (let i = 0; i < this.length; i++) {
            callback(thisArg, this.elementData[i], i, this);
        }

    }
}




let x = new OwnArray(1, 2, 3);
//x.forEach((thisArg:any,data:any,index:number,src:any):void => console.log(thisArg), x);
x.forEach((thisArg: any, data: any, index: number, src: any): void => console.log(data));