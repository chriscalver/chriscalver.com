let AccessCode = "";


var d = new Date();
console.log(d);
var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
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


var myEpoch = newdate.getTime() / 1000.0;
let Monday = myEpoch.toFixed();
console.log(myEpoch.toFixed());


























// Post for getting new Acces Token

async function getAccessTokens() {
    const request = await fetch("https://www.strava.com/oauth/token?client_id=REPLACE_WITH_STRAVA_CLIENT_ID&client_secret=REPLACE_WITH_STRAVA_CLIENT_SECRET&refresh_token=REPLACE_WITH_STRAVA_REFRESH_TOKEN&grant_type=refresh_token", {
        "method": "POST",
        "headers": {
            'Content-Type': 'Application/json'
        }
    });
    const response = await request.json();
    console.log(response);
    AccessCode = response.access_token;
    //document.getElementById('AccesCode').innerHTML = AccessCode;  


    ///////////////////////////////////////////   gets all activities

    async function getActivities() {
        const endpoint = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${AccessCode} &after=${Monday}`);
      
        const endpoint2 = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${AccessCode}`);
      
      
        let data = await endpoint.json();  // activities since monday

        let data2 = await endpoint2.json();   // all activities
        console.log(data);

        data = data.sort((b, a) => {
            if (a.start_date
                < b.start_date
            ) {
                return -1;
            }
        });
        console.log(data);





        let i = 0;
        let runcount = 0;
        let ridecount = 0;
        let runkms = 0;
        let ridekms = 0;
        let text = "";
        for (; data[i];) {

            if (data[i].type == "Run") {
                runcount++;
                runkms = runkms + data[i].distance;
                console.log(runkms);
            }

            if (data[i].type == "Ride") {
                ridecount++;
                ridekms = ridekms + data[i].distance;
                console.log(ridekms);
            }
            // text += data[i] + "<br>";
            i++;
        }

        console.log(runcount);
        document.getElementById("RunNum").innerHTML = runcount;

        console.log(ridecount);
        document.getElementById("RideNum").innerHTML = ridecount;

        console.log(ridecount);
        runkms = runkms / 1000;
        document.getElementById("RunKms").innerHTML = runkms.toFixed(2);

        console.log(ridecount);
        ridekms = ridekms / 1000;
        document.getElementById("RideKms").innerHTML = ridekms.toFixed(2);











        console.log(data.length);  // number of results
        document.getElementById('ActNum').innerHTML = data.length;
        const dategrab = data2[0].start_date_local;
        const newdate = dategrab.slice(5, 10);
        document.getElementById('Date').innerHTML = newdate;

        const distanceraw = data2[0].distance;
        const distanceraw2 = distanceraw / 1000;
        const newDistance = distanceraw2.toFixed(2);

        let activity2 = data2[0].sport_type;

        if (data2[0].sport_type == "WeightTraining") {
            activity2 = "Work Out";

        }



        document.getElementById('ActivtyType').innerHTML = activity2;
        document.getElementById('ActivityDistance').innerHTML = newDistance + "km";
        // document.getElementById('ActivityName').innerHTML = data[0].name;  

        const movingtimeraw = data2[0].moving_time;  // 2145  seconds
        // 7488
        const movingtimeraw2 = movingtimeraw / 60;  // converts to min.....35.75   .75 = 45 secs   35mins 45 secs
        // 124.80
        const movingtimetrimmed = Math.trunc(movingtimeraw2); // grabs the 35 drops the .75
        //  124
        const movingtimetrimmed2 = movingtimetrimmed / 60;  // retrievs 0.5833333
        // 2.06666667
        const movingtimetrimmed3 = Math.trunc(movingtimetrimmed2);// drops the decimals leaving 0
        // 2  *****hours****
        const minutes = movingtimetrimmed - movingtimetrimmed3 * 60;

        const movingtimedecimal = movingtimeraw2 - movingtimetrimmed;  // 35.75 - 35 = 0.75   drops the whole num
        //124.80 - 124 = 0.7999999
        const movingtimedecimal60 = movingtimedecimal * 60;  // .75 * 60 = 45.0  ***** seconds*****
        // 0.799999 * 60 = 47.9999999
        const movingtimedecimal60toseconds = movingtimedecimal60 / 100;  // gets 0.450 
        // 0.4799999999
        const movingtimedecimal60tosecondsrounded = movingtimedecimal60toseconds.toFixed(2); // rounds to 0.48
        const secondstrimmed = movingtimedecimal60tosecondsrounded.toString().slice(2); // drops 0. leaves 48 *******
        const movingtime = movingtimetrimmed + movingtimedecimal60toseconds;  // 124.48
        const movingtimefinal = movingtime.toFixed(2);  //rounds off any exrra decimal places  

        const paceraw = movingtimeraw2 / newDistance;  //124.80 mins / 18.03 km = 6.921797
        const paceraw2 = Math.trunc(paceraw); // drops the decimals   hahahahaha   leaves 6 ****mins****
        const pacerawdecimal = paceraw - paceraw2;  // leaves the decimal 
        const pacerawdecimal2 = pacerawdecimal * 0.6;  // converts to seconds  leaves 0.553078
        const pacerawdecimal2trimmed = pacerawdecimal2.toFixed(2); // drops to two decimal places 0.55
        let pace = paceraw2.toString() + ":" + pacerawdecimal2trimmed.toString().slice(2);
        //    grabs 6                   adds :       grabs 0.55 convs to string then drops the 0. leaving 55 secs   
        

        if (data2[0].sport_type == "WeightTraining") {

            document.getElementById('Pace').innerHTML = "n/a";

        } else {
            document.getElementById('Pace').innerHTML = pace + " mins/km";

        }
       // document.getElementById('Pace').innerHTML = pace + " mins/km";
        document.getElementById('ActivityTime').innerHTML = movingtimetrimmed3.toString() + ":" + minutes + ":" + secondstrimmed;
        document.getElementById('HeartRate').innerHTML = data2[0].average_heartrate + " bpm";


    }

    getActivities()
        .then(response => {
            console.log('Athlete ok');
        })
        .catch(error => {
            console.log('Athlete NOT ok');
            console.error(error)
        });
}

