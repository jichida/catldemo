import { createReducer } from 'redux-act';
import {
  querydevicehistory_request,
  querydevicehistory_result,
} from '../actions';
import map from 'lodash.map';

const initial = {
  devicedatahistory:{
    devicehistorylist:[],
    devicehistorys:{}
  },
};

const devicedatahistory = createReducer({
  [querydevicehistory_request]:(state,payload)=>{
    const devicehistorylist = [];
    const devicehistorys = {};
    return { ...state, devicehistorylist,devicehistorys};
  },
  [querydevicehistory_result]:(state,payload)=>{
    let devicehistorylist =[];
    let devicehistorys = {...state.devicehistorys};
    const {list} = payload;
    map(list,(record)=>{
      devicehistorylist.push(record._id);
      devicehistorys[record._id] = record;
    });
    return { ...state, devicehistorylist,devicehistorys};
  },
}, initial.devicedatahistory);

export default devicedatahistory;
