// require('dotenv').config(); ==> auto update on file change


const axios=require('axios');

//'Get' command
axios.get('https://mcdobloisvineuil.fr')
.then(res=>{
    console.log('status: ', res.status);
    console.log('res: ', res);
})
.catch(console.log);

//'Post' request
axios.post('https://mcdobloisvineuil.fr/forum', {
    todo: 'Buy the milk',
})
.then(res=> {
    console.log('res: ', res);
})
.catch(console.log);

//Using the file system
const fs=require('fs');

//Reading and writing files
const fs = require('fs/promises');
async function example() {
    const fileName='./test.txt';
    const content='Hollow World';
    try {
        const data=await fs.readFile(fileName, 'utf8');
        console.log('data: ', data);
        await fs.writeFile(fileName, content);
        const newData=await fs.readFile(fileName, 'utf8');
        console.log('new data: ', newData);
    } catch(e) {
        console.log(e);
    }
}
example();

//Append to already existing file:
fs.writeFile('./test.txt', content, {flag: 'a+'}, err => {});
//Flags:
// r+ => reading & writing
// w+ => read & write at the beginning of the File. Creates it if necessary.
// a => writing, end of file. File is created if inexistant.
// a+ => read & write, end of file. File is created if inexistant.

//Using events
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('start', e=> {
    console.log('started: ', e);
});
eventEmitter.emit('start', {number: 23});

//Create basic server from an html file
const http = require('http');
const url = require('url');
const myfile='./index.html';

http.createServer((req, res)=> {
    fs.readFile(myfile,(e, data) =>{
        res.writeHead(200, {'Content-type':'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(8080);

//Path commands
const path=require('path');

console.log('path: ', path.dirname(__filename));
console.log('path: ', path.basename(__filename));
console.log('path: ', path.extname(__filename));

//Create folder
fs.mkdir(path.join(__dirname, 'test3'), {}, e=> {
    if(e)throw e;
    console.log('Folder created');
});

//Append to file
const mystring='This is a new string\n';
fs.appendFile(path.join(__dirname, 'test', 'add.txt'), mystring, e=> {
    if(e)throw e;
    console.log('File created');
});

//Read file
fs.readFile(path.join(__dirname, 'test', 'add.txt'), 'utf8', (e,data) => {
    console.log('data: ', data);
});

//OS module
const os = require('os');

function humanFileSize(size) {
    var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

console.log('os: ', humanFileSize(os.totalmem()));

