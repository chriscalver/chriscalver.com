let AccessCode = "";

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
        const endpoint = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${ AccessCode }`);
        const data = await endpoint.json();
        console.log(data);
        
             
        
        const distanceraw = data[2].distance;
        const distanceraw2 = distanceraw / 1000;
        const newDistance = distanceraw2.toFixed(2);
    
        //document.getElementById('ActivtyType').innerHTML = data[2].sport_type;
        //document.getElementById('ActivityDistance').innerHTML = newDistance + "km";       
        //document.getElementById('ActivityName').innerHTML = data[2].name;  
       
        const movingtimeraw = data[2].moving_time;  // 2145  seconds
                                                    // 7488
        const movingtimeraw2 = movingtimeraw / 60;  // converts to min.....35.75   .75 = 45 secs   35mins 45 secs
                                                    // 124.80
        const movingtimetrimmed = Math.trunc(movingtimeraw2); // grabs the 35 drops the .75
                                                            //  124
        const movingtimetrimmed2 = movingtimetrimmed / 60;  // retrievs 0.5833333
                                                            // 2.06666667
        const movingtimetrimmed3 = Math.trunc(movingtimetrimmed2);// drops the decimals leaving 0
                                                                // 2  *****hours****
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
        const pace = paceraw2.toString() + ":" + pacerawdecimal2trimmed.toString().slice(2);  
        //    grabs 6                   adds :       grabs 0.55 convs to string then drops the 0. leaving 55 secs   

        //document.getElementById('ActivityTime').innerHTML = movingtimetrimmed.toString() + " min" + "  " + secondstrimmed + " secs";    
        //document.getElementById('HeartRate').innerHTML = data[2].average_heartrate;
        //document.getElementById('Pace').innerHTML = pace + " mins/km";   
        
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

    const endpoint = new URL("http://dataservice.accuweather.com/currentconditions/v1/55489?apikey=Qc1ej31WWglKsRnGyRNbRjA5atq9ei1H");
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);    

    const TempRaw = Math.trunc(data[0].Temperature.Metric.Value)

    var icon = data[0].WeatherIcon;  //get icon number
    const length = icon.toString();    // convert to string
    const length2 = length.length;   // count character length

    // if string is only one character  add a 0 to the beginning

    if (length2 == 1) {
        icon = "0"+ length;        
        console.log('if executed')
      } 
     
    //document.getElementById('CurrentTemp').innerHTML = TempRaw;
    document.getElementById('WeatherDetails').innerHTML = data[0].WeatherText; 
    //document.getElementById('WeatherIconNumber').innerHTML = data[0].WeatherIcon; 
    //document.getElementById('WeatherIcon').src = `https://developer.accuweather.com/sites/default/files/${ icon }-s.png`;
}

getCurrentConditions()
    .then(response => {
        console.log('weather ok');
    })
    .catch(error => {
        console.log('weather NOT ok');
        console.error(error)
});