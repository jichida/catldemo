import data_bms_mydevice from '../test/bms_mydevice.json';
import data_bms_alarm from '../test/bms_alarm.json';
import data_bms_workorder from '../test/workorder.json';
import jsondatareadonly_chargingpile from '../test/bmsdata_chargingpile.json';
import _ from 'lodash';
import moment from 'moment';
import jsondatatrack from '../test/1602010008.json';
import jsondataalarm from '../test/json-BMS2.json';
import {groups} from './bmsdata_group.js';
import {jsondata} from './bms_devices';
import {workusers} from './bms_workusers.js';

const getrandom=(min,max)=>{
  return parseInt(Math.random()*(max-min+1)+min,10);
}

//分组【项目】
let jsondata_bms_groups = groups;

//充电桩
let gmap_chargingpile = {};
let jsondata_bms_chargingpile = [];
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

    let dqzttext = ['工作','空闲','维修中'];
    let secago = getrandom(0,60*60*12);
    let sample = {
      "采集时间":moment().subtract(secago, 'seconds').format('YYYY-MM-DD HH:mm:ss'),
      "额定功率（kW）":getrandom(50,100),
      "额定电压（V）":getrandom(300,400),
      "最大输出电流（A）":getrandom(150,250),
      "位置描述":item.address.formattedAddress,
      "当前状态":dqzttext[getrandom(0,dqzttext.length-1)],
      "累计充电次数":`${getrandom(2000,8000)}`,

      "累计放电量（MWh）":getrandom(0,1000)*200/1000,
      "充电模式":getrandom(0,1)?'直流':'交流',
      "绝缘阻抗":getrandom(8000,10000),

    };

    item['当前电流（A）'] =getrandom(0,sample['最大输出电流（A）']);
    item["累计充电量（MWh）"]= sample["累计充电次数"]*50/1000;
    item["累计放电量（MWh）"]=getrandom(0,1000)*200/1000;

    item["当前功率（kW）"]=item['当前电流（A）']*sample['额定电压（V）']/1000;
    item['开机时长（h）'] =getrandom(5,300);

    item['定位状态'] ='有效定位';
    item['纬度信息'] ='北纬';
    item['经度信息'] ='东经';
    item['经度'] =item.LastHistoryTrack.Longitude;
    item['纬度'] =item.LastHistoryTrack.Latitude;
    item = {...item,...sample};

    gmap_chargingpile[item.DeviceId] = item;
    jsondata_bms_chargingpile.push(item);
});

//设备
let jsondata_bms_mydevice = jsondata;

//报警
let jsondata_bms_alarm = [];

//工单
let jsondata_bms_workorder =[];


//制造报警数据
const test_alaram_text=['绝缘故障','高压互锁','SOC过低'];
const test_warning_level_text=['严重告警','紧急告警','一般告警'];
let indexalarm  = 0;
for(let i=0;i<10;i++){
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
    cloneitem.isreaded = getrandom(0,1)?false:true;
    cloneitem['告警时间'] = moment().subtract(secago, 'seconds').format('YYYY-MM-DD HH:mm:ss');
    cloneitem['报警信息'] = test_alaram_text[getrandom(0,test_alaram_text.length-1)];
    cloneitem['告警位置'] = jsondatareadonly_chargingpile[getrandom(0,jsondatareadonly_chargingpile.length-1)].address.formattedAddress;

    jsondata_bms_alarm.push(cloneitem);
  });

  if((i+1)*data_bms_alarm.length > 10){
    break;
  }
}
// console.log(jsondata_bms_alarm);
let jsondata_bms_workusers = workusers;
// "工单号" : "",
// "营运公司" : "",
// "车辆ID" : "",
// "故障地点" : "",
// "故障代码" : "",
// "部位" : "",
// "故障描述" : "",
// "责任人" : "",
//制造工单数据
const test_workorder_company_text = ['上海巴士','北京巴士','江苏巴士','安徽巴士'];
const test_workorder_errorcode_text = ['U87','S22','F34','E22'];
const test_workorder_part_text = ['车身','发动机','方向盘','坐骑'];
const test_workorder_assgin_text = ['张三','李四','王五','赵六'];
const test_workorder_carid_text = ['苏AXM872','沪BMT722','沪ATJ722','沪A72EF2','沪A9FE2','沪AZM993','沪AME777','沪AAS995','沪AKJ773','沪AFL872','沪A4FJJE','沪ATF335'];
const test_workorder_type_text = ['告警排查','急需维修','正常维护','定时检测','正常维修',];
let indexworkorder  = 0;
for(let i=0;i<20;i++){
  _.map(data_bms_workorder,(item,index)=>{
    let cloneitem = {...item};
    indexworkorder++;
    let deviceindexalarm = indexalarm%jsondata.length;
    cloneitem.DeviceId = jsondata[deviceindexalarm].DeviceId;
    cloneitem.key = indexworkorder + '';
    cloneitem._id = cloneitem.key;

    let secago = getrandom(0,60*60*24*5);
    cloneitem.createtime = moment().subtract(secago, 'seconds').format('YYYY-MM-DD HH:mm:ss');
    cloneitem['assignto'] = jsondata_bms_workusers[getrandom(0,jsondata_bms_workusers.length-1)]._id;
    cloneitem['车牌'] = test_workorder_carid_text[getrandom(0,test_workorder_carid_text.length-1)];
    cloneitem['项目'] = groups[getrandom(0,groups.length-1)].name;
    cloneitem['故障类型'] = test_workorder_type_text[getrandom(0,test_workorder_type_text.length-1)];
    cloneitem['工单号'] = cloneitem.key;
    cloneitem['车辆ID'] = cloneitem.DeviceId;
    cloneitem['营运公司'] = test_workorder_company_text[getrandom(0,test_workorder_company_text.length-1)];
    cloneitem['故障代码'] = test_workorder_errorcode_text[getrandom(0,test_workorder_errorcode_text.length-1)];
    cloneitem['部位'] = test_workorder_part_text[getrandom(0,test_workorder_part_text.length-1)];
    cloneitem['责任人'] = test_workorder_assgin_text[getrandom(0,test_workorder_assgin_text.length-1)];
    cloneitem['故障地点'] = jsondatareadonly_chargingpile[getrandom(0,jsondatareadonly_chargingpile.length-1)].address.formattedAddress;
    cloneitem.isdone = getrandom(0,1)?true:false;
    cloneitem.pics = [];
    if(cloneitem.isdone){
      for(let i=0;i<getrandom(1,5);i++){
        cloneitem.pics.push(`https://unsplash.it/300/200/?random`);
      }
    }
    jsondata_bms_workorder.push(cloneitem);
  });
}

let jsondata_bms_carcollections = [];
for(let i=0;i<5;i++){
  jsondata_bms_carcollections.push(jsondata[i].DeviceId);
}

let jsondata_bms_track = jsondatatrack;
export {
  jsondata_bms_chargingpile,
  jsondata_bms_track,
  jsondata_bms_mydevice,
  jsondata_bms_alarm,
  jsondata_bms_workorder,
  jsondata_bms_groups,
  jsondata_bms_workusers,
  jsondata_bms_carcollections,

  gmap_chargingpile,
  getrandom
};
