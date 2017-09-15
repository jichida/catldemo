import _ from 'lodash';
import store from '../env/store';
import {ui_showmenu} from '../actions';
import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux

//地图上点图标的样式【图标类型】
export const getgroupStyleMap = ()=>{
  let groupsz = [
    {
      name:'0',
      image:`${process.env.PUBLIC_URL}/images/bike.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
    {
      name:'1',
      image:`${process.env.PUBLIC_URL}/images/people.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
    {
      name:'2',
      image:`${process.env.PUBLIC_URL}/images/truck.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
    {
      name:'3',
      image:`${process.env.PUBLIC_URL}/images/taxi.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
    {
      name:'4',
      image:`${process.env.PUBLIC_URL}/images/pow1.png`,
      width: 48,
      //高度
      height: 48,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
    {
      name:'5',
      image:`${process.env.PUBLIC_URL}/images/pow2.png`,
      width: 48,
      //高度
      height: 48,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
    {
      name:'6',
      image:`${process.env.PUBLIC_URL}/images/pow3.png`,
      width: 48,
      //高度
      height: 48,
      //定位点为中心
      offset: ['-50%', '-50%'],
      fillStyle: null,
    },
  ];
  return groupsz;
}

//弹出窗口样式
// adcode
// :
// "150782"
// city
// :
// "呼伦贝尔市"
// district
// :
// "牙克石市"
// formattedAddress
// :
//设备
window.clickfn_device =(DeviceId)=>{
  store.dispatch(push(`/deviceinfo/${DeviceId}`));
}
window.clickfn_chargingpile =(DeviceId)=>{
  store.dispatch(push(`/chargingpileinfo/${DeviceId}`));
}
const getpop_device =(deviceitem)=>{
  let DeviceId = _.get(deviceitem,'DeviceId','');
  let txtLatitude = _.get(deviceitem,'LastHistoryTrack.Latitude','');
  let txtLongitude = _.get(deviceitem,'LastHistoryTrack.Longitude','');
  let adcode = _.get(deviceitem,'adcode','');
  let province = _.get(deviceitem,'province','');
  let city = _.get(deviceitem,'city','');
  let district = _.get(deviceitem,'district','');
  let formattedAddress = _.get(deviceitem,'formattedAddress','');

  return {
      infoBody: `<p>车辆编号:${DeviceId}</p>
      <p class='l'><span class='t'>总电流</span><span class='color_warning'>374.0V</span></p>
      <p class='l'><span class='t'>总电压</span><span class='color_warning'>50V</span></p>
      <p class='l'><span class='t'>SOC</span><span class='color_warning'>76.0%</span></p>
      <p class='l'><span class='t'>车速</span><span class='color_warning'>14.0km/h</span> </p>
      <p class='l'><span class='t'>总里程</span><span class='color_warning'>27196km</span></p>
      <p class='l'><span class='t'>绝缘阻抗</span><span class='color_warning'>3015KΩ</span></p>
      <p class='l'><span class='t'>最高温度</span><span class='color_warning'>39℃</span></p>
      <p class='l'><span class='t'>车辆当前位置</span><span class='color_warning'>${province}${city}${district}</span></p>
      <p class='l'><span class='t'>当前报警信息</span><span class='color_warning'>无</span></p>
      <button onclick="clickfn_device(${DeviceId})">查看详情</button>`
  };
}
//充电桩
const getpop_chargingpile =(deviceitem)=>{
  let DeviceId = _.get(deviceitem,'DeviceId','');
  let no = _.get(deviceitem,'充电桩编号','');
  let sccj = _.get(deviceitem,'生产厂家','');
  let cdms = _.get(deviceitem,'生产厂家','');
  let dqzt = _.get(deviceitem,'当前状态','');
  let sysc = _.get(deviceitem,'使用时长','');
  let ljsh = _.get(deviceitem,'累计电耗','');
  let dqdl = _.get(deviceitem,'当前电流','');
  let jyzk = _.get(deviceitem,'绝缘阻抗','');
  let dqgl = _.get(deviceitem,'当前功率','');

  let adcode = _.get(deviceitem,'adcode','');
  let province = _.get(deviceitem,'province','');
  let city = _.get(deviceitem,'city','');
  let district = _.get(deviceitem,'district','');
  let formattedAddress = _.get(deviceitem,'formattedAddress','');

  return {
      infoTitle: `<p>充电桩编号: ${no}</p>`,
      infoBody: `
      <p class='l'><span class='t'>当前状态:</span><span class='color_warning'>${dqzt}</span></p>
      <p class='l'><span class='t'>充电模式:</span><span class='color_warning'>${cdms}</span></p>
      <p class='l'><span class='t'>当前电流:</span><span class='color_warning'>${dqdl}</span></p>
      <p class='l'><span class='t'>当前功率:</span><span class='color_warning'>${dqgl}</span></p>
      <p class='l'><span class='t'>绝缘阻抗:</span><span class='color_warning'>${jyzk}</span></p>
      <p class='l'><span class='t'>充电桩位置:</span><span class='color_warning'>${formattedAddress}</span></p>
      <p class='l'><span class='t'>当前报警状态:</span><span class='color_warning'>无</span></p>
      <button onclick="clickfn_chargingpile('${DeviceId}')">查看详情</button>`
  };
}


export const getpopinfowindowstyle = (deviceitem)=>{
  let imagetype = _.get(deviceitem,'imagetype','0');
  if(typeof imagetype === 'string'){
    imagetype = parseInt(imagetype);
  }

  if(imagetype >= 4){
    return getpop_chargingpile(deviceitem);
  }

  return getpop_device(deviceitem);
}
