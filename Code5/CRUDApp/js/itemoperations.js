const itemOperations = {
    itemArray:[],
    add(id, name, desc, price, color, date,url){
        var itemObject = new Item(id, name, desc, price, color, date,url);
        this.itemArray.push(itemObject);
    },
    removeMark(){
        this.itemArray = this.itemArray.filter(currentObject=>currentObject.markForDelete==false);
        return this.itemArray;
    },
    sortByPrice(){
        return this.itemArray.sort((first,second)=>first.price-second.price);
    },
    deleteById(id){
        return this.itemArray = this.itemArray.filter(itemObject=>itemObject.id!==id);
    },
    searchById(id){
        return this.itemArray.find(itemObject=>itemObject.id ==id);
    },
    mark(id){
        var currentObject = this.searchById(id);
        currentObject.toggle();
    },
    markCount(){
        return this.itemArray.filter(currentObject=>currentObject.markForDelete).length;
    },
    getLast(){
        if(this.itemArray.length>0){
           return  this.itemArray[this.itemArray.length-1];
        }
        return null;
    }
}