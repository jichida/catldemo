import jsondatareadonly_device from '../test/bmsdata_device.json';
import _ from 'lodash';
import config from '../env/config';
import {groups} from './bmsdata_group.js';
import jsondatareadonly_chargingpile from '../test/bmsdata_chargingpile.json';

const getrandom=(min,max)=>{
  return parseInt(Math.random()*(max-min+1)+min,10);
}

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

if(config.softmode === 'pc'){
}
else{
  jsondata = _.sampleSize(jsondata,456);
}


_.map(jsondata,(item,index)=>{
    item.imagetype = '0';
    item.groupid = groups[getrandom(0,groups.length-1)]._id;
    //车辆
    item.isonline = getrandom(0,1)===0?true:false;
    item.isconnected = getrandom(0,1)===0?true:false;
    item.isrunning = getrandom(0,1)===0?true:false;
    item.iserror = getrandom(0,1)===0?true:false;
    item['车牌'] = `车牌${index}`;
    item['VIN'] = `VIN${index}`;
    item['运营年限'] = `${getrandom(5,10)}`;
    item['总里程'] = `${getrandom(50000,500000)}`;
    item['容量保有率'] = `${getrandom(1,100)}`;
    item['位置'] =jsondatareadonly_chargingpile[getrandom(0,jsondatareadonly_chargingpile.length-1)].address.formattedAddress;

});


export {jsondata};
