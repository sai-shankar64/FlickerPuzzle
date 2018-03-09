var express=require('express');
var app=express();
app.get('/blocks',function(request,response){
    response.redirect('/parts');
});

app.listen(3000);
