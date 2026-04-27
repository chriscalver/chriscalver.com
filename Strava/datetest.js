var d = new Date();
console.log(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
var newdate = new Date(d.setDate(diff));
var hour = newdate.getHours();
var mins = newdate.getMinutes();
var secs = newdate.getSeconds();

console.log(newdate);
console.log(hour);
console.log(mins);
console.log(secs);


newdate.setHours(0);
newdate.setMinutes(0);
newdate.setSeconds(0);




console.log(newdate);
// console.log(hour);
// console.log(mins);
// console.log(secs);

//var epoch = newdate.getTime() - newdate.getMilliseconds() / 1000;


var myEpoch = newdate.getTime()/1000.0;
console.log(myEpoch.toFixed());


