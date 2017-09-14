import _ from 'lodash';
import jsondataprovinces from '../util/provinces.json';

let gmap = {};
_.map(jsondataprovinces,(v,index)=>{
  gmap[v.name] = v.code;
  // groups.push({
  //   _id:`${v.code}`,
  //   name:`${v.name}`
  // });
});

export const getgroupnamebydevice = (deviceinfo)=>{
  let groupinfo = {
    _id:'0',
    name:`未分组`
  };

  if(!!deviceinfo.LastHistoryTrack.Province){
    if(!!gmap[deviceinfo.LastHistoryTrack.Province]){
      groupinfo = {
        _id:gmap[deviceinfo.LastHistoryTrack.Province],
        name:deviceinfo.LastHistoryTrack.Province
      };
    }
  }
  return groupinfo;
}
