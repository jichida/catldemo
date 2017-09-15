import {takeEvery,put,fork,call,select,take} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {
  ui_btnclick_deviceonline,
  ui_btnclick_deviceoffline,
  ui_btnclick_alaramall,
  ui_btnclick_alaramred,
  ui_btnclick_alaramorange,
  ui_btnclick_alaramyellow,

  ui_menuclick_settings,
  ui_menuclick_logout,

  searchbatteryalarm_request,
  searchbatteryalarm_result
}from '../actions';
import { push } from 'react-router-redux';

export function* uiflow(){//仅执行一次
  yield takeEvery(`${ui_btnclick_deviceonline}`, function*(action) {
    console.log(`点击在线`);
  });

  yield takeEvery(`${ui_btnclick_deviceoffline}`, function*(action) {
    console.log(`点击在线`);
  });

  yield takeEvery(`${ui_btnclick_alaramall}`, function*(action) {
    yield put(searchbatteryalarm_request({}));
    console.log(`点击所有告警`);
    yield put(push('/message'));
  });

  yield takeEvery(`${ui_btnclick_alaramred}`, function*(action) {
    yield put(searchbatteryalarm_request({
      query:{
        warninglevel:0
      }
    }));
    console.log(`点击红色告警`);
    yield take(`${searchbatteryalarm_result}`);
    yield put(push('/message'));
  });

  yield takeEvery(`${ui_btnclick_alaramorange}`, function*(action) {
    yield put(searchbatteryalarm_request({
      query:{
        warninglevel:1
      }
    }));
    console.log(`点击橙色告警`);
    yield take(`${searchbatteryalarm_result}`);
    yield put(push('/message'));
  });

  yield takeEvery(`${ui_btnclick_alaramyellow}`, function*(action) {
    yield put(searchbatteryalarm_request({
      query:{
        warninglevel:2
      }
    }));
    console.log(`点击黄色告警`);
    yield take(`${searchbatteryalarm_result}`);
    yield put(push('/message'));
  });

  yield takeEvery(`${ui_menuclick_settings}`, function*(action) {
    console.log(`点击设置`);
  });

  yield takeEvery(`${ui_menuclick_logout}`, function*(action) {
    console.log(`点击注销`);
  });

}
