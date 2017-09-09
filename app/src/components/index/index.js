/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import Avatar from "../../img/2.png"; 
import Userlnk from "../../img/11.png";
import Setting from "../../img/12.png";
import Mydevice from "../mydevice";
import Footer from "./footer.js";

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
            selstatus : 0
        };
    }
    indexnavclick=(v)=>{
        console.log(v);
        this.setState({selstatus : v});
    }
    render() {
        const {showmenu,showhistoryplay,showdistcluster,showhugepoints,p} = this.props;
        const pushurl = (name)=>{
            this.props.history.push(name);
        }
        return (
            <div className="indexPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a className="userlnk"><img src={Userlnk} /></a>
                    <div className="headsearch">
                        <input name="search" placeholder="搜索设备ID" />
                    </div>
                    <a className="setting"><img src={Setting} /></a>
                </div>
                <div className="indexnav">
                    <span className={this.state.selstatus===0?"sel":''} onClick={this.indexnavclick.bind(this,0)}>所有设备</span>
                    <span className={this.state.selstatus===1?"sel":''} onClick={this.indexnavclick.bind(this,1)}>我的收藏</span>
                </div>
                {
                    this.state.selstatus===0 &&
                        <div className="content">
                            这里是地图部分
                        </div>
                }
                {
                    this.state.selstatus===1 &&
                        <Mydevice />
                }
                <Footer sel={0} />
            </div>
        );
    }
}
export default connect()(Page);