getAccessTokens()
    .then(response => {
        console.log('Access ok');
    })
    .catch(error => {
        console.log('Access NOT ok');
        console.error(error)
    });




////////////////////////////////////////////////////////////////////  Weather information Below


async function getCurrentConditions() {

    const endpoint = new URL("http://dataservice.accuweather.com/currentconditions/v1/55489?apikey=REPLACE_WITH_ACCUWEATHER_API_KEY");
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);

    const myDate = new Date(data[0].EpochTime * 1000);


    const TempRaw = Math.trunc(data[0].Temperature.Metric.Value)

    var icon = data[0].WeatherIcon;  //get icon number
    const length = icon.toString();    // convert to string
    const length2 = length.length;   // count character length

    // if string is only one character  add a 0 to the beginning

    if (length2 == 1) {
        icon = "0" + length;
        console.log('if executed')
    }

    document.getElementById('CurrentTemp').innerHTML = TempRaw;
    document.getElementById('WeatherDetails').innerHTML = data[0].WeatherText;
    document.getElementById('Time').innerHTML = myDate.toLocaleTimeString("default");
    document.getElementById('WeatherIcon').src = `https://developer.accuweather.com/sites/default/files/${icon}-s.png`;
}

getCurrentConditions()
    .then(response => {
        console.log('weather ok');
    })
    .catch(error => {
        console.log('weather NOT ok');
        console.error(error)
    });















async function getHourly() {

    const hourlyEndpoint = new URL("http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/55489?apikey=REPLACE_WITH_ACCUWEATHER_API_KEY&metric=true");
    const hourlyResponse = await fetch(hourlyEndpoint);
    const hourlyData = await hourlyResponse.json();
    console.log(hourlyData);


    let i = 0;
    while (i < 12) {

        const hour1 = new Date(hourlyData[i].EpochDateTime * 1000);
        let hour1short = hour1.toLocaleTimeString("default").slice(0, -6);
        if (hour1short.length == 4) {
            hour1short = "0" + hour1short;
            console.log('if gggggggggggexecuted')
        }
    

        const Temp = Math.trunc(hourlyData[i].Temperature.Value);
        const condition = hourlyData[i].IconPhrase;
        const PoP = hourlyData[i].PrecipitationProbability;
        console.log("Loooooop");
        console.log(hour1short.slice(0, -6) + " " + " - " + Temp + "c" + " " + condition + " " + PoP + "%");
        document.getElementById(`Hour${i}`).innerHTML = hour1short + " " + " - " + Temp + "c" + " " + condition + " " + PoP + "%";
        i++;
    }

}

getHourly()
    .then(response => {
        console.log('hourly ok');
    })
    .catch(error => {
        console.log('hourly NOT ok');
        console.error(error)
    });
