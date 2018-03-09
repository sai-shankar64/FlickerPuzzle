var flickr = {
    // this function will make AJAX query to flickr service passing it
    // the keyword for theme. We also pass it a changeImage function that
    // you need to call when flickr returns the image list.
    // this is beauty of evented programming in JavaScript
    // You can pass functions as arguments and call them when needed
    getThemeImage: function (keyword, changeImage) {
      
        var url, aspect = 1, title='pick a theme';
        
        // use getJSON to make a request to flickr service.
        $.getJSON('https://www.flickr.com/photos/henrybrosius/16952077571/');
        // know more at https://www.flickr.com/services/feeds/docs/photos_public/
        // pass it keyword in 'tag' parameter, let 'tagmode' be 'any'
        // and 'format' be 'json'
        
        // handle both success and failure responses as per documentation
        // The service returns you an object with an array of image objects called items.
        // see: http://api.jquery.com/jquery.getjson/ 
        // (go to bottom of above url and there is almost an example using flickr there for you to use)
        // I am including helper code for you to follow below.
        
        
        
        // we set all ajax requests to time out after 10 seconds.
        $.ajaxSetup({
            timeout: 10000
        });
        
        // use the ajax call now. Note getJSON is special case of $.ajax method in jQuery
      $.getJSON("https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
          {
                tags: keyword,
                tagmode: "any",
                format: "json"
            }
        )
        .done(function (data) {
            // You should use Math.random() method of JavaScript to pick
            // a random image object from the array. 
           var ui= Math.floor(Math.random()*(data['items'].length));
           url=data.items[ui].media.m;
            // The object has 'media' object with url to thumbnail of the image in it's 'm' property.
            // e.g. url: http://farm5.staticflickr.com/4192/33658660524_1bbc89303b_m.jpg
            // note that you can replace _m at end with _b to get the bigger picture
            
            // the description property contains an html containing img where width and height
            // of thumbnail image is given. From this we can calculate the aspect 
            // ratio i.e. width/height. This is a good place to use RegExp (regular expressions)
            // look at http://stackoverflow.com/questions/432493/how-do-you-access-the-matched-groups-in-a-javascript-regular-expression
            // and https://regex101.com/
            url=url.replace(/_m/i,'_b');
            $('#picture').attr('src',url);
            var desc=data.items[ui].description;
            // the title property on item also have to be fetched.
            // create two regular expressions, one for width and other for height. I am giving you one:
            var widthregex = /width=\"(\d+)\"/g;
            var heightregex= /height=\"(\d+)\"/g;
            // this is a good place for try catch, because we are trying to depend on external data
            // what if data was incomplete?
            try {
              var wmatch = widthregex.exec(desc);
              var width = parseInt(wmatch[1]);
              var hmatch = heightregex.exec(desc);
              var height = parseInt(hmatch[1]);
              aspect=width/height;
              // similarly get height and calculate aspect
            } catch(err) {
              // some error, so default to aspect of 1. Alternatively we can get aspect after image loads
              // in image element using .load jQuery method. But let us not worry about it for now.
              aspect = 1.0;
            }
        })

        .fail(function (xhr, textStatus, thrownError) {
            alert("failed to load image. Using default");
            url = 'picture.svg';
        })
        .always(function () {
            if (url === undefined) {
                alert('could not fetch picture. Request timed out. Using default')
                url = 'picture.svg';
            }
            else{
            game.changeImage(url, aspect, title);
            }
        });
    }
}