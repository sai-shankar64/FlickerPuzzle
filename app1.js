var http=require('http');
var fs=require('fs');

http.createServer((req,res)=>{
    res.writeHead(200);
    var file=fs.createWriteStream('sample.txt');
    req.pipe(file);
    var fileSize=req.headers['content-length'];
    var uploadedBytes=0;
    req.on('end',()=>{
        res.end('file upload complete.\n');
    })
    req.on('data',(d)=>{
        uploadedBytes+=d.length;
        var per=parseInt(100*(uploadedBytes/fileSize));
        res.write('uploaded'+per+'%\n');
    })
}).listen(8070,()=>{
    console.log('Running on 8070');
});