
const curdate = document.getElementById("date");
let weathcon = document.getElementById("weathercon");

const tempStatus = "{%tempstatus%}";

if (tempStatus = "Sunny") {
    weathercon.innerHTML = "<i class='fa-solid fa-sun' style='color: #eccc68;'></i>"
}
else if (tempStatus == "Clouds") {
    weathercon.innerHTML = "<i class='fa-solid fa-clouds' style='color:#dfe4ea;'></i>";
} else if (tempStatus == "Rainy") {
    weathercon.innerHTML = "<i class='fa-sharp fa-solid fa-cloud-rain' style='color:#a4606e;'></i>";
} else {
    weathercon.innerHTML = "<i class='fa-solid fa-clouds' style='color:#44c3de;'></i>";
}

const getCurrentDay = () => {

    var weekday = new Array(7);

    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";

    let CurrentTime = new Date();
    // console.log(weekday[CurrentTime.getDay()]);

    let day = weekday[CurrentTime.getDay()];
    return day;
};

const getCurrentTime = () => {

    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ]
    var now = new Date();
    var month = months[now.getMonth() + 1];   //start with 0 as 1st month
    var day = now.getDate();
    // var year = currenttime.getFullYear();

    let hour = now.getHours();
    let min = now.getMinutes();

    var notation = "AM";

    if (hour > 11) {
        notation = "PM";
        if (hour > 12) hour -= 12; //12 hour notation
    }

    if (min < 10) {
        min = "0" + min;
    }

    return `${month}     ${day} | ${hour}:${min} ${notation}`;

    // console.log(months[month] + "/" + day);
};

curdate.innerHTML = getCurrentDay() + " " + "|" + " " + getCurrentTime();