import {takeLatest,takeEvery,put,fork,call,select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  querydevicegroup_request,
  querydevicegroup_result,
  querydevice_request,
  querydevice_result,
  queryhistorytrack_request,
  queryhistorytrack_result,
  notify_socket_connected,
  login_request,
  md_login_result,
  getsystemconfig_request,
  getsystemconfig_result,

  searchbatteryalarm_request,
  searchbatteryalarm_result,
  searchbatteryalarmsingle_request,
  searchbatteryalarmsingle_result,
  searchbattery_request,
  searchbattery_result,

  querydeviceinfo_request,
  querydeviceinfo_result,
  md_querydeviceinfo_result,

  serverpush_devicegeo,
  serverpush_devicegeo_sz,
  serverpush_devicealarm,

  serverpush_devicegeo_sz_request,
  serverpush_devicegeo_sz_result,
  start_serverpush_devicegeo_sz,

  ui_changemodeview,

  getcurallalarm_request,
  getcurallalarm_result,

  logout_request,
  logout_result,

  getallworkorder_request,
  getallworkorder_result,

  queryworkorder_request,
  queryworkorder_result,
} from '../actions';
import  {
  jsondata_bms_chargingpile,
  jsondata_bms_track,
  jsondata_bms_mydevice,
  jsondata_bms_alarm,
  jsondata_bms_workorder,
  jsondata_bms_groups,
  getrandom
} from '../test/bmsdata.js';

import {getRandomLocation} from '../env/geo';
import coordtransform from 'coordtransform';
import {g_devicesdb} from './mapmain';
import _ from 'lodash';
import {getgeodata} from '../sagas/mapmain_getgeodata';
//获取地理位置信息，封装为promise

import moment from 'moment';

