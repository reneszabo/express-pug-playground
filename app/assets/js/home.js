/**
 * Created by asus on 22/01/17.
 */

$(function(){
    console.log('home');
    if($(window).scrollTop() <= 300) {
        $('#main-nav').addClass('fondle-top-hide');
    }

    var waypointNavBar = new Waypoint({
        element: document.getElementById('how'),
        offset: 400,
        handler: function(direction){
            console.log('scrolling direction ', direction);
            if ( direction === 'down') {
                $('#main-nav').removeClass('fondle-top-hide');
            } else {
                $('#main-nav').addClass('fondle-top-hide');
            }
        }
    });
});
