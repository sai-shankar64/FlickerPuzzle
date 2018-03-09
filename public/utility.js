Array.prototype.shuffle = function () {
    //Apply Fisher Yates algorithm (look it up online)
    //and shuffle the elements of the array
    //you can access the elements by this
    //e.g. this[1] gives the second element.
    //OFCOURSE:- if you do not implement, your puzzle will always
    //be solved. you can use Math.random() to create random number
    // look the documentation online
    //NOTE: 'this' in JavaScript behaves differently
    //rather that refering to the object in which it is used
    //it refers to the calling object
    //therefore in all the objects we used object name rather than this
    //e.g. timetracker.running instead of this.running
    //you can look it up online.
    for(var i=this.length-1;i>=0;i--){
        var j=Math.floor(Math.random()*this.length);
        var k=this[i];
        this[i]=this[j];
        this[j]=k;
    }
    return this;
};