function* sequenceGen(){
    var counter = 1;
    while(true){
    yield counter;
    counter++;
    }
    }

 function doAjax() {
           
            
 
            var pr = fetch(PATHS.URL);
            return pr;
            
 }

 function showNotification(message){
    //playAudio();
    if(Notification.permission =='granted'){
        var notification = new Notification("CRUD App",{body:message,icon:PATHS.EDIT_ICON});
        // Some Browser Not close the Notification Automatically so need this code
        //setTimeout(notification.close.bind(notification), 4000);
    }
    else
    if(Notification.permission!=='denied'){
        Notification.requestPermission(permission=>{
            if(permission=='granted'){
                var notification = new Notification("CRUD App",{body:message,icon:PATHS.EDIT_ICON});
            }
        })
    }
}