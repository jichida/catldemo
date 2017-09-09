/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import {grey900} from 'material-ui/styles/colors';
import { DatePicker } from 'antd';
import NavBar from "../tools/nav.js";
import Map from './map';
import "./map.css";
import {mapplayback_start} from '../../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Searchimg from '../../img/13.png';
import Searchimg2 from '../../img/15.png';
import Footer from "../index/footer.js";
import Seltime from "../tools/seltime.js";
import { Button } from 'antd';
const { RangePicker } = DatePicker;

class Page extends React.Component {
    onClickStart(){
        this.props.dispatch(mapplayback_start({isloop:false,speed:5000}));
    }
    render() {
        const {mapseldeviceid,devices} = this.props;
        let DeviceId;
        let deviceitem = devices[mapseldeviceid];
        if(!!deviceitem){
          DeviceId = deviceitem.DeviceId;
        }
        const formstyle={width:"100%",flexGrow:"1"};
        const textFieldStyle={width:"100%",flexGrow:"1"};
        return (
            <div className="playbackPage AppPage"
                style={{height : `${window.innerHeight}px`,overflow: "hidden",paddingBottom:"0"}}
                >
                <div className="navhead">
                    <span className="title" style={{paddingLeft : "30px"}}>轨迹回放</span>
                    <a className="searchlnk"><img src={Searchimg} /></a>
                </div>
                <div className="set">
                    <div className="seltimecontent">
                        <img src={Searchimg2} />
                        <span>起始时间</span>
                    </div>
                    <div className="seltimebtn">
                        <Button style={{background: "#67bd82",color: "#FFF", marginRight:"20px"}}>开始</Button>
                        <Button style={{background: "#3a52a2",color: "#FFF"}}>结束</Button>
                    </div>
                </div>
                <Map height={window.innerHeight-(65+230+70)}/>
                <Footer sel={4} />  
            </div>
        );
    }
}
const mapStateToProps = ({device:{mapseldeviceid,devices}}) => {
  return {mapseldeviceid,devices};
}
export default connect(mapStateToProps)(Page);
