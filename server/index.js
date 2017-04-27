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
var data = {date: getDate(), pets: rn()};
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Express Settings
// --- ------------------------------------------------------------------------------------------------------------- ---
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname + '/../app/assets')));
app.set('views', path.join(__dirname + '/../app/views'));
http.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = http.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port + ' - ' +  getDate());
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Express Endpoints
// --- ------------------------------------------------------------------------------------------------------------- ---
app.get('/', function (req, res) {
    res.render('index', { })
})
app.get('/search', function (req, res) {
    res.render('search', { })
})
app.get('/registration', function (req, res) {
    res.render('registration/index', { })
})
app.get('/todo', function (req, res) {
    res.render('todo/index', { })
})
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- catch 404 and forward to error handler
// --- ------------------------------------------------------------------------------------------------------------- ---
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Socket IO Settings
// --- ------------------------------------------------------------------------------------------------------------- ---
io.on('connection', function (socket) {
    console.log('a user connected - ' +  getDate());
    updatePetsWithHome();
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('update-page', function () {
        data.date = getDate();
        data.pets = data.pets*1 + 1;
        updatePetsWithHome();
    });
});
// --- ------------------------------------------------------------------------------------------------------------- ---
// --- Global Functions
// --- ------------------------------------------------------------------------------------------------------------- ---
function updatePetsWithHome() {
    io.emit('onUpdateData', data);
}
function getDate() {
    return moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
}