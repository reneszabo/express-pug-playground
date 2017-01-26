$(document).on('focus','.input-group > *', function() {
    $(this).closest('.input-group').addClass('focused');
});
$(document).on('blur','.input-group > *', function() {
    $(this).closest('.input-group').removeClass('focused');
});