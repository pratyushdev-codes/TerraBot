const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Replace with your actual serial port path
const serialPortPath = '/dev/cu.HC-05'; 

// Initialize the SerialPort with error handling
const serialPort = new SerialPort({
  path: serialPortPath,
  baudRate: 9600,
}, (err) => {
  if (err) {
    return console.error(`Error opening serial port ${serialPortPath}:`, err.message);
  }
});

// Use a parser to read newline-delimited data
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// When data is available on the serial port, emit it to all connected clients
parser.on('data', (data) => {
  console.log('Data from sensor:', data);
  io.emit('sensor-data', data); // "sensor-data" event is sent to clients
});

// Additional error handling for the serial port during runtime
serialPort.on('error', (err) => {
  console.error('Serial Port Error:', err.message);
});

// Serve static files (make sure you have a "public" folder)
app.use(express.static('public'));

// Start the server on port 3000 (or your chosen port)
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
