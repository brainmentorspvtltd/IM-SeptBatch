class Item{
    
    constructor(id, name, desc, price, color, date,url){
        this.id = id; // Member Var = Local Var
        this.name =name;
        this.desc = desc;
        this.price= price;
        this.color = color;
        this.date = date;
        this.url = url;
        this.markForDelete = false;
       
    }
    toggle(){
        this.markForDelete= !this.markForDelete;
    }
}