const map = require('lodash.map');
const tydata = [
  {
    "deviceid": "1707200001",
    "GPSStatus": "A",
    "Longitude": "121.777376",
    "Latitude": "31.107271",
    "Speed": "0",
    "Course": "0",
    "DataTime": "2017/9/21 13:33:59",
    "TP1": "255",
    "TP2": "29",
    "TP3": "255",
    "TP4": "255",
    "TP5": "0"
},
{
    "deviceid": "1707200016",
    "GPSStatus": "A",
    "Longitude": "121.777424",
    "Latitude": "31.107333",
    "Speed": "0",
    "Course": "0",
    "DataTime": "2017/9/21 12:08:09",
    "TP1": "255",
    "TP2": "29",
    "TP3": "255",
    "TP4": "255",
    "TP5": "0"
},
{
    "deviceid": "1707200020",
    "GPSStatus": "A",
    "Longitude": "121.572675",
    "Latitude": "31.222501",
    "Speed": "26",
    "Course": "342",
    "DataTime": "2017/9/29 17:01:11",
    "TP1": "25",
    "TP2": "23",
    "TP3": "27",
    "TP4": "27",
    "TP5": "0"
}];

let jsondata = [];
map(tydata,(item,index)=>{
  // item = {...jsondataexport[index],...item};
  item.imagetype = '0';
  item.DeviceId = item.deviceid;
  item.LastHistoryTrack = {
    Latitude:parseFloat(item.Latitude),
    Longitude:parseFloat(item.Longitude),
  }
  jsondata.push(item);
});

module.exports = jsondata;
