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
import Devicemessage from './devicemessage.js';
import Historyplay from './historytrackplayback';
import Chartlist from './chartlist';
import Workorder from './workorder';

import Login from './login/login.js';
import MapPage from './admincontent';
import WeuiTool from './tools/weuitool';





import {requireAuthentication} from './requireauthentication';
import { carmapshow_createmap, carmapshow_destorymap} from '../actions';
import "../css/common.css";

class AppRoot extends React.Component {
    componentWillMount() {
        this.MapPageCo = <MapPage />;
        const scriptui = document.createElement("script");
        scriptui.src = "http://webapi.amap.com/ui/1.0/main.js?v=1.0.10";
        scriptui.async = false;
        document.body.appendChild(scriptui);
        const script = document.createElement("script");
        script.src = "http://webapi.amap.com/maps?v=1.3&key=788e08def03f95c670944fe2c78fa76f&callback=init&&plugin=AMap.Geocoder,AMap.Scale,AMap.OverView,AMap.ToolBar";
        script.async = true;
        window.init = ()=>{
            window.initamaploaded = true;
            this.props.dispatch(map_setmapinited(true));
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
                    <Route path="/message" component={Message} />
                    <Route path="/device" component={Device} />
                    <Route path="/deviceinfo/:id" component={Deviceinfo} />
                    <Route path="/devicemessage/:id" component={Devicemessage} />
                    <Route path="/historyplay/:id" component={Historyplay} />
                    <Route path="/workorder" component={Workorder} />
                    <Route path="/chartlist" component={Chartlist} />
                </Switch>
                <div>
                    <Index history={this.props.history}/>
                </div>
            </div>
        );
    }
}
export default connect()(AppRoot);
