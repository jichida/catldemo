import { fork } from 'redux-saga/effects';
import {apiflow} from './api';
import {createsagacallbackflow} from './sagacallback';

import {wsrecvsagaflow} from './wsrecvsaga';
import {jpushflow} from './jpushflow';

import {createloadingflow} from './loading';
import {createmapmainflow} from './mapmain';
import {createmaptrackhistoryplaybackflow} from './mapplayback';
import {socketflow} from './socketflow';
import {uiflow} from './ui';


export default function* rootSaga() {
  try{

    yield fork(socketflow);
    yield fork(createmapmainflow);
    yield fork(createmaptrackhistoryplaybackflow);
    yield fork(createloadingflow);
    yield fork(uiflow);
    yield fork(wsrecvsagaflow);

    yield fork(createsagacallbackflow);

    yield fork(apiflow);
  }
  catch(e){

  }

}
