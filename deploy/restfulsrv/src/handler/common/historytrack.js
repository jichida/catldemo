const config = require('../../config.js');
let DBModels = require('../../db/models.js');
let mongoose  = require('mongoose');
const winston = require('../../log/log.js');

exports.queryhistorytrack = (actiondata,ctx,callback)=>{
  //let HistoryTrackModel =mongoose.model('historytrack',  HistoryTrackSchema);
  let historytrackModel = DBModels.HistoryTrackModel;
  let query = actiondata.query || {};
  historytrackModel.find(query,(err,list)=>{
    if(!err){
      callback({
        cmd:'queryhistorytrack_result',
        payload:{list}
      });
    }
    else{
      callback({
        cmd:'common_err',
        payload:{errmsg:err.message,type:'queryhistorytrack'}
      });
    }
  });
}
