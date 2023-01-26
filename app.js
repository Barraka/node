const http = require('http');
const fs = require('fs');
const events =require('events');
const path=require('path');
const os = require('os');
const url = require('url');

const PORT = process.env.PORT || 5000;
const server = http.createServer((req,res) => {
    // if(req.url==='/') {
    //     fs.readFile(path.join(__dirname, 'index.html'), (e, data) => {
    //         if(e)throw e;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(data);
    //     });
    // }

    // if(req.url==='/about') {
    //     fs.readFile(path.join(__dirname, 'about.html'), (e, data) => {
    //         if(e)throw e;
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(data);
    //     });
    // }

    // if(req.url==='/users') {
    //     const users= [
    //         {name: 'bob', age:32},
    //         {name: 'John', age:23},
    //     ];
    //     res.writeHead(200, {'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    let filePath = path.join(__dirname, req.url==='/' ? 'index.html' : req.url);

    let extname = path.extname(filePath);
    let contentType = 'text/html';
    if(req.url==='/about')extname='.html';
    if(req.url==='/users')extname='.json';
    console.log('extname: ', extname);
    console.log('req: ', req.url);
    switch(extname) {
        
        case '.js':
            contentType='text/javascript';
            break;
        case '.css':
            contentType='text/css';
        break;
        case '.json':
            contentType='application/json';
            break;
            case '.png':
        contentType='image/png';
        break;
        case '.jpg':
        contentType='image/jpg';
        break;
    }

    fs.readFile(filePath, (e, content) => {
        if(e)console.log('e: ', e);
        else {
            res.writeHead(200, {'Content-Type':contentType});
            res.end(content, 'utf8');
        }
    });
});

server.listen(PORT, ()=> console.log('Server runnig'));