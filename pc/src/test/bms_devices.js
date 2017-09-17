import jsondatareadonly_device from '../test/bmsdata_device.json';
import _ from 'lodash';
import config from '../env/config';
import {groups} from './bmsdata_group.js';
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
  jsondata = _.sampleSize(jsondata,30);
}


_.map(jsondata,(item,index)=>{
    item.imagetype = '0';
    item.groupid = groups[getrandom(0,groups.length-1)]._id;
    //车辆
    item.isonline = getrandom(0,1)===0?true:false;

    item['车牌'] = `车牌${index}`;
    item['VIN'] = `VIN${index}`;
    item['运营年限'] = `运营年限${index}`;
    item['总里程'] = `总里程${index}`;
    item['容量保有率'] = `容量保有率${index}`;
    item['位置'] = `位置${index}`;
});


export {jsondata};
