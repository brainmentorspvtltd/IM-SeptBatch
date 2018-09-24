function showNotification(message){
    playAudio();
    if(Notification.permission =='granted'){
        var notification = new Notification("CRUD App",{body:message,icon:paths.messageIconPath});
        // Some Browser Not close the Notification Automatically so need this code
        //setTimeout(notification.close.bind(notification), 4000);
    }
    else
    if(Notification.permission!=='denied'){
        Notification.requestPermission(permission=>{
            if(permission=='granted'){
                var notification = new Notification("CRUD App",{body:message,icon:paths.messageIconPath});
            }
        })
    }

}

function bringUpdates(){
var source  = new EventSource('http://localhost:1234/stream');
console.log("Event Source SSE ",source);
source.addEventListener("givemedata",function(event){
    console.log("Data BRING :::: ",event.data);
    showNotification(event.data);
})
}

function gps(){
    if(navigator.geolocation){
        var geo_options = {
            enableHighAccuracy: true, 
            maximumAge        : 30000, 
            timeout           : 27000
          };
          
        const success=(position)=>{
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            var img = document.createElement("img");
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=18&size=300x300&sensor=false";
    document.querySelector("#map").appendChild(img);
        }
        const err= (err)=>{
            console.log('Error During GPS ',err);
        }
        navigator.geolocation.getCurrentPosition(success,err,geo_options);
    
    }

}
function playAudio(){
    var audio = document.querySelector("#audioplayer");
    audio.pause();
    audio.currentTime = 0;
    audio.play();
}