export function* apiflow(){//
  yield takeLatest(`${getallworkorder_request}`, function*(action) {
    try{
      yield put(getallworkorder_result({list:jsondata_bms_workorder}));
   }
   catch(e){
     console.log(e);
   }
  });

  yield takeLatest(`${queryworkorder_request}`, function*(action) {
    try{
      let list =  _.sampleSize(jsondata_bms_workorder, getrandom(0,jsondata_bms_workorder.length-1));
      yield put(queryworkorder_result({list}));
   }
   catch(e){
     console.log(e);
   }
  });

  //========
  yield takeLatest(`${logout_request}`, function*(action) {
    try{
      yield put(logout_result({}));
   }
   catch(e){
     console.log(e);
   }
  });

  yield takeEvery(`${getcurallalarm_request}`, function*(action) {
    try{
      //获取今天所有告警信息列表
      // jsondata_bms_alarm
      yield put(getcurallalarm_result({list:jsondata_bms_alarm}));
   }
   catch(e){
     console.log(e);
   }
  });


  yield takeEvery(`${querydeviceinfo_request}`, function*(action) {
    try{
    const {payload:{query:{DeviceId}}} = action;
    let deviceinfo = g_devicesdb[DeviceId];
     yield put(md_querydeviceinfo_result(deviceinfo));
   }
   catch(e){
     console.log(e);
   }
  });

  yield takeEvery(`${getsystemconfig_request}`, function*(action) {
    try{
      yield put(getsystemconfig_result({}));

      yield call(delay,3000);
      yield put(login_request({
        username:'15961125167',
        password:'123456'
      }));
    }
    catch(e){
      console.log(e);
    }

  });

  yield takeEvery(`${login_request}`, function*(action) {
    try{
        const {payload} = action;
        const {username,password} = payload;
        if(password === '123456'){
          yield put(md_login_result({
            loginsuccess:true,
            username:username,
            token:'',
          }));
        }
        else{
          yield put(md_login_result({
            loginsuccess:false,
          }));
        }
      }
      catch(e){
        console.log(e);
      }
  });

  yield takeEvery(`${ui_changemodeview}`, function*(action) {
    try{
        let viewmode = action.payload;
        let jsondata_result_2;
        if(viewmode === 'device'){
          jsondata_result_2 = jsondata_bms_mydevice;
        }
        else{
          jsondata_result_2 = jsondata_bms_chargingpile;
        }

        yield put(querydevice_result({list:jsondata_result_2}));
      }
      catch(e){
        console.log(e);
      }
  });

  yield takeEvery(`${querydevice_request}`, function*(action) {
    try{
       yield put(querydevice_result({list:jsondata_bms_mydevice}));
     }
     catch(e){
       console.log(e);
     }
    //  yield put(start_serverpush_devicegeo_sz({}));
  });

  yield takeEvery(`${searchbattery_request}`, function*(action) {
    try{
        const {payload:{query}} = action;
        const list = _.sampleSize(jsondata_bms_mydevice, 20);
        yield put(searchbattery_result({list}));
      }
      catch(e){
        console.log(e);
      }
  });


  yield takeEvery(`${searchbatteryalarm_request}`, function*(action) {
    try{
      const {payload:{query}} = action;
      let list = [];
      if(!!query){
        let warninglevel = _.get(query,'warninglevel',-1);
        if(warninglevel !== -1){
          //报警等级
          list = _.filter(jsondata_bms_alarm,(item)=>{
            return item.warninglevel === query.warninglevel;
          });
        }
        else{
          //随机生成
            list = _.sampleSize(jsondata_bms_alarm, getrandom(0,jsondata_bms_alarm.length));
        }

        let startdatestring = _.get(query,'queryalarm.startDate','');
        let enddatestring = _.get(query,'queryalarm.endDate','');
        if(startdatestring !== '' && enddatestring !== ''){
          list = _.filter(list,(item)=>{
            let waringtime = item['告警时间'];
            let match = (startdatestring <= waringtime) && (waringtime <= enddatestring);
            return match;
         });
        }
      }
      else{
        //all
        list = jsondata_bms_alarm;
      }
      yield put(searchbatteryalarm_result({list}));

    }
    catch(e){
      console.log(e);
    }
  });

  yield takeEvery(`${searchbatteryalarmsingle_request}`, function*(action) {
    try{
        const {payload:{query}} = action;
        let list = [];
        if(!!query){
           list = _.filter(jsondata_bms_alarm,(item)=>{
            return item.DeviceId === query.DeviceId;
          });

          let warninglevel = _.get(query,'queryalarm.warninglevel',-1);
          if(warninglevel != -1){
            list = _.filter(list,(item)=>{
             return item.warninglevel === warninglevel;
           });
          }

          let startdatestring = _.get(query,'queryalarm.startDate','');
          let enddatestring = _.get(query,'queryalarm.endDate','');
          if(startdatestring !== '' && enddatestring !== ''){
            list = _.filter(list,(item)=>{
              let waringtime = item['告警时间'];
              let match = (startdatestring <= waringtime) && (waringtime <= enddatestring);
              return match;
           });
          }
          // console.log(jsondata_bms_alarm);
          // console.log(`query.DeviceId:${query.DeviceId},list:${JSON.stringify(list)}`);
        }

        yield put(searchbatteryalarmsingle_result({list}));
      }
      catch(e){
        console.log(e);
      }
  });



   yield takeEvery(`${querydevicegroup_request}`, function*(action) {
       try{
      // yield put(querydevicegroup_result({list:jsondata}));
          // let groups = [];
          // if(config.softmode === 'pc'){
          //   _.map(jsondataprovinces,(v,index)=>{
          //     groups.push({
          //       _id:`${v.code}`,
          //       name:`${v.name}`
          //     });
          //   });
          // }
          // else{
          //   _.map(jsondata_bms_groups,(v,index)=>{
          //     groups.push(v);
          //   });
          // }


          yield put(querydevicegroup_result({list:jsondata_bms_groups}));
        }
        catch(e){
          console.log(e);
        }
   });

   yield fork(function*(){
     try{
         while(!window.amapmain){
           yield call(delay,500);
         }
         yield put(notify_socket_connected(true));
       }
       catch(e){
         console.log(e);
       }

   });

   yield takeEvery(`${queryhistorytrack_request}`, function*(action) {
     try{
        const {payload} = action;
        const {query} = payload;
        const {startDate,endDate} = query;
        let mstart = moment(startDate).format('2017-07-31 HH:mm:ss');
        let mend = moment(endDate).format('2017-07-31 HH:mm:ss');
        if(mstart >= mend){
          let tmp = mstart;
          mstart = mend;
          mend = tmp;
        }
        let list = [];
        list = _.filter(jsondata_bms_track,(item)=>{
          return (item.GPSTime >= mstart) && (item.GPSTime <= mend);
        });
        yield put(queryhistorytrack_result({list:list}));
      }
      catch(e){
        console.log(e);
      }
   });

  //  模拟服务端推送消息
  yield takeEvery(`${serverpush_devicegeo_sz_request}`, function*(action) {
     try{
        let modeview = yield select((state)=>{
          return state.app.modeview;
        });
        if('device' === modeview){
            const list = _.sampleSize(jsondata_bms_mydevice, 1000);
            let items = [];
            for(let i = 0;i < list.length; i++){
              let item = {...list[i]};
              let locationsz = getRandomLocation(item.LastHistoryTrack.Latitude,item.LastHistoryTrack.Longitude,5.6);
              item.LastHistoryTrack.Latitude = locationsz[1];
              item.LastHistoryTrack.Longitude  =  locationsz[0];
              let cor = [item.LastHistoryTrack.Longitude,item.LastHistoryTrack.Latitude];
              const wgs84togcj02=coordtransform.wgs84togcj02(cor[0],cor[1]);
              item.locz = wgs84togcj02;
              items.push(item);
            };
            yield put(serverpush_devicegeo_sz_result({list:items}));
        }
      }
      catch(e){
        console.log(e);
      }
   });
}
