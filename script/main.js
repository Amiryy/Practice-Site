function main() {
    $('#cover').fadeOut(650);
    $('#projects-list').hide();
    $('#projects-button').on('click', function(){
        let projectsTemplate =  `
                            <div class="projects-button"><a href="Timeline-project.html">Timeline</a></div>
                            <div class="projects-button"><a href="Library-project.html">Library</a></div>
                            `
        document.getElementById('projects-list').innerHTML = projectsTemplate;
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