class Item{
    constructor(id , name, desc, color, date,price,url="https://n4.sdlcdn.com/imgs/f/n/r/Gionee-A1-64GB-Black-SDL352791824-1-ff379.jpeg"){
          this.id = id;
          this.name = name;
          this.desc = desc;
          this.color = color;
          this.date = date;
          this.price = price | 10000;
          this.url= url;  
          this.isMarked = false;
    }
    toggle(){
        this.isMarked = !this.isMarked;
    }
}