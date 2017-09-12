/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import {grey900} from 'material-ui/styles/colors';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import NavBar from "../tools/nav.js";
import Map from './map';
import "./map.css";
import {mapplayback_start} from '../../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Searchimg from '../../img/13.png';
import Searchimg2 from '../../img/14.png';
import Searchimg3 from '../../img/15.png';
import Footer from "../index/footer.js";
import Datalist from "./datalist";
import MapPage from '../admincontent';
class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showdata : false
        };
    }
    onClickStart(){
      this.props.dispatch(mapplayback_start({isloop:false,speed:5000}));
    }
    render() {
        // const {mapseldeviceid,devices} = this.props;
        // let DeviceId;
        // let deviceitem = devices[mapseldeviceid];
        // if(!!deviceitem){
        //   DeviceId = deviceitem.DeviceId;
        // }
        const formstyle={width:"100%",flexGrow:"1"};
        const textFieldStyle={width:"100%",flexGrow:"1"};
        const height =  window.innerHeight - 65 - 209;
        return (
            <div className="playbackPage AppPage"
                style={{
                    height : `${window.innerHeight}px`,
                    overflow: "hidden",
                    paddingBottom:"0",
                }}
                >
                <div className="navhead">
                    <span className="back" onClick={()=>{this.props.history.goBack()}}></span>
                    <span className="title" style={{paddingRight : "30px"}}>预警信息</span>
                </div>
                <div className="set" style={{position: "initial"}}><div className="title">告警车辆搜索</div></div>
                <Datalist />
            </div>
        );
    }
}
const mapStateToProps = ({device:{mapseldeviceid,devices}}) => {
  return {mapseldeviceid,devices};
}
export default connect(mapStateToProps)(Page);
