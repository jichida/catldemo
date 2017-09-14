/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import _  from "lodash";
import AdminContent from "./admincontent";
import Menu from "./menu";
import Tree from "./tree";
import Search from "./search";
import Warning from "./warning";
import Message from "./message";
import Device from "./device";
import Warningtips from "./warningtips";
import { Icon } from "antd";
import Logo from "../img/logo.png";
import {
    ui_showmenu,
    ui_showhistoryplay,
    ui_showdistcluster,
    ui_showhugepoints,
    ui_changemodeview
} from '../actions';
import translate from 'redux-polyglot/translate';
import Historytrackplayback from "./historytrackplayback";
let resizetime = null;
// this.props.dispatch(ui_showmenu(menuitemstring));

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
            openaddress : false,
            titlenav : 0
        };
    }
    componentWillMount() {
        window.onresize = ()=>{
            window.clearTimeout(resizetime);
            resizetime = window.setTimeout(()=>{
                this.setState({innerWidth: window.innerWidth});
            }, 10)
        }
    }
    //主菜单点击事件
    menuevent = () => this.props.dispatch(ui_showmenu(""));
    //显示电池包搜索
    showPowersearch =()=> this.props.dispatch(ui_showmenu("powersearch"));
    showWarningbox =()=> this.props.dispatch(ui_showmenu("warningbox"));
    showAddressbox =()=> this.props.dispatch(ui_showmenu("addressbox"));
    showMessage =()=> this.props.dispatch(ui_showmenu("showmessage"));
    showDeviceInfo =()=> this.props.dispatch(ui_showmenu("showdevice"));
    //现实历史轨迹点击时间
    showhistoryplay = () => this.props.dispatch(ui_showhistoryplay(true));
    hidehistoryplay = () => this.props.dispatch(ui_showhistoryplay(false));

    onTouchTap=()=>{

    }

    getdrawstyle=(width)=>{
        return ({
            drawopenstyle : {
                marginLeft: 0,
                order: -1,
                transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },
            drawclosestyle : {
                marginLeft: `-${width}`,
                order: -1,
                transition: 'margin 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },
        })
    }

    titleNavClick =(v)=>{
        console.log("index nav titlenav");
        this.setState({titlenav: v});
        if(v===0){
          this.props.dispatch(ui_changemodeview('device'));
        }
        else{
          this.props.dispatch(ui_changemodeview('chargingpile'));
        }
    }

    render() {
        const {showmenu,showhistoryplay,showdistcluster,showhugepoints,p,modeview} = this.props;
        const treestyle = this.getdrawstyle("400px");

        return (
            <div className="AppPage">
                <div className="content">
                    <div className="headcontent">
                        <AppBar
                            title={
                                <div className="titlenav">
                                    <span className={this.state.titlenav===0?"sel":""} onClick={this.titleNavClick.bind(this, 0)}>地图模式</span>
                                    <span className={this.state.titlenav===1?"sel":""} onClick={this.titleNavClick.bind(this, 1)}>充电桩模式</span>
                                </div>
                            }
                            onLeftIconButtonTouchTap={this.menuevent}
                            style={{
                                backgroundColor: "#FFF",
                                paddingLeft:"0",
                                height : "64px",
                                paddingRight:"0",
                            }}
                            iconStyleLeft={{
                                marginTop: "0",
                                marginLeft: "0"
                            }}
                            iconElementLeft={<div className="logo" onClick={()=>{this.props.dispatch(ui_showmenu("addressbox"))}}><img src={Logo} /></div>}
                            className="appbar"
                        />
                    </div>

                    <div className="bodycontainer">

                        <Drawer
                            open={showmenu==="addressbox" || true}
                            containerStyle={{
                                top: "64px",
                                zIndex: 1000,
                                position: "inherit"
                            }}
                            width={400}
                            style={showmenu==="addressbox"?treestyle.drawopenstyle:treestyle.drawclosestyle}
                            >
                            <Tree />

                            <span className="myclose white" onClick={this.menuevent}></span>
                        </Drawer>

                        <div className="admincontainer">
                            <AdminContent />
                        </div>


                        <div className="warningtips">
                            <Warningtips/>
                        </div>


                        <Menu lesswidth={showmenu==="addressbox"?400:100} />

                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({app:{showmenu,showhistoryplay,showdistcluster,showhugepoints,modeview}}) => {
    return {showmenu,showhistoryplay,showdistcluster,showhugepoints,modeview};
};

const DummyComponentWithPProps = translate('warningbox')(Page);
export default connect(mapStateToProps)(DummyComponentWithPProps);
