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
import {mapplayback_start,mapplayback_end} from '../../actions';
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
    const {mapseldeviceid,g_devicesdb} = this.props;
    // const {startDate,endDate} = this.state;
    this.props.dispatch(mapplayback_start({isloop:false,speed:5000,query:{}}));
  }
  onClickEnd(){
    this.props.dispatch(mapplayback_end({}));
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
        const height = window.innerHeight-(66+58+122);
        return (
            <div className="playbackPage AppPage"
                style={{height : `${window.innerHeight}px`,overflow: "hidden",paddingBottom:"0"}}
                >
                <div className="navhead">
                    <span className="title" style={{paddingLeft : "30px"}}>轨迹回放</span>
                    <a className="searchlnk"><img src={Searchimg} /></a>
                </div>
                <div className="set seltimewamp">
                    <div className="seltimecontent">
                        <img src={Searchimg2} />
                        <span>起始时间</span>
                    </div>
                    <div className="seltimebtn">
                        <RaisedButton label="开始" 
                            backgroundColor={"#67bd82"} labelColor={"#FFF"} 
                            onClick={this.onClickStart.bind(this)}
                            buttonStyle={{width:"100px",height : "30px", lineHeight : "30px"}}
                            />
                        <RaisedButton label="结束" 
                            backgroundColor={"#3a52a2"} labelColor={"#FFF"} 
                            onClick={this.onClickEnd.bind(this)} 
                            style={{marginLeft: "30px"}}
                            buttonStyle={{width:"100px",height : "30px", lineHeight : "30px"}}
                            />
                    </div>
                </div>
                <Map height={height}/>
                <Footer sel={4} />
            </div>
        );
    }
}
const mapStateToProps = ({device:{mapseldeviceid,devices}}) => {
  return {mapseldeviceid,devices};
}
export default connect(mapStateToProps)(Page);
