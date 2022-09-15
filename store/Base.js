export class Base{
    constructor(initialState){
        for(const key in initialState){
            if(initialState.hasOwnProperty(key)){
                this[key] = initialState[key];
            }
        }
    }
}