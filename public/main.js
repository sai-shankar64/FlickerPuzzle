 // when the document is fully loaded add event handlers to appropriate elements
 $(document).ready(function () {
    //1. attach game.setTheme function to change event on select element with id 'category'
    $('#category').change(game.setTheme);

    //2. attach game.begin function to click event on button element with id 'start-btn'
    $('#start-btn').click(game.begin);
   
    //3. attach game.reset function to click event on button element with id 'reset-btn'
      $('#reset-btn').click(game.reset);
    
    //4. attach game.updateLevel function to click event on i element in li in an element with class 'level'  
      $('.level').find('i').click(game.updateLevel);
});
