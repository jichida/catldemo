/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import _ from 'lodash';
import {ui_selworkorder} from '../../actions';


class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pics:[],
        };
    }

    componentWillMount(){
      const {workorders} = this.props;
      let data = workorders[this.props.match.params.workid];
      if(!!data){
        this.setState({
          pics:data.pics || []
        });
      }
    }

    pointdevice =(id)=>{
        console.log(id);
        //定位设备
        this.props.dispatch(ui_selworkorder(id));
    }

    render() {
        const {workorders} = this.props;
        const {pics} = this.state;
        let data = workorders[this.props.match.params.workid];
        const colorred = {color: "#C00"};
        let title = data.isdone?`已处理工单:${data._id}`:`待处理工单:${data._id}`
        return (
            <div className="indexPage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    minHeight : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a className="back" onClick={()=>{this.props.history.goBack()}}></a>
                    <span className="title" style={{paddingLeft : "34px"}}>{title}</span>
                    <a onClick={this.pointdevice.bind(this, data.DeviceId)} style={{color : "#FFF", fontSize: "16px"}}>定位设备</a>
                </div>
                <div className="workerorderinfo">
                    <ul>
                        <li><span>车牌：{data['车牌']} </span><span>派单时间：{data['派单时间']}</span></li>
                        <li><span>项目：{data['项目']}</span><span>故障类型：{data['故障类型']}</span></li>
                        <li><span>电池厂商：{data['电池厂商']}</span></li>
                        <li><span className="full">工单来源：{data['工单来源']}</span></li>
                        <li><span>电机厂商：{data['电机厂商']}</span><span>单号：{data['单号']}</span></li>
                        <li><span>联系人：{data['联系人']}</span><span>联系方式：{data['联系方式']}</span></li>
                        <li><span className="full">当前位置：{data['当前位置']}</span></li>
                        <li><span className="full">故障描述：{data['故障描述']}</span></li>
                        <li><span className="full">备注：{data['备注']}</span></li>
                    </ul>
                    <div className="tit">维修反馈</div>
                    <div className="infoimg">
                        {
                          !data.isdone ? <div>已完成</div>:null
                        }
                        {
                          data.isdone ? <div>这里显示照片列表:{`${JSON.stringify(pics)}`},点击放大 </div>:null
                        }
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = ({workorder}) => {
  const {workorders} = workorder;
  return {workorders};
}
export default connect(mapStateToProps)(Page);
