var http=require('http');
http.createServer(function(request,response){
    response.writeHead(200);
    request.pipe(response);
 
}).listen(8030,function(){
    console.log('listening on port 8030');
}); 