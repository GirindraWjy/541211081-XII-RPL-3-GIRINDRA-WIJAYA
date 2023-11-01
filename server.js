const http = require("http");

const todos = [
    { id: 1, text: 'Todo One'},
    { id: 2, text: 'Todo Two'},
    { id: 3, text: 'Todo Three'},
];

const server = http.createServer((req, res) => {
    // res.statusCode = 404;
    // res.setHeader('Content-Type', 'application/json');
    // res.setHeader('X-Powered-By', 'Node.js');

    // res.writeHead(404, {
    //     'Content-Type': 'application/json',
    //     'X-Powered-By': 'Node.js'
    // });

    const {method, url} = req;
    let body = [];

    req.on('data', chunk => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let status = 404;
        const response = {
            success: false,
            results: [],
            error: ''
        };

        if (method === 'GET' && url === '/todos') {

            status = 200;
            response.success = true;
            response.results = todos;

        } else if (method === 'POST' && url === '/todos') {

            const { id, text } =JSON.parse(body);

            if (!id || !text) {
                status = 400;
                response.error = 'Please add id and text';
            } else {
                todos.push({id, text});
                status = 201;
                response.success = true;
                response.results = todos;
            }
        }

        res.writeHead(status, {
                'Content-Type': 'application/json',
                'X-Powered-By': 'Node.js'
        });

        res.end(JSON.stringify(response));
    });

});

port = 8888;

server.listen(8888, () => {
    console.log(`server sudah hidup... ${port}`);
});