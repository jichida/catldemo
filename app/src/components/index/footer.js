/**`
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import { withRouter } from 'react-router-dom';
import Avatar from "../../img/2.png"; 
import Footer1 from "../../img/1.png";
import Footer2 from "../../img/2.png";
import Footer3 from "../../img/3.png";
import Footer4 from "../../img/4.png";
import Footer5 from "../../img/5.png";
import Footer6 from "../../img/6.png";
import Footer7 from "../../img/7.png";
import Footer8 from "../../img/8.png";
import Footer9 from "../../img/9.png";
import Footer10 from "../../img/10.png";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
        };
    }
    pushurl =(url)=>{
        this.props.history.push(url);
    }
    render() {
        const {showmenu,showhistoryplay,showdistcluster,showhugepoints,p} = this.props;
        const pushurl = (name)=>{
            this.props.history.push(name);
        }
        return (
            <div className="footerPage">
                <ul>
                    <li onClick={this.pushurl.bind(this, "/")}><img src={this.props.sel===0?Footer1:Footer2} /><span>总览</span></li>
                    <li onClick={this.pushurl.bind(this, "/warningdevice")}><img src={this.props.sel===1?Footer3:Footer4} /><span>预警信息</span></li>
                    <li onClick={this.pushurl.bind(this, "/mydevice")}><img src={this.props.sel===2?Footer5:Footer6} /><span>我的设备</span></li>
                    <li onClick={this.pushurl.bind(this, "/workorder")}><img src={this.props.sel===3?Footer7:Footer8} /><span>工单处理</span></li>
                    <li onClick={this.pushurl.bind(this, "/playback")}><img src={this.props.sel===4?Footer9:Footer10} /><span>轨迹回放</span></li>
                </ul>
            </div>
        );
    }
}
Page = withRouter(Page);
export default connect()(Page);
