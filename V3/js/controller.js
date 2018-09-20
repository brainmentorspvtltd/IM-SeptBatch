window.addEventListener("load",init);
function init(){
    loadCounts();
    bindEvents();
    seq = getSequence();
    showSequence();
    //console.log("Seq is "+,seq);
   
}

function callAjax(){
    var pr = doAjax();
     pr.then(response => {
                response.json().then(result => {
                    itemOperations.items = result.items;
                    printTable(result.items);
                    console.log("JSON is ", result);
                }).catch(err => {
                    console.log("Invalid JSON ", err);
                })
            }).catch(err => {
                console.log("Invalid Server Call ", err);
            });  
}

var seq ;
const getSequence=()=>seq = sequenceGen();

const showSequence=()=> document.querySelector("#id").innerHTML = "<b>"+seq.next().value+"</b>";

function loadCounts(){
    document.querySelector("#total").innerText = itemOperations.getTotalRecords();
    document.querySelector("#mark").innerText  = itemOperations.countMarked();
    document.querySelector("#unmark").innerText = itemOperations.getTotalRecords() - itemOperations.countMarked();
}
function bindEvents(){
    document.querySelector("#add").addEventListener("click",addItem);
    document.querySelector("#delete").addEventListener("click",deleteItems);
    document.querySelector("#save").addEventListener("click",saveItem);
    document.querySelector("#load").addEventListener("click",loadItem);
     document.querySelector("#loadfromserver").addEventListener("click",callAjax);
    
}

function loadItem(){
    if(localStorage){
        if(localStorage.items){
            showNotification("Data Loaded");
            var items = JSON.parse(localStorage.items);
            itemOperations.items = items;
            printTable(itemOperations.items);
        }
        else{
            alert("No Data to Load...");
        }
    }
    else{
        alert("Old Browser Not Having Support of LocalStorage");
    }
}

function saveItem(){
    if(localStorage){
            var items = itemOperations.getItems();
            var json = JSON.stringify(items);
            localStorage.items = json;
            showNotification("Data Saved");
            //alert("Data Saved....");
    }
    else{
        alert("Old Browser Not Having Support of LocalStorage");
    }
}
function deleteItems(){
    var items = itemOperations.deleteMarked();
    printTable(items);
}
function printTable(items){
    document.querySelector("#items").innerHTML = "";
    items.forEach(printRecord);
    loadCounts();
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
    itemOperations.toggleMark(id);
    console.log("Tr is ",tr," Id is ",id);
    tr.classList.toggle("red");
    loadCounts();
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