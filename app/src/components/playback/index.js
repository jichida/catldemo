/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import {grey900} from 'material-ui/styles/colors';
import DatePicker from 'react-mobile-datepicker';
import NavBar from "../tools/nav.js";
import Map from './map';
import "./map.css";
import {mapplayback_start,mapplayback_end} from '../../actions';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Searchimg from '../../img/13.png';
import Searchimg2 from '../../img/15.png';
import Car from '../../img/5.png';
import Footer from "../index/footer.js";
import Seltime from "../tools/seltime.js";
import { Button } from 'antd';
import moment from 'moment';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            isOpen: false,
            seltype : 0,
            starttime : '',
            endtime : '',
            deviceid : '',
            mindata : new Date(1970, 0, 1),
            showset : false,
        };
    }
    onClickStart(){
        const {mapseldeviceid,g_devicesdb} = this.props;
        // const {startDate,endDate} = this.state;
        this.props.dispatch(mapplayback_start({isloop:false,speed:5000,query:{}}));
        this.showset();
    }
    onClickEnd(){
        this.showset();
        this.props.dispatch(mapplayback_end({}));

    }
    
    handleClick = (v) => {
        this.setState({ 
            isOpen: true, 
            seltype : v
        });
        if(v===1){
            if(this.state.starttime!==''){
                this.setState({ 
                    mindata: new Date(this.state.starttime)
                });
            }
        }else{
            this.setState({ 
                mindata: new Date(1970, 0, 1) 
            });
        }
    }
    handleCancel = () => {
        this.setState({ isOpen: false });

    }
    showset =()=>{
        this.setState({ 
            showset: !this.state.showset
        });
    }
    handleSelect = (time) => {
        const t = moment(time).format("YYYY-MM-DD, H:mm");
        if(this.state.seltype===0){
            this.setState({ starttime: t, isOpen: false });
        }
        if(this.state.seltype===1){

            this.setState({ endtime: t, isOpen: false });
        }
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
        const height = window.innerHeight-(66+58);
        return (
            <div className="playbackPage AppPage"
                style={{height : `${window.innerHeight}px`,overflow: "hidden",paddingBottom:"0"}}
                >
                <div className="navhead">
                    <span className="title" style={{paddingLeft : "30px"}}>轨迹回放</span>
                    <a className="searchlnk" onClick={this.showset}>
                        <img src={Searchimg} /></a>
                </div>
                {
                    this.state.showset && 
                    <div className="set seltimewamp">
                        <div className="deviceinfo">
                            <img src={Car} />
                            <span>车辆信息</span>
                            <span><input name='deviceinfo' placeholder={"请输入设备ID"} /></span>
                        </div>
                        <div className="seltimecontent" onClick={this.handleClick.bind(this, 0)}>
                            <img src={Searchimg2} />
                            <span>{ this.state.starttime!==''? this.state.starttime : "起始时间"}</span>
                        </div>
                        <div className="seltimecontent" onClick={this.handleClick.bind(this, 1)}>
                            <img src={Searchimg2} />
                            <span>{ this.state.endtime!==''? this.state.endtime : "结束时间"}</span>
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
                }
                
                <Map height={height}/>
                <Footer sel={4} />
                <DatePicker
                    value={this.state.time}
                    isOpen={this.state.isOpen}
                    onSelect={this.handleSelect}
                    onCancel={this.handleCancel}
                    min={this.state.mindata}
                    max={new Date()}
                    showFormat='YYYY/MM/DD/hh/mm'
                    dateFormat={['YYYY年', 'MM月', 'DD日', 'hh时', 'mm分']} />
            </div>
        );
    }
}
const mapStateToProps = ({device:{mapseldeviceid,devices}}) => {
  return {mapseldeviceid,devices};
}
export default connect(mapStateToProps)(Page);
