/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import './index.css';
import Avatar from "../../img/2.png";
import Userlnk from "../../img/11.png";
import Setting from "../../img/12.png";
import Footer from "./footer.js";
import Collectiondevice from "../collectiondevice";
import MapPage from '../admincontent';
import {ui_index_selstatus} from '../../actions';


class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerWidth : window.innerWidth,
        };
    }
    indexnavclick=(v)=>{
        this.props.dispatch(ui_index_selstatus(v));
        console.log(v);
        //this.setState({selstatus : v});
    }
    render() {
        const {showmenu,showhistoryplay,showdistcluster,showhugepoints,p} = this.props;
        const pushurl = (name)=>{
            this.props.history.push(name);
        }
        const height =  window.innerHeight - 67.08- 65- 52;
        return (
            <div className="indexPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">

                    <div className="headsearch">
                        <input name="search" placeholder="搜索车辆ID" />
                    </div>
                    <a className="userlnk" onClick={()=>{this.props.history.push("/usercenter")}}><img src={Userlnk} /></a>
                </div>
                <div className="indexnav">
                    <span className={this.props.selstatus===0?"sel":''} onClick={this.indexnavclick.bind(this,0)}>所有车辆</span>
                    <span className={this.props.selstatus===1?"sel":''} onClick={this.indexnavclick.bind(this,1)}>我的收藏</span>
                </div>
                {
                    this.props.selstatus===0 &&
                        <div className="content">
                            <MapPage height={height}/>
                        </div>
                }
                {
                    this.props.selstatus===1 &&
                        <Collectiondevice />
                }
                <Footer sel={0} />
            </div>
        );
    }
}

const mapStateToProps = ({app}) => {
    return {selstatus:app.selstatus};
}
export default connect(mapStateToProps)(Page);
