import get from 'lodash.get';
import store from '../env/store';
import {ui_showmenu} from '../actions';
import { push,goBack,go  } from 'react-router-redux';//https://github.com/reactjs/react-router-redux
import moment from 'moment';
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
      offset: ['-50%', '0%'],
      fillStyle: null,
    },
    {
      name:'1',
      image:`${process.env.PUBLIC_URL}/images/people.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '0%'],
      fillStyle: null,
    },
    {
      name:'2',
      image:`${process.env.PUBLIC_URL}/images/truck.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '0%'],
      fillStyle: null,
    },
    {
      name:'3',
      image:`${process.env.PUBLIC_URL}/images/taxi.png`,
      width: 16,
      //高度
      height: 16,
      //定位点为中心
      offset: ['-50%', '0%'],
      fillStyle: null,
    },
    {
      name:'4',
      image:`${process.env.PUBLIC_URL}/images/pow2.png`,
      width: 32,
      //高度
      height: 32,
      //定位点为中心
      offset: ['-50%', '0%'],
      fillStyle: null,
    },
    {
      name:'5',
      image:`${process.env.PUBLIC_URL}/images/pow1.png`,
      width: 32,
      //高度
      height: 32,
      //定位点为中心
      offset: ['-50%', '0%'],
      fillStyle: null,
    },
    {
      name:'6',
      image:`${process.env.PUBLIC_URL}/images/pow3.png`,
      width: 32,
      //高度
      height: 32,
      //定位点为中心
      offset: ['-50%', '0%'],
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
  let DeviceId = get(deviceitem,'DeviceId','');
  let txtLatitude = get(deviceitem,'LastHistoryTrack.Latitude','');
  let txtLongitude = get(deviceitem,'LastHistoryTrack.Longitude','');
  let adcode = get(deviceitem,'adcode','');
  let province = get(deviceitem,'province','');
  let city = get(deviceitem,'city','');
  let district = get(deviceitem,'district','');
  let formattedAddress = get(deviceitem,'formattedAddress','');

  let zdl = get(deviceitem,'总电流(A)',0);
  let zdy = get(deviceitem,'总电压(V)',374);
  let soc = get(deviceitem,'SOC(%)',50);
  let cs = get(deviceitem,'车速(km/h)',60);
  let zlc = get(deviceitem,'里程(km)',100000);
  let jxzk = get(deviceitem,'电池绝缘电阻(KΩ)',9000);
  let zgwd = get(deviceitem,'最高温度值(℃)',30);
  let bjxx = get(deviceitem,'报警信息','无');

  const sd = get(deviceitem,'LastHistoryTrack.Speed','');
  const hx = get(deviceitem,'LastHistoryTrack.Course','');
  const cysj = get(deviceitem,'TPData.DataTime','');
  const TP1 = get(deviceitem,'TPData.TP1','');
  const TP2 = get(deviceitem,'TPData.TP2','');
  const TP3 = get(deviceitem,'TPData.TP3','');
  const TP4 = get(deviceitem,'TPData.TP4','');
  const TP5 = get(deviceitem,'TPData.TP5','');
  let lasttime = get(deviceitem,'updated_at','');
  try{
    lasttime = moment(lasttime).format('YYYY-MM-DD HH:mm:ss');
  }
  catch(e){

  }
  return {
      infoBody: `<p>车辆编号:${DeviceId}</p>
      <p class='l'><span class='t'>速度</span><span class='color_warning'>${sd}km/h</span></p>
      <p class='l'><span class='t'>航向</span><span class='color_warning'>${hx}</span></p>
      <p class='l'><span class='t'>采样时间</span><span class='color_warning'>${cysj}</span></p>
      <p class='l'><span class='t'>最后更新时间</span><span class='color_warning'>${lasttime}</span></p>
      <p class='l'><span class='t'>左前胎压</span><span class='color_warning'>${TP1}</span> </p>
      <p class='l'><span class='t'>右前胎压</span><span class='color_warning'>${TP2}</span></p>
      <p class='l'><span class='t'>右后胎压</span><span class='color_warning'>${TP3}</span></p>
      <p class='l'><span class='t'>左后胎压</span><span class='color_warning'>${TP4}</span></p>
      <p class='l'><span class='t'>胎压故障码</span><span class='color_warning'>${TP5}</span></p>
      <button onclick="clickfn_device(${DeviceId})">查看详情</button>`
  };
}
//充电桩
const getpop_chargingpile =(deviceitem)=>{
  let DeviceId = get(deviceitem,'DeviceId','');
  let no = get(deviceitem,'充电桩编号','');
  let sccj = get(deviceitem,'生产厂家','');
  let cdms = get(deviceitem,'充电模式','');
  let dqzt = get(deviceitem,'当前状态','');
  let sysc = get(deviceitem,'开机时长（h）','');

  let dqdl = get(deviceitem,'当前电流（A）','');
  let jyzk = get(deviceitem,'绝缘阻抗','');
  let dqgl = get(deviceitem,'当前功率（kW）','');

  let adcode = get(deviceitem,'adcode','');
  let province = get(deviceitem,'province','');
  let city = get(deviceitem,'city','');
  let district = get(deviceitem,'district','');
  let formattedAddress = get(deviceitem,'formattedAddress','');

  return {
      infoBody: `<p>充电桩编号: ${no}</p>,
      <p class='l'><span class='t'>当前状态:</span><span>${dqzt}</span></p>
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
  let imagetype = get(deviceitem,'imagetype','0');
  if(typeof imagetype === 'string'){
    imagetype = parseInt(imagetype);
  }

  if(imagetype >= 4){
    return getpop_chargingpile(deviceitem);
  }

  return getpop_device(deviceitem);
}
