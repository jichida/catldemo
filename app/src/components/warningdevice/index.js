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
                    <span className="title" style={{paddingLeft : "30px"}}>预警信息</span>
                    <a className="searchlnk" onClick={()=>{this.setState({showdata: false})}} ><img src={Searchimg} /></a>
                </div>
                <div className="set">

                    <div className="title">告警设备搜索</div>
                    { 
                        !this.state.showdata &&
                        <div className="formlist">
                            <div className="li">
                                <img src={Searchimg2} width={30} />
                                <SelectField value={0} fullWidth={true} style={{flexGrow: "1",marginLeft: "10px"}}>
                                    <MenuItem value={0} primaryText="告警等级" />
                                    <MenuItem value={10} primaryText="一级预警" />
                                    <MenuItem value={20} primaryText="二级预警" />
                                    <MenuItem value={30} primaryText="三级预警" />
                                </SelectField>
                            </div>
                            <div className="li">
                                <img src={Searchimg3} width={30} />
                                <DatePicker hintText="开始时间" style={{flexGrow: "1",marginLeft: "10px", marginBottom: "10px"}} textFieldStyle={textFieldStyle}/>
                            </div>
                            <RaisedButton 
                                onTouchTap={()=>{this.setState({showdata: !this.state.showdata})}} 
                                label="搜索" 
                                backgroundColor={"#5cbeaa"} 
                                labelStyle={{fontSize: "16px",color : "#FFF"}} 
                                style={{ margin: "0 15px 20px 15px", width: "auto"}}
                                />
                        </div>
                    }

                </div>
                { this.state.showdata && <Datalist /> }
                { !this.state.showdata && <div style={{flexGrow:1}}>这里是地图</div> }
                <Footer sel={1} />  
            </div>
        );
    }
}
const mapStateToProps = ({device:{mapseldeviceid,devices}}) => {
  return {mapseldeviceid,devices};
}
export default connect(mapStateToProps)(Page);