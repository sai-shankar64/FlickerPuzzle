var hello=require('./custom_hello');
var gb=require('./custom_goodbye');
hello();
gb.goodbye();
require('./custom_goodbye').goodbye();