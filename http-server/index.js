const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Get command line arguments for the port number
const args = minimist(process.argv.slice(2));
const port = args.port || 3000; // Default port is 3000 if not provided

// Helper function to serve HTML files
const serveFile = (filePath, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Page not found');
            res.end();
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
};

// Create the server
const server = http.createServer((req, res) => {
    if (req.url === '/home' || req.url === '/') {
        serveFile(path.join(__dirname, 'home.html'), res);
    } else if (req.url === '/project') {
        serveFile(path.join(__dirname, 'project.html'), res);
    } else if (req.url === '/registration') {
        serveFile(path.join(__dirname, 'registration.html'), res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write('404 Not Found');
        res.end();
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

