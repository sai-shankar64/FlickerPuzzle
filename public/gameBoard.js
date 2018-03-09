var gameBoard = {
   // this shall contain the value of element we are dragging
    dragged: null,

    // rever to HTML5 drag drop API before you complete following functions
    // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

    dragStart: function (event) {
        // set the gameBoard.dragged to 'data-value' attribute
            // of the event's target element
            gameBoard.dragged=event.target.getAttribute('data-value');
            
    },

    dragEnter: function (event) {
        // we want to visually indicate what grid cell we are on
        // se let us set he opacity of event target element's style to 0.5
    
        event.target.style.opacity='0.5';
    
    },

    dragLeave: function (event) {
        // while dragging our element, we may move over various other elements
        // and leave some without dropping. When we entered the element
        // we changed its opacity for visual indication
        // it is not good to leave that opacity when we leave the element
        // so set the opacity of events target element's style back to 1.0
        // WAIT! only do that if the element we are leaving is not the dragged
        // element. Rememebr all elements have 'data-value' attribute that
        // we can match with gameboard.dragged.
        // We do this so as to know where we picked up our element that we are dragging
        if(event.target.getAttribute('data-value')!=gameBoard.dragged){
            event.target.style.opacity='1';
        }

    },

    dragOver: function (event) {
        // let us not do anything here, so simple preventDefault action as well below
        event.preventDefault();

    },

    dragEnd: function (event) {
        // reset the opacity of the target element as our dragging is over.
        // this is actually our source element that we were dragging.
            event.target.style.opacity='1';
    },

    dragDrop: function (event) {
        // this is important part. We are finally dropping our element
        // so the destination and source elements need to be swapped

        // 1. prevent default action (open as link for some elements)
        event.preventDefault();
        // 2. reset the opacity of the target element
        event.target.style.opacity='1';
        // get the data-value of destination. We have the source value in
       // gameBoard.dragged property
        var current = event.target.getAttribute('data-value');

        //need to swap the two now dragged <-> current
        
        var $current = $('[data-value='+current+']');// select li element with data-value of current contained in element with id 'grid'
        var $dragged = $('[data-value='+gameBoard.dragged+']');// select li element with data-value of gameBoard.dragged contained in element with id 'grid'

        // below we get the position attribute that telsl us its current ordering
        var dragged_pos = parseInt($dragged.attr('pos'));
        var current_pos = parseInt($current.attr('pos'));

        // if we drop src in same spot, do nothing
        if (current_pos === dragged_pos) return;
        //if one after another only one insertion is sufficient
        if (dragged_pos == current_pos - 1) {
            //insert $current before $dragged;
            $current.insertBefore($dragged);
        } else if (current_pos == dragged_pos - 1) {
            //insert $dragged before $current;
            $dragged.insertBefore($current);
        }
         else {
            var $temp;
            // if current is the last node in grid
            if (current_pos == game.gridSize * game.gridSize - 1) {
                $temp = $current.prev();// previous node of $current
                // insert $current before $dragged
                $current.insertBefore($dragged);
                // insert $dragged after $temp
                $dragged.insertAfter($temp);
            } else {
                $temp =$current.next(); //next node of $current
                // insert $current before $dragged
                $current.insertBefore($dragged);
                // insert $dragged before $temp
                $dragged.insertBefore($temp);
                
            }
        }

        //swap the pos attribute as their positions are swapped
        $current.attr('pos', dragged_pos);
        $dragged.attr('pos', current_pos);

        //After each move, we should check winning situation
        // call judge object's checkForWin method now
        judge.checkForWin();
        
    },
    
  
    addDragDropHandlers: function () {
        // notice how we add all our event handlers
        $('#grid').children()
            .on("dragstart", gameBoard.dragStart)
           .on("dragenter", gameBoard.dragEnter)
            .on("dragend", gameBoard.dragEnd)
         .on("drop", gameBoard.dragDrop)
          .on("dragleave", gameBoard.dragLeave)
           .on("dragover", gameBoard.dragOver);
    },

    //handler to create randomized grid
    createGrid: function (aspect, imageUrl) {
        
    
        //We create a nxn grid of li's each of fixed width and height
        //We need to show a specific portion of image in each grid cell
        //the way to do is using concept of css sprites
        //https://www.w3schools.com/css/css_image_sprites.asp
        //given a html div block of 100x100 pixels. Given an image 'x.jpg' of 200x200 pixel
        //if we set background-image: url('x.jpg') on that div, we will see top left quarter of the image only
        //if we set background-size to 100%, then entire image will fit
        //if we set background size to 200%, then 50% will fit
        //if we set to 400% then 25% o width and height will fit. and so on
        //now we can set background-position. Ideally we use pixel units but
        //we are loading random image from internet so the pixel sizes may vary
        //hence we should use %ages. When we say background-pos: 30% 50%
        //we say that 30% x in our div should match 30% x in image and similarly for y
        //so background-pos: 0% 0% match top leftm and 100% 0% match top right
        //0% 100% match bottom left and 100% 100% match bottom right
        //suppose, I want to split in 3x3 grid,
        //Then in each cell i want 1/3 x 1/3 image portion
        //so background-size must be 300%
        //what should be background-position: xpos% ypos%
        // see below our grid layout
        /*
          0%   0% |  50%   0% | 100%   0%
        ----------------------------------
          0%  50% |  50%  50% | 100%  50%
        ----------------------------------
          0% 100% |  50% 100% | 100% 100%
        */ 
        // now for a 4x4 grid we want to scale background by 400% and positions as:
        /*
          0%   0% |  33%   0% |  66%   0% | 100%   0%
        ---------------------------------------------
          0%  33% |  33%  33% |  66%  33% | 100%  33%
        ---------------------------------------------
          0%  66% |  33%  66% |  66%  66% | 100%  66%
        ---------------------------------------------
          0% 100% |  33% 100% |  66% 100% | 100% 100%
        */
        //and so on.
        // Good now that you understand you should populate following array with 
        // game.gridSize x game.gridSize li items
        var cells = []; // empty array of cells
        var puzzleWidth = 400; // this is our width of puzzle in pixels and it is fixed
        var puzzleHeight = parseInt(400 / aspect); // height may vary based on image aspect ratio
        var cellWidth = parseInt(puzzleWidth/game.gridSize);//width of each cell in pixels
        var cellHeight = parseInt(puzzleHeight/game.gridSize);//height of each cell in pixels
        //how much % of width/height of original image should show in each cell
        
        // here we shall create our nxn grid
        for (var i = 0; i < game.gridSize * game.gridSize; i++) {
            //refer to above description to populate code below.
            var xpos = Math.floor((i%game.gridSize)*(100/(game.gridSize-1)));//x-position in %units;
            var ypos = Math.floor(Math.floor(i/game.gridSize)*(100/(game.gridSize-1)));//y-position in %units;
            
            var li  =$("<li draggable='true' data-value="+i+"></li>").css({'background-image':'url('+imageUrl+')','background-size':100*(game.gridSize)+'%',
            'width':cellWidth+'px','height':cellHeight+'px','background-position':xpos+'% '+ ypos+'%'});
            
            /*create new li element using jQuery syntax
            and set its css to have appropriate backgrount-image,
            background-size, background-position, width and height.
            DO NOT forget to make these elements draggable
            */

            //push the li element in our array
            cells.push(li);
        }

        // OK, we have created cells in correct order. Let us shufle them
        // like you shuffle a stack of cards. Note that we are calling
        // shuffle method on array object that we created (see utility.js)
       cells.shuffle();

        //Now, we shall append these cells in the element with id 'grid'
        for (var i = 0; i < cells.length; i++) {
            // let us remember their new ordering as an attribute
            cells[i].attr('pos', i);
            $('#grid').append(cells[i]);
        }

        //now that our gameboard is ready, we need to handle drag/drop events
        gameBoard.addDragDropHandlers();
    }
}
