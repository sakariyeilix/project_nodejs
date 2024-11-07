const http = require('http');
const taskRoutes = require('./routes/taskRoutes');

const HOSTNAME = 'localhost'
const PORT = 9000

const server = http.createServer((req, res) =>{
    if (req.url.startsWith('/tasks')) {
        taskRoutes(req, res)
    } else {
        res.writeHead(404, 'not found', {'content-type': 'application/json'})
        res.end(JSON.stringify({
            message: 'sorry, you got lost!' 
        }))
    }
});

server.listen(PORT, HOSTNAME, () => {
    console.log(`server running on port ${PORT}`)
})