window.addEventListener("load",init);

var counter ;

function onlineOfflineStatus(){
    
    console.log("Online , Offline Event Fire ",navigator.onLine);
document.querySelector("#status").innerText=navigator.onLine ? "You are Online" : "You are Offline";

}

// this is change
function init(){
    bringUpdates();
    checkCacheStatus();
    counter = autoGen();
    updateCount();
    bindEvents();
   
    doMultiThreaded();
    document.querySelector("#output").innerText=document.querySelector("#price").value;
    document.querySelector("#itemid").innerText = counter.next().value;
}
function doMultiThreaded(){
    if(window.Worker){
       // let worker2 = new Worker("js/timeworker2.js");
        // worker2.onmessage = (event)=>{

        // }
       let worker = new Worker("js/timeworker.js");
       worker.onmessage=(event)=>{
            document.querySelector("#timespend").innerText = event.data;
       } 
    }
    else{
        showNotification("Ur Browser Not Support Workers");
    }
}
function loadItems(){
    if(localStorage){
        if(localStorage.items){
            var object = JSON.parse(localStorage.items);
            itemOperations.itemArray = object;
            printTable(itemOperations.itemArray);
        }
        else{
            showNotification("No Data in Storage...");
        }

    }
    else{
        showNotification("Not Supported ...");
    }
}
function loadFromServer(){
   // fetch(paths.url,{method:'post',body:JSON.stringify())
  fetch(paths.url).then(response=>{
      response.json().then(object=>{
          itemOperations.itemArray = object.items;
         console.log(itemOperations.itemArray instanceof Array);
          console.log("Item Array is ",itemOperations.itemArray);
          printTable(itemOperations.itemArray);
      }).catch(err=>{
          console.log("Invalid JSON ",err);
      }).catch(err=>{
          showNotification("Some Problem in Server Side");
      })
  })    
}
function saveItems(){
    if(localStorage){
        let json = JSON.stringify(itemOperations.itemArray);
        console.log("JSON is ",json, " And Array is ",itemOperations.itemArray);
        localStorage.items = json;
        showNotification("Data Saved...");
    }
    else{
        showNotification("Outdated Browser...");
    }
}

// Code Added

function checkCacheStatus(){

    // Chrome CacheLocation is chrome://appcache-internals/#
    if(window.applicationCache){
        window.applicationCache.addEventListener("updateready", function(){
            if(applicationCache.status === applicationCache.UPDATEREADY) {
                
                location.reload();
                showNotification("Updated Copy Loaded...");
            }
                /*document.getElementById("divCacheUpdate").style.display = "block";*/
            });
        }
        else{
            showNotification("Ur Browser Doesn't Support App Caching...");
        }
}

function bindEvents(){
    onlineOfflineStatus();
    window.addEventListener("online",onlineOfflineStatus);
    window.addEventListener("offline",onlineOfflineStatus);
    

    document.querySelector("#add").addEventListener("click",addItem);
    document.querySelector("#delete").addEventListener("click",deleteMarkRecords);
    document.querySelector("#save").addEventListener("click",saveItems);
    document.querySelector("#load").addEventListener("click",loadItems);
    document.querySelector("#loadfromserver").addEventListener("click",loadFromServer);
    document.querySelector("#price").addEventListener("input",updatePrice);
    document.querySelector("#trash").addEventListener("drop",dropIt);
    document.querySelector("#trash").addEventListener("dragover",(event)=>event.preventDefault());
    document.querySelector("#gps").addEventListener("click",gps);
}

const updatePrice = ()=>document.querySelector("#output").innerText = document.querySelector("#price").value;


function printTable(itemArray){
    document.querySelector("#itemlist").innerHTML = "";
    if(itemArray instanceof Array){
    itemArray.forEach(printRecord);
    }
    else{
        Array.prototype.forEach.call(itemArray,function(currentObject){
            printRecord(currentObject);
        })
    }
    updateCount();
}
function deleteMarkRecords(){
    printTable(itemOperations.removeMark());
}
function createIcon(path,fn, id){
    //var img = "<img src="
    var img = document.createElement("img");
    img.src = path;
    img.addEventListener("click",fn);
    img.className = "size";
    img.setAttribute("data-itemid", id);
    return img;  
}
function markRecord(){
    var id = this.getAttribute("data-itemid");
    console.log("Mark Record ",id);
    var tr = this.parentNode.parentNode;
    console.log("TR is ",tr);
    tr.classList.toggle("red");
    itemOperations.mark(id);
    updateCount();
}
function editRecord(){
    console.log("Edit Record")
}
function* autoGen(){
    var counter = 1;
    while(true){
    yield counter;
    counter++;
    }
    }

function rowDragStart(event){
    event.dataTransfer.setData("currentrow", event.target.getAttribute('data-rowid'));
    console.log("Row Drag Start ",event.target.getAttribute('data-rowid'));
}    

function dropIt(event){
    event.preventDefault();
    var id = event.dataTransfer.getData("currentrow");
    console.log("Drop Happens ",id);
    let itemList = itemOperations.deleteById(id);
    console.log("Now List is ",itemList);
    printTable(itemList);
    showNotification("Record Deleted "+id);
    

}

function drawCircle(color){
    var div = document.createElement("div");
    div.className ='circle';
    div.style.backgroundColor=color;
    return div;

}
function drawImage(url){
    var img = document.createElement("img");
    img.src = url;
    img.className = 'img';
    return img;
}

function printRecord(currentObject){
    if(currentObject){
        var tbody = document.querySelector("#itemlist");
        var tr = tbody.insertRow();
        tr.setAttribute("draggable",true);
        tr.setAttribute('data-rowid',currentObject.id);
        tr.addEventListener("dragstart",rowDragStart);
        let index = 0;
        for(let key in currentObject){
            if(key==='markForDelete'){
                continue;
            }
            if(key==='color'){
               tr.insertCell(index).appendChild(drawCircle(currentObject[key]));
               index++;
               continue;     
            }
            if(key==='url'){
                tr.insertCell(index).appendChild(drawImage(currentObject[key]));
               index++;
               continue;
            }
            tr.insertCell(index).innerText = currentObject[key];
            index++;
        }
        var td = tr.insertCell(index); //<td><img></td>
        td.appendChild(createIcon(paths.deleteIconPath,markRecord, currentObject.id));
        td.appendChild(createIcon(paths.editIconPath,editRecord, currentObject.id ));
       // tr.insertCell(0).innerText = currentObject.id;
    }
}
function updateCount(){
    document.querySelector("#total").innerText = itemOperations.itemArray.length;
    document.querySelector("#mark").innerText=itemOperations.markCount();
    document.querySelector("#unmark").innerText=itemOperations.itemArray.length-itemOperations.markCount();
}
function addItem(){
    var id = document.querySelector("#itemid").innerText;
    var name = document.querySelector("#name").value;
    var desc = document.querySelector("#desc").value;
    var price = document.querySelector("#price").value;
    var color = document.querySelector("#color").value;
    var date = document.querySelector("#date").value;
    var url = document.querySelector("#url").value;
    itemOperations.add(id, name, desc, price, color, date,url);
    document.querySelector("#itemid").innerText = counter.next().value;
    showNotification("Record Added SuccessFully !");
    updateCount();
    printRecord(itemOperations.getLast());
}