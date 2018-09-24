var count = (function (){
    let counter = 1;
    let time = counter;
    var timeFormat = "sec";
    function countDown(){
        if(counter>=3600){
            time = counter/3600;
            timeFormat = "hr";
        }
        else
        if(counter>=60){
           time =  counter/60;
           timeFormat = "min";
        }
        postMessage(parseInt(time)+" "+timeFormat);
        //console.log("Counter Keep Going on ",counter);
        counter++;
        time = counter;
        setTimeout(countDown,1000);
}
return countDown;
})();
count();
