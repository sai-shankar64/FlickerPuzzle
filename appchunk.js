var http= require ('http');
var fs=require('fs');
var server=http.createServer(function(request,response){
    response.writeHead(200);
    request.on('readable',function(){
        var chunk=null;
        while((chunk=request.read())!==null){
            console.log(chunk.toString());
            response.write(chunk);
        }
    })
  request.on('end',function(){
      response.end();
  })
}).listen(8030,function(){
    console.log("listening on port 8030");
});
process.on('uncaughtException',function(err){
    server.close();
  
})
