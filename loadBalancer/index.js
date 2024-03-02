const express = require('express');
const cluster = require('cluster');
const http = require('http');

// Check the number of available CPU.
const numCPUs = 2;  // For demonstration, normally you would use require('os').cpus().length;
var hash = {};
const app = express();
const PORT = process.env.PORT || 3000;

// For Master process
if (cluster.isMaster) {
    console.log('Master ${process.pid} is running');

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        const worker = cluster.fork();

        // Assign URL based on worker id
        // Assuming you want to alternate between two URLs
        if (i % 2 === 0) {
            worker.send({ url: 'https://final-project-sigma-ochre.vercel.app/' });
        } else {
            worker.send({ url: 'https://final-project-1mis.vercel.app/' });
        }
    }

    // This event fires when a worker dies
    cluster.on('exit', (worker, code, signal) => {
        console.log('worker ${worker.process.pid} died');
    });
}
// For Worker
else {
    process.on('message', (msg) => {
        hash[process.pid] = msg.url;
    });

    app.listen(PORT, () => {
        console.log('Worker ${process.pid} started');
    });

    // API endpoint to send public key
    

    app.get('/', (req, res) => {
        res.writeHead(302, { Location: hash[process.pid] });
        res.end();
    });
}
