/**
 * Created by wangxiaoqing on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import {map_setmapinited} from '../actions';
import { Route,Redirect,Switch} from 'react-router-dom';
import AdminContent from "./admincontent";
import Index from './index';
import Datatable from './datatable/index.js';
import Message from './message.js';
import Device from './device.js';
import Deviceinfo from './deviceinfo.js';
import Chargingpileinfo from './chargingpileinfo.js';
import Devicemessage from './devicemessage.js';
import Historyplay from './historytrackplayback';
import Chartlist from './chartlist';
import Workorder from './workorder';

import Login from './login/login.js';
import MapPage from './admincontent';
import WeuiTool from './tools/weuitool';

import Alaraminfo from './alarm/alarminfo';
import Workorderinfo from './workorder/info';


import {requireAuthentication} from './requireauthentication';
import { carmapshow_createmap, carmapshow_destorymap} from '../actions';
import "../css/common.css";

class AppRoot extends React.Component {
    componentWillMount() {
        const script = document.createElement("script");
        script.src = "http://webapi.amap.com/maps?v=1.3&key=788e08def03f95c670944fe2c78fa76f&callback=init&&plugin=AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar,AMap.Driving";
        script.async = true;
        window.init = ()=>{
              const scriptui = document.createElement("script");
              scriptui.src = "http://webapi.amap.com/ui/1.0/main.js?v=1.0.10";
              scriptui.async = true;
              document.body.appendChild(scriptui);
              scriptui.onload = ()=>{
                 window.initamaploaded = true;
                this.props.dispatch(map_setmapinited(true));
              }
        }
        document.body.appendChild(script);
    }
    componentWillUnmount() {
        this.props.dispatch(map_setmapinited(false));
        window.initamaploaded = false;
    }
    render() {

        return (
            <div className="AppContainer">
                <WeuiTool />
                <Switch>
                    <Route exact path="/" component={()=>(<Redirect to="/index"/>)} />
                    <Route path="/index" component={requireAuthentication(()=>(<div></div>))} />
                    <Route path="/datatable" component={requireAuthentication(Datatable)} />
                    <Route path="/login" component={Login} />
                    <Route path="/message/:warninglevel" component={requireAuthentication(Message)} />
                    <Route path="/device" component={requireAuthentication(Device)} />
                    <Route path="/deviceinfo/:id" component={requireAuthentication(Deviceinfo)} />
                    <Route path="/chargingpileinfo/:id" component={requireAuthentication(Chargingpileinfo)} />
                    <Route path="/devicemessage/:id" component={requireAuthentication(Devicemessage)} />
                    <Route path="/historyplay/:deviceid" component={requireAuthentication(Historyplay)} />
                    <Route path="/workorder" component={requireAuthentication(Workorder)} />
                    <Route path="/chartlist/:id" component={requireAuthentication(Chartlist)} />
                    <Route path="/alarminfo/:alarmid" component={Alaraminfo} />
                    <Route path="/workorderinfo/:workid" component={Workorderinfo} />
                </Switch>
                <div>
                    <Index history={this.props.history}/>
                </div>
            </div>
        );
    }
}
export default connect()(AppRoot);
