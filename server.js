const http = require('http');
const fs = require('fs');
const _ = require('lodash');
const server = http.createServer((req, res) => {
    //lodash
    const num = _.random(0,100);
    console.log(num);

    let path = "./pages/";
    if(req.url == "/home" || req.url == "/"){
        path += "index.html";
        console.log("request made to home page");
    }else if(req.url == "/about-us"){
        path += "aboutUs.html";
        console.log("request made to about us page");
    }else if(req.url == "/menu"){
        path += "menu.html";
        console.log("request made to menu page");
    }else{
        path += "404.html";
    }
    fs.readFile(path, (err, data)=>{
        if(err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        }
    });
});
server.listen(3000, 'localhost',()=>{
    console.log("server is running on port 3000");
});