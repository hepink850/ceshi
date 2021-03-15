const http = require('http');
const path = require('path');
const template = require('art-template');
const serveStatic = require('serve-static');
const router = require('router');
const getRouter = router();
const app = http.createServer();
const mime = require('mime');
const url = require('url');


template.defaults.root = path.join(__dirname, 'views');
template.defaults.extname = '.html';

const serve = serveStatic(path.join(__dirname, 'public'));

getRouter.get('/', (req, res) => {
    let a = template('front/register', {});
    res.end(a);
});

app.on('request', (req, res) => {
    let pathname = url.parse(req.url, true).pathname;
    let actual_path = path.join(__dirname, 'public' + pathname);
    res.writeHead(200, {
        'Content-type': `${mime.getType(actual_path)};charset=utf-8`,
    });

    getRouter(req, res, () => {});
    serve(req, res, () => {});
    res.end();
});
app.listen(3000);