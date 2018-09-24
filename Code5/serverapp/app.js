const express = require("express");
const app =express();
app.use(express.static("public"));
app.get('/stream',(request,response)=>{
   
    // response.writeHead(200, {
    //     'content-type' : 'text/event-stream',
    //     'connection' : 'keep-alive',
    //     'Access-Control-Allow-Origin' : '*'
    // });
    response.writeHead(200,{
    'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type':'text/event-stream',
        'Cache-Control':'no-cache',
        'Connection':'keep-alive'
    });
    
   
    const fs = require("fs");
    fs.watchFile("news.txt",()=>{
    
    
        var content = fs.readFileSync("news.txt");
       
        console.log("Watch Call...");
        response.write('event: givemedata\n');
        response.write('data: ' + content + '\n\n');

    })
   
    
})
app.listen(process.env.PORT|| 1234,()=>{
    console.log("Server Start...");
})