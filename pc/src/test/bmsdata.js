import data_bms_mydevice from '../test/bms_mydevice.json';
import data_bms_alarm from '../test/bms_alarm.json';
import data_bms_workorder from '../test/workorder.json';
import jsondatareadonly_device from '../test/bmsdata_device.json';
import jsondatareadonly_chargingpile from '../test/bmsdata_chargingpile.json';
import _ from 'lodash';
import moment from 'moment';
import jsondatatrack from '../test/1602010008.json';
import jsondataalarm from '../test/json-BMS2.json';
import {groups} from './bmsdata_group.js';

const getrandom=(min,max)=>{
  return parseInt(Math.random()*(max-min+1)+min,10);
}

let jsondata_bms_groups = groups;
//获取地理位置信息，封装为promise
let jsondata = _.filter(jsondatareadonly_device,(item) => {
  let thisdata = false;
  if(!!item.LastHistoryTrack){
    if(!!item.LastHistoryTrack.Latitude){
      if(item.LastHistoryTrack.Latitude > 0){
        thisdata = !!item.LastHistoryTrack.Province;
      }
    }
  }
  return thisdata;
});
_.map(jsondata,(item)=>{
    item.imagetype = '0';
    item.groupid = jsondata_bms_groups[getrandom(0,jsondata_bms_groups.length-1)]._id;
    //车辆
    item.isonline = getrandom(0,1)===0?true:false;
});

let gmap_chargingpile = {};
let jsondata_chargingpile = _.filter(jsondatareadonly_chargingpile,(item) => {
  return true;
});
_.map(jsondata_chargingpile,(item,index)=>{
    item.DeviceId = item['充电桩编号'];
    item.LastHistoryTrack = {
      Latitude:item.LastHistoryTrack__Latitude,
      Longitude:item.LastHistoryTrack__Longitude
    }
    let imagetype = 4+index%3;
    item.imagetype = ''+imagetype;
    gmap_chargingpile[item.DeviceId] = item;
});


let jsondatasamle_bms_mydevice = _.sampleSize(jsondata,data_bms_mydevice.length);
let jsondata_bms_mydevice = [];
let jsondata_bms_alarm = [];
let jsondata_bms_workorder =[];


_.map(data_bms_mydevice,(item,index)=>{
  item.DeviceId = jsondatasamle_bms_mydevice[index].DeviceId;
  jsondata_bms_mydevice.push(item);
});

//制造报警数据
const test_alaram_text=['绝缘故障','高压互锁','SOC过低'];
const test_warning_level_text=['严重告警','紧急告警','一般告警'];
let indexalarm  = 0;
for(let i=0;i<30;i++){
  _.map(data_bms_alarm,(item,index)=>{
    let cloneitem = {...item};
    indexalarm++;
    let deviceindexalarm = indexalarm%jsondata.length;

    cloneitem.DeviceId = jsondata[deviceindexalarm].DeviceId;
    //修改数据
    cloneitem.warninglevel = getrandom(0,2);
    cloneitem.key = indexalarm + '';
    cloneitem._id = cloneitem.key;
    cloneitem['告警等级'] = test_warning_level_text[cloneitem.warninglevel];
    cloneitem['车辆ID'] = cloneitem.DeviceId;
    let secago = getrandom(0,60*60*12);
    cloneitem.isreaded = getrandom(0,1);
    cloneitem['告警时间'] = moment().subtract(secago, 'seconds').format('YYYY-MM-DD HH:mm:ss');
    cloneitem['报警信息'] = test_alaram_text[getrandom(0,test_alaram_text.length-1)];
    cloneitem['告警位置'] = jsondatareadonly_chargingpile[getrandom(0,jsondatareadonly_chargingpile.length-1)].address.formattedAddress;

    jsondata_bms_alarm.push(cloneitem);
  });
}
// console.log(jsondata_bms_alarm);

// "工单号" : "",
// "营运公司" : "",
// "车辆ID" : "",
// "故障地点" : "",
// "故障代码" : "",
// "部位" : "",
// "故障描述" : "",
// "责任人" : "",
const test_workorder_company_text = ['上海巴士','北京巴士','江苏巴士','安徽巴士'];
const test_workorder_errorcode_text = ['U87','S22','F34','E22'];
const test_workorder_part_text = ['车身','发动机','方向盘','坐骑'];
const test_workorder_assgin_text = ['张三','李四','王五','赵六'];
let indexworkorder  = 0;
for(let i=0;i<10;i++){
  _.map(data_bms_workorder,(item,index)=>{
    let cloneitem = {...item};
    indexworkorder++;
    let deviceindexalarm = indexalarm%jsondata.length;
    cloneitem.DeviceId = jsondata[deviceindexalarm].DeviceId;
    cloneitem.key = indexworkorder + '';
    cloneitem._id = cloneitem.key;

    cloneitem['工单号'] = cloneitem.key;
    cloneitem['车辆ID'] = cloneitem.DeviceId;
    cloneitem['营运公司'] = test_workorder_company_text[getrandom(0,test_workorder_company_text.length-1)];
    cloneitem['故障代码'] = test_workorder_errorcode_text[getrandom(0,test_workorder_errorcode_text.length-1)];
    cloneitem['部位'] = test_workorder_part_text[getrandom(0,test_workorder_part_text.length-1)];
    cloneitem['责任人'] = test_workorder_assgin_text[getrandom(0,test_workorder_assgin_text.length-1)];
    cloneitem['故障地点'] = jsondatareadonly_chargingpile[getrandom(0,jsondatareadonly_chargingpile.length-1)].address.formattedAddress;

    jsondata_bms_workorder.push(cloneitem);
  });
}

export {
  jsondata,
  jsondata_chargingpile,
  jsondatatrack,
  jsondataalarm,
  jsondata_bms_mydevice,
  jsondata_bms_alarm,
  jsondata_bms_workorder,
  gmap_chargingpile,
  jsondata_bms_groups,
  getrandom
};
