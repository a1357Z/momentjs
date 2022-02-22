var moment = require('moment-timezone'); 
moment().format();
let currentTimeWithoutFormat = moment()
let newTimeWithoutFormat = moment().add(3,'h')
let currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
let currHours = moment().hours()
let currMinutes = moment().minutes()
let currSeconds = moment().seconds()
let newTime = moment().add(3,'h').format("dddd, MMMM Do YYYY, h:mm:ss a");
let newHours = moment().add(3,'h').hours()
// console.log('currentTime', currentTime,'\n', 'newTime',newTime)
// console.log(currHours,currMinutes,currSeconds,newHours)

if(currHours >= 23 || currHours < 7){
    //the user signed up in the 23-7 zone
    if(newHours >= 23 || newHours < 7){
        //the 3 hour period for the first stage lies between 23-7 so the stage to start a 7
    }else{
        //again start the stage at 7, so no need of if else case used here
    }
    //start sending notifications at 7 
}else{
    //user signed up outside the 23-7 zone
    if(newHours >= 23 || newHours < 7){
        // d = the time duration between currentTime and 23hrs(same day) in minutes
         let d = moment().diff(moment(currentTimeWithoutFormat),'minute')
        //we need to schedule notifications upto the newTime

        //then after 7
        //duration for which notification needs to be sent after 7 am (pendingDuration = 180 - d)
    }else{
        //both the start and the end time of stage 1 is out of 23-7 hrs so can send notifications as usual
    }
}


// console.log(moment(currentTimeWithoutFormat).format("dddd, MMMM Do YYYY, h:mm:ss a"),moment(newTimeWithoutFormat).format("dddd, MMMM Do YYYY, h:mm:ss a"))
// console.log(moment(newTimeWithoutFormat).diff(moment(currentTimeWithoutFormat),'minute') )


//moment[year, month, date]
// console.log(moment([2021, 10, 10]).toString())
// console.log(moment().year())
// console.log(moment().month())
// console.log(moment().date())


let endTime = moment()
let endYear = moment(endTime).year();
let endMonth = moment(endTime).month();
let endDay = moment(endTime).date();

let scheduledTime = moment([endYear, endMonth, endDay]).add(7,'h');
//the 2 statements below are equivalent
// console.log(scheduledTime.format("dddd, MMMM Do YYYY, h:mm:ss a"))
// console.log(moment(endTime.format('YYYY MM DD'),"YYYY-MM-DD").add(7,'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))
//////////////////////////

//console.log(endTime.format('YYYY MM DD'))

//console.log(moment(endTime.format('YYYY MM DD')).add(7,'h').format("dddd, MMMM Do YYYY, h:mm:ss a"))

// console.log(moment([endYear, endMonth, endDay]).add(24,'h').hours())
// let a = endTime.unix()
// console.log(endTime.add(1,'h').unix()-a)

// let currTime = moment()
// let time = "07:00"
// console.log(moment(currTime).add(1, "day").format("dddd, MMMM Do YYYY, h:mm:ss a"))
// console.log(moment(moment(currTime).add(1, "day").format("YYYY-MM-DD") +" " +time).format("dddd, MMMM Do YYYY, h:mm:ss a"))

// let curr = currTime.format()
// let stageShouldEndAt = currTime.add(35,'minutes')
// console.log(moment.duration(stageShouldEndAt.diff(curr)).asMinutes())


// let time = moment()
// console.log(moment(time.format('YYYY MM DD'),"YYYY-MM-DD").utc().format("dddd, MMMM Do YYYY, h:mm:ss a"))
// console.log(moment(time.format('YYYY MM DD'),"YYYY-MM-DD").add(7,'h').utc().format("dddd, MMMM Do YYYY, h:mm:ss a"))
// console.log(moment(time.format('YYYY MM DD'),"YYYY-MM-DD").add(23,'h').utc().format("dddd, MMMM Do YYYY, h:mm:ss a"))

// let format = "hh:mm:ss"
// let afterTime = moment("17:29:59", format).format("dddd, MMMM Do YYYY, h:mm:ss a")
// let beforeTime = moment("01:30:00", format).format("dddd, MMMM Do YYYY, h:mm:ss a");
// console.log(afterTime,beforeTime)

// console.log(time.utc().hours())
// console.log(time.utc().minutes())

// const currTime = moment().utcOffset("+05:30");
// const currHour = currTime.hours();
// const currMins = currTime.minutes()
// console.log(currHour, currMins)

// const nextDay7AMTime = moment(
//     currTime.format("YYYY MM DD"),
//     "YYYY-MM-DD"
//   ).add(31, "h").utcOffset("+05:30");
//   const currDay7AMTime = moment(
//     currTime.format("YYYY MM DD"),
//     "YYYY-MM-DD"
//   ).add(7, "h").utcOffset("+05:30");

//   console.log(nextDay7AMTime, currDay7AMTime)

//   console.log(moment('2022/01/01 12:00 AM').format('YYYY-MM-DD HH:mm:SS'))

console.log(moment().utc().format("HH:MM"))
console.log(moment().format("hh:mm"))
console.log(moment().toISOString())

console.log(moment().tz("Asia/Kolkata").toISOString())
console.log(moment("2021-10-07T07:22:50.179+0000").toISOString())
 