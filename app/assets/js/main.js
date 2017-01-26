/**
 * Created by asus on 22/01/17.
 */

$(function(){
    setTimeout(function () {
        $('body').addClass('loaded');
    },400);
    callUpdate();
});

var socket = io();
socket.on('onUpdateData', function (data) {
    $('#pets-home-number').html(data.pets);
});

function callUpdate(){
    socket.emit('update-page');
    setTimeout(callUpdate,Math.floor(Math.random()*15000));
}