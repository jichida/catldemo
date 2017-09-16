import { createReducer } from 'redux-act';
import {
  //登录
    getallworkorder_result,
    queryworkorder_result,
} from '../actions';
import _ from 'lodash';

const initial = {
  workorder:{
    curallworkorder:[],
    searchresult_workorder:[],
    workorders:{}
  },
};

const workorder = createReducer({
  [getallworkorder_result]: (state, payload) => {
    let curallworkorder =[];
    let workorders = {...state.workorders};
    const {list} = payload;
    _.map(list,(item)=>{
      curallworkorder.push(item._id);
      workorders[item._id] = item;
    });
    let searchresult_workorder = [...curallworkorder];
    return {...state,curallworkorder,searchresult_workorder,workorders};
  },
  [queryworkorder_result]: (state, payload) => {
    let searchresult_workorder =[];
    let workorders = {...state.workorders};
    const {list} = payload;
    _.map(list,(item)=>{
      searchresult_workorder.push(item._id);
      workorders[item._id] = item;
    });
    return {...state,searchresult_workorder,workorders};
  },
}, initial.workorder);

export default workorder;
