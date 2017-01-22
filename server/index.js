// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Base Libs
// --- ------------------------------------------------------------------------------------------------------------- ---
var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Extra Libs
// --- ------------------------------------------------------------------------------------------------------------- ---
var rn = require('random-number').generator({min:10000, max:99999, integer: true});
var moment = require('moment');
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Global Variables
// --- ------------------------------------------------------------------------------------------------------------- ---
var data = {date: getDate(), followers: rn()};
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Express Settings
// --- ------------------------------------------------------------------------------------------------------------- ---
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname + '/../app/assets')));
app.set('views', path.join(__dirname + '/../app/views'));
http.listen(process.env.PORT || 3000, process.env.IP || "localhost", function () {
    var addr = http.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port + ' - ' +  getDate());
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Express Endpoints
// --- ------------------------------------------------------------------------------------------------------------- ---
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Socket IO Settings
// --- ------------------------------------------------------------------------------------------------------------- ---
io.on('connection', function (socket) {
    console.log('a user connected - ' +  getDate());
    updateTime();
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('update-page', function () {
        data = {date: getDate(), followers: rn()};
        updateTime();
    });
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Global Functions
// --- ------------------------------------------------------------------------------------------------------------- ---
function updateTime() {
    io.emit('onUpdateData', data);
}
function getDate() {
    return moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
}