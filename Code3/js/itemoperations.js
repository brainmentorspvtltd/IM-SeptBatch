const itemOperations = {
    items:[],
    add(id , name, desc, color, date,price,url){
        var item = new Item(id, name,desc, color,date,price,url);
        this.items.push(item);
        return item;
    },
    getTotalRecords(){
        return this.items.length;
    }

}