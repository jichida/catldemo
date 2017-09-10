/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Devicestar from "../../img/16.png";
import Moresetting from "../../img/17.png";
import Footer from "../index/footer.js";
import Datalist from "./datalist";




class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtype : 0
        };
    }
    
    render() {
        
        return (
            <div className="mydevicePage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <div className="navlist">
                        <span className={this.state.showtype==0?"sel":""} onClick={()=>{this.setState({showtype: 0})}}>地图模式</span>
                        <span className={this.state.showtype==1?"sel":""} onClick={()=>{this.setState({showtype: 1})}}>列表模式</span>
                    </div>
                    <a className="moresetting"><img src={Moresetting} width="30" /></a>
                </div>
                <div className="searchcontent"><input name="searchinput" placeholder="搜索设备ID" /></div>
                <div className="mydevicecontent">
                    {   
                        this.state.showtype===0 &&
                        <div className="mapcontent">地图控件</div>
                    }
                    {
                        this.state.showtype===1 &&
                        <div className="mydevicecontentlist">
                            <div className="devicenum"><span>联网车辆：10辆</span><span className='c'>运行车辆：10辆</span><span>故障车辆：10辆</span></div>
                            <Datalist />
                        </div>
                    }
                </div>
                <Footer sel={2} />
            </div>
        );
    }
}

export default connect()(Page);
