const path=require('path');
const fs=require('fs');
const http=require('http');
require('dotenv').config()


// const home='./public/index.html';
const server=http.createServer((req, res)=> {
    let filePath = path.join(__dirname, 'public', req.url==='/' ? 'index.html' : req.url);
    if(path.extname(filePath)==='')filePath+='.html';

    let contentType = 'text/html';
    const extname=path.extname(filePath);
    switch (extname) {
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

    fs.readFile(filePath, (e, data) => {
        if(e) {
            if(e.code==='ENOENT') {
                const errorpath=path.join(__dirname,'public','404.html');
                fs.readFile((errorpath), (e, data) => {
                    if(e)console.log('e: ', e);
                    else {
                        res.writeHead(200, {'Content-Type':contentType});
                        res.write(data);
                        return res.end();
                    }
                });
            }
            else {
                console.log('Server Error');
                return res.end();
            }
        } else {
            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(data);
            return res.end();
        }
    });
}); //.listen(8080);

console.log('port: ', process.env.PORT);
const PORT = process.env.PORT || 8080;
server.listen(PORT);

