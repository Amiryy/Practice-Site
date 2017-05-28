function loadBooks() {
    $('#post-form').hide();
    

    //Creating getData function - With Promise
    
    function getData(method, url) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.onload = function(){
             if(this.status >= 200 && this.status < 300){
                  resolve(xhr.response);
             }else{
                  reject({
                     status : this.status,
                     statusText : xhr.statusText
                      });
                  }
              };
              xhr.onerror = function(){
               reject({
                    status : this.status,
                    statusText : xhr.statusText   
              });
            };
            xhr.send();
          });  
        };
    
    //Search for Books
    
    $('#search-books').on('click', function () {
    

        getData('GET', 'http://localhost:8000/api/Books/').then(function(data){
            let Books = JSON.parse(data);
            let output = '';
            for (let book of Books){
                output += `
                  <li data-id=${book._id}>
                    <p><span class="noedit title">${book.title}</span>
                    <input type="text" class="edit title"/>
                    </p>
                    <p>Author: <span class="noedit author">${book.author}</span>
                    <input type="text" class="edit author"/>
                    </p>
                    <p>Genre: <span class="noedit genre">${book.genre}</span>
                    <input type="text" class="edit genre"/></p>
                    <p>Read: <span class="noedit read">${book.read?"Yes":"No"}</span>
                    <input type="checkbox" class="edit read" value="${book.read?"true":"false"}">
                    </p>
                    <button data-id='${book._id}' class='remove'>Delete</button>
                    <button class = "editBook noedit">Edit</button>
                    <button class = "saveEdit edit">Save</button>
                    <button class = "cancelEdit edit">Cancel</button> 
                  </li>
                `; 
              }
              
              document.getElementById('database').innerHTML = output;
              console.log('Library loaded.')
                  
            
        }).catch(function(err){
                console.log(err);
            });
        
        });
    
    //Post a Book
    
    $('#post-books').on('click', function(){   
        let formTemplate = `<div id="book-form">
                            <p>Title: <input type="text" id="title" autocomplete="off"/>
                            </p>
                            <p>Author: <input type="text" id="author" autocomplete="off"/>
                            </p>
                            <p>Genre: <input type="text" id="genre" autocomplete="off"/>
                            </p>
                            <p>Read? <input type="checkbox" id="read" value="false"/>
                            </p>
                            </div>
                        <button id="book-send">Send</button>
                        <div id="post-message"></div>`
        document.getElementById('post-form').innerHTML = formTemplate;
        //Book form's settings:
        $('#post-form').slideToggle();
        $('#book-send').mousedown(function(){
            $(this).fadeTo('fast', 0.7);
        });
        $('#book-send').mouseup(function(){
            $(this).fadeTo('fast', 1);
        });
        $('#book-send').mouseleave(function(){
            $(this).fadeTo('fast', 1);
        });
        //Checkbox's value should return true/false
        $("#read").on('change', function() { 
          if ($(this).is(':checked')) {
            $(this).attr('value', 'true');
          } else {
            $(this).attr('value', 'false');
          }
        });
        
        $('#post-form').delegate('#book-send', 'click', function(){
            let newBook = {
             title: $("#title").val(),
             author: $("#author").val(),
             genre: $("#genre").val(),
             read: $('#read').val(),
            };
           $.ajax({
           type: 'POST',
            url: 'http://localhost:8000/api/Books/',
            data: newBook,
            success: function(){
                let successMessage = `<p>${newBook.title} has been added.</p>`
                document.getElementById('post-message').innerHTML = successMessage;
                //clear post form:
                $('#title').val('');
                $('#author').val('');
                $('#genre').val('');
                if ($('#read').is(':checked')) { //clear checkbox
                    $('#read').click();
                }
                console.log('a new Book: "'+newBook.title+'" successfuly saved.');
            },
            error: function(){
                console.log('error saving book')
            }
        });
       return false;
        });
        
    });
    
    
    //DELETE a Book
    
    $('#database').delegate('.remove', 'click', function(){
                
        let $li= $(this).closest('li');
        
       $.ajax({
          type: 'DELETE',
           url: 'http://localhost:8000/api/Books/' + $(this).attr('data-id'),
           success: function(){
             $li.fadeOut(300, function(){
                $(this).remove();
                console.log('a Book has been removed.')
             })  
           },
           error: function(){
               console.log('error removing book')
           }
       });
        
    });
    
    // Edit (PATCH) a book.
    
    //'Edit' button's function
    $('#database').delegate('.editBook', 'click', function(){ 
        let $li= $(this).closest('li')
        
        $li.find('input.title').val($li.find('span.title').html());
        $li.find('input.author').val($li.find('span.author').html());
        $li.find('input.genre').val($li.find('span.genre').html());
        
        //!should make sure that read: Yes shows a checked box.
        if($li.find('input.read').attr('value')=="true"){
            $li.find('input.read').prop('checked','true');
          };
     
        $li.addClass('edit');
        
        //Checkbox's value should return true/false
        $li.find('input.read').on('change', function() { 
          if ($(this).is(':checked')) {
            $(this).attr('value', 'true');
          } else {
            $(this).attr('value', 'false');
          }
        });
        
    });
    
    //'Cancel' button's function
    $('#database').delegate('.cancelEdit', 'click', function(){ 
        
        let $li= $(this).closest('li');
        $li.removeClass('edit');
    });
    
    //'Save' button's function
    $('#database').delegate('.saveEdit', 'click', function(){ 
        let $li= $(this).closest('li');
        let bookUpdate = {
            title: $li.find('input.title').val(),
            author: $li.find('input.author').val(),
            genre: $li.find('input.genre').val(),
            read: $li.find('input.read').attr('value')
        };
        
        $.ajax({
           type: 'PATCH',
            url: 'http://localhost:8000/api/Books/' + $li.attr('data-id'),
            data: bookUpdate,
            success: function(newBook){
             $li.find('span.title').html(bookUpdate.title);
             $li.find('span.author').html(bookUpdate.author);
             $li.find('span.genre').html(bookUpdate.genre);
             $li.find('span.read').html(bookUpdate.read?"Yes":"No");
             $li.removeClass('edit');
             console.log('a Book has been updated.')
            },
            error: function(){
                console.log('error updating book')
            }
        });

    });
    
};
    
$(document).ready(loadBooks);