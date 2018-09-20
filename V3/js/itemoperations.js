const itemOperations = {
    items:[],
    add(id , name, desc, color, date,price,url){
        var item = new Item(id, name,desc, color,date,price,url);
        this.items.push(item);
        return item;
    },
    getItems(){
        return this.items;
    },
    getTotalRecords(){
        return this.items.length;
    },
    toggleMark(id){
        var itemObject = this.searchById(id);
        if(itemObject){
            itemObject.toggle();
        }
    },
    deleteMarked(){
        this.items = this.items.filter(itemObject=>itemObject.isMarked==false);
        return this.items;
    },
    searchById(id){
        return this.items.find(itemObject=>itemObject.id==id);
    },
    countMarked(){
        return this.items.filter(itemObject=>itemObject.isMarked).length;
    }

}