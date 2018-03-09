var express=require('express');
var app=express();
app.get('/',function(request,response){
    response.send('Hello World');
});
app.get('/hello',function(request,response){
    response.send('Hello hai ');
});
app.listen(3000);
