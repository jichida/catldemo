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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Searchimg from '../../img/13.png';
import Searchimg2 from '../../img/14.png';
import Searchimg3 from '../../img/15.png';
import Footer from "../index/footer.js";
import Datalist from "./datalist";
import MapPage from '../admincontent';
import {searchbatteryalarm_request} from '../../actions';


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showdata : false,
            seltype : 0
        };
    }
    onClickSearch(){
      this.setState({showdata: false});
      let v = this.state.seltype;
      let query = {};
      if(v === 0){
        query.isreaded = false;
      }
      else if(v === 1){
        query.isreaded = true;
      }
      this.props.dispatch(searchbatteryalarm_request({query}));
    }
    seltype=(v)=>{
        this.setState({seltype : v});
        let query = {};
        if(v === 0){
          query.isreaded = false;
        }
        else if(v === 1){
          query.isreaded = true;
        }
        this.props.dispatch(searchbatteryalarm_request({query}));
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

                    <span className="title" style={{paddingLeft : "30px"}}>预警信息</span>
                    <a className="searchlnk" onClick={()=>{this.setState({showdata: !this.state.showdata})}} ><img src={Searchimg} /></a>

                </div>
                {
                    this.state.showdata &&
                    <div className="set">
                        <div className="title">告警车辆搜索</div>
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
                                onTouchTap={this.onClickSearch.bind(this)
                                }
                                label="搜索"
                                backgroundColor={"#5cbeaa"}
                                labelStyle={{fontSize: "16px",color : "#FFF"}}
                                style={{ margin: "0 15px 20px 15px", width: "auto"}}
                                />
                        </div>
                    </div>
                }
                <div className="workordernav">
                    <span className={this.state.seltype===0?"sel":""} onClick={this.seltype.bind(this,0)}>未读报警</span>
                    <span className={this.state.seltype===1?"sel":""} onClick={this.seltype.bind(this,1)}>已读报警</span>
                    <span className={this.state.seltype===2?"sel":""} onClick={this.seltype.bind(this,2)}>所有报警</span>
                </div>
                <Datalist seltype={this.state.seltype} tableheight={window.innerHeight-58-116}/>
                <Footer sel={1} />
            </div>
        );
    }
}
const mapStateToProps = ({device:{mapseldeviceid,devices}}) => {
  return {mapseldeviceid,devices};
}
export default connect(mapStateToProps)(Page);
