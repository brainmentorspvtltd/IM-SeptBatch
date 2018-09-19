window.addEventListener("load",init);
function init(){
    loadCounts();
    bindEvents();
    seq = getSequence();
    showSequence();
    //console.log("Seq is "+,seq);
   
}
var seq ;
const getSequence=()=>seq = sequenceGen();

const showSequence=()=> document.querySelector("#id").innerText = seq.next().value;

function loadCounts(){
    document.querySelector("#total").innerText = itemOperations.getTotalRecords();
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addItem);
}

function addItem(){
    var id = document.querySelector("#id").innerText;
    var name = document.querySelector("#name").value;
    var desc = document.querySelector("#desc").value;
    var color = document.querySelector("#color").value;
    var date = document.querySelector("#date").value;
    var price = document.querySelector("#price").value;
    var url = document.querySelector("#url").value;
    var itemObject = itemOperations.add(id,name,desc,color,date,price,url);
    showSequence();
    loadCounts();
    printRecord(itemObject);
}

function createIcon(path,fn, id){
    var img = document.createElement("img");
    img.src = path;
    img.className = "size";
    img.setAttribute("data-id",id);
    img.addEventListener("click",fn);
    return img;
}

function toggleMark(){
    var tr = this.parentNode.parentNode;
    var id = this.getAttribute("data-id");
    console.log("Tr is ",tr," Id is ",id);
    tr.classList.toggle("red");
}

function printRecord(itemObject){
    var tbody = document.querySelector("#items");
    var tr = tbody.insertRow();
    var index = 0;
    for(let key in itemObject){
        if(key=='isMarked'){
            continue;
        }
        tr.insertCell(index).innerText = itemObject[key];
        index++;
    }
    var td = tr.insertCell(index);
    td.appendChild(createIcon(PATHS.DELETE_ICON,toggleMark,itemObject.id));
    td.appendChild(createIcon(PATHS.EDIT_ICON));
    //var td = tr.insertCell(0);
    //td.innerText = itemObject.id;
}