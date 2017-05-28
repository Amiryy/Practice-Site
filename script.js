function main() {
    $('body').hide();
    $('body').fadeIn(1000);
    $('#projects-list').hide();
    
    $('#projects-button').on('click', function(){
      $('#projects-list').slideToggle();
    });
    
    $('a').mouseenter(function(){
        $(this).fadeTo('fast',0.7); 
    });
    
     $('a').mouseleave(function(){
        $(this).fadeTo('fast',1)
    });
     $('.navbutton').mouseenter(function(){
        $(this).fadeTo('fast',0.7); 
    });
    
     $('.navbutton').mouseleave(function(){
        $(this).fadeTo('fast',1)
    });
    
    $('button').mousedown(function(){
        $(this).fadeTo('fast', 0.7);
    });
    
    $('button').mouseup(function(){
        $(this).fadeTo('fast', 1);
    });
    
    $('button').mouseleave(function(){
        $(this).fadeTo('fast', 1);
    });
    
 
    
};
    
$(document).ready(main);