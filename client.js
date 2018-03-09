var http=require('http');
var message="Here's looking at you,shankar!";
var options={
    host: 'localhost' , port:8030 , path:'/' , method:'POST'
}
var request=http.request(options,function(response){
    response.on('data',function(data){
        console.log(data.toString());
    });
});
request.write(message);
request.end();


