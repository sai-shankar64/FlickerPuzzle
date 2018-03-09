var judge = {
    // our winning messages. We will pick based on some cool math
    winning_text: [
        'You just worked wonders',
        'Excellent! Keep it up',
        'You Got it!',
        "Well done! I thought you'd miss",
        'Better late than never',
    ],
    
    // check if user has won
    checkForWin: function () {
        
        // get an array of value data attribute on all li elements that are 
        // direct children of element with id 'grid'
        var currentList=$('[data-value]').map(function(){
            return $(this).data('value');
            
        });
        // you shall use the jQuery map function to do this. look it up.
        // set this array to a variable called currentList

       
        if (judge.isSorted(currentList)) {
            // 11. call timetracker's stopRunning method to stop the timer as user is done
            // note that the method returns total time in seconds taken by user
            var timeTaken=timetracker.stopRunning();
            // assign it to a variable named 'timeTaken'
            
            // below we construct the winning message. Follow the methods called here
            // to know the logic :)
            var message = timetracker.getTimerText(timeTaken) + '</br>' +
                          judge.winning_text[judge.getMessageIndex(timeTaken)];
                          

            // 2. call game.end method and pass the message to it.
            game.end(message);
        }
    },

    getMessageIndex: function (timeTaken) {
        
        // implement the following logic
        // we can know the game level by looking at game.gridSize property
        // 3 = level 1 and 6 = level 4
        // look at the winning_text proprty of the judge object at the top of this file.
        // for smallest level message index increments every 30 sec
        // for next level it increments every 60 sec
        // for next level every 90 sec and so on
        // so you need to return the message index from the array based on above rules
        // for example at level 1 if user took 108 seconds, there are 
        // 3 full 30 sec intervals passed and the fourth interval is going on
        // so we return the fourth item i.e. index 3
        // if user took too much time, we return the last index.
        
        var x=game.gridSize;
        var y;
        if(x==3) y=30;
        else if(x==4) y=60;
        else if(x==5) y=90;
        else if(x==6) y=120; 
    
        return (Math.floor(timeTaken/y)+1);
    },

    isSorted: function (arr) {
        // given an array return true if it is sorted, else return false.
        // Hint! our array is very simple
      
        for(var i=0;i<arr.length-1;i++){
            if(arr[i]<arr[i+1]){}
            else
                return false;
            
        }
        return true;
        // say if array was of size n then the entries are from 0 to n-1
        // and there are no duplicates. 
    }
}