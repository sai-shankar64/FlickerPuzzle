// this is our game object containing attributes and methods
// important: all properties or methods of this should be called as
// game.property or game.method()
var game = {
    gridSize: 3, // minimum size
    default_img: 'picture.svg',
    image_src: 'picture.svg',
    image_aspect: 1, // a square image

    reset: function () {
        // use jquery to do the following
        // 1. hide the element with id 'win'. Inititally that is hidden, but later you will see that
        // we show it when user completes a game. So resetting requires that.
        $('#win').hide();
        // 2. clear all children of element with id 'grid' using jquery's empty method
        $('#grid').empty();
        // 3. show the element with id 'gamebg'
        $('#gamebg').show();
        // 4. enable all children of div with class 'menu'. use jquery prop method. You can select all elements using '.menu *'
        $('.menu *').attr('disabled',false);
        // 5. set text of element with id 'timer' to '00:00:00'
        $('#timer').text('00:00:00');
    },
    // handler to update image based upon theme. See main.js
    setTheme: function () {
        // 1. show the element with id 'modal'. This is to show a spinner while we wait for flicker service to return an image list
       $('#modal').show();
        
        // 2. find the keyword selected from the dropdown. Use jquery $(this) object to access the dropdown
        var keyword=$(this).find(':selected').text();

        // you can use find method on it. ':selected' is the selector for accessing the selected option
        // use text() method to find the selected text.
        


        // understand the below remaining code
        if (keyword === "pick a theme") {
            game.changeImage(default_img, 1);
        } else {
            flickr.getThemeImage(keyword, game.changeImage);
        }
    },

    // I am giving this to you.
    changeImage: function (imageUrl, aspect, title) {
        game.image_src = imageUrl;
        game.image_aspect = aspect;
        // see how we can do chaining of methods
        // see how on image load we hide our spinner
        $('#picture')
          .attr('src', imageUrl)
          .attr('title', title)
          .load(function() {
              $('#modal').hide();
          });
    },

    // function to set the game to start
    begin: function () {
        // below we are making our timer to start
        timetracker.start();
    
        // now that we need to load the game board we no longer need the
        // background image. So
        // 1. hide the element with id 'gamebg'
          $('#gamebg').hide();
        // 2. Now that game has begon, let us not allow to change the options.
        // so disable all elements under div with class 'menu'. You did similar thing before, isn't it!
        $('.menu *').prop('disabled',true);
        
        // below we call createGrid method to create our puzzle board
        gameBoard.createGrid(game.image_aspect, game.image_src);
    },

    end: function (message) {
        
        //1. set the html content of element with id 'verdict' to the message
        $('#verdict').html(message);
        //2. show the winning message by displaying the div with id 'win'
        $('#win').show();
        
    },

    // event handler for level sector stars
    updateLevel: function () {
        // here we will update the game level based on the star clicked
        // note that if game is running we do not want to do anything
        if (timetracker.running) return;

        // get integer value of attribute 'id' of the cliked element
        // in a variable called level
        var level=$(this).attr("id");
        // since there are 4 levels from 1 to 4, we run following loop
        // how many times this loop will run?
        for (var i = 1; i < 5; i++) {
            // 1. select element with id of i (value of loop variable) into
            // a variable called star
            var star=$('#'+i);
            
            if (i <= level) {
                // 1. remove class 'fa-star-o' from star
                star.removeClass('fa-star-o');
                // 2. add class ''fa-star' to star
                star.addClass('fa-star');
            } else {
                // 1. remove class 'fa-star' from star
                star.removeClass('fa-star');
                // 2. add class ''fa-star-o' to star
                star.addClass('fa-star-o');
            }
        }
        // set the grid size of our game. minimum is a 3x3 grid
        // so we set to following as min level = 1
        // for level = 4, we will have a 6x6 grid
        game.gridSize = parseInt(level) + 2;
    }
}
