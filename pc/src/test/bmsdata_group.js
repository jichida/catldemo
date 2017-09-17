import _ from 'lodash';
import jsondataprovinces from '../util/provinces.json';
import config from '../env/config';

let groups = [];
if(config.softmode === 'pc'){
  _.map(jsondataprovinces,(v,index)=>{
    groups.push({
      _id:`${v.code}`,
      name:`${v.name}`
    });
  });
}
else{
  groups =
  [
    {
      _id:0,
      name:'ZZT_12KWH'
    },
    {
      _id:1,
      name:'ZZT_60KWH'
    },
    {
      _id:2,
      name:'ZZT_89KWH'
    },
    {
      _id:3,
      name:'ZZT_287KWH'
    },
  ];
}
_.map(groups,(item,index)=>{
  item['key'] = index;
  item['电池厂商'] = '电池厂商'+index;
  item['电机厂商'] = '电机厂商'+index;
  item['电控厂商'] = '电控厂商'+index;
});
export {groups};
