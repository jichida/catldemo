import { createReducer } from 'redux-act';
import {
  //登录
    pic_fileuploadsetpreview,
    pic_fileuploadreset,
} from '../actions';

const initial = {
  pic:{
    previewVisible: false,
    previewImage: '',
    fileList: [],
  },
};

const pic = createReducer({
  [pic_fileuploadsetpreview]: (state, payload) => {
      let newstate = state;
      if(payload.hasOwnProperty('previewVisible')){
          newstate =  { ...newstate, previewVisible:payload.previewVisible};
      }
      if(payload.hasOwnProperty('previewImage')){
          newstate =  { ...newstate, previewImage:payload.previewImage};
      }
      if(payload.hasOwnProperty('fileList')){
          newstate =  { ...newstate,fileList:[...payload.fileList]};
      }
      return newstate;
  },
  [pic_fileuploadreset]: (state, payload) => {
      return {...initial.pic};
  }
}, initial.pic);

export default pic;
