/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Button } from 'antd';
import {
    ui_alarm_selcurdevice,
} from '../../actions';


class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount () {
    }
    render() {
        const {g_devicesdb,alarms} = this.props;
        let alarmid = this.props.match.params.alarmid;
        let curalarm =  alarms[alarmid];
        let deviceid = curalarm.DeviceId;

        const datadevice = {
            "基本信息" :[ {
                    name:'告警等级',
                    value: `${curalarm['告警等级']}`,
                },
                {
                    name:'车辆ID',
                    value: `${curalarm['车辆ID']}`,
                },
                {
                  name:'告警时间',
                  value: `${curalarm['告警时间']}`,
                },
                {
                  name:'报警信息',
                  value: `${curalarm['报警信息']}`,
                },
            ],
            "位置信息" : [
                {
                  name:'告警位置',
                  value: `${curalarm['告警位置']}`,
                },

          ],
        };
        return (
            <div className="mydevicePage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    height : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a onClick={()=>{this.props.history.goBack()}} className="back"></a>
                    <span className="title" style={{paddingRight : "30px"}}>告警详情</span>
                    <a className="moresetting"></a>
                </div>
                <div className="deviceinfocontent">
                    {
                      _.map(datadevice,(item,index)=>{

                        return (
                            <div key={index}>
                                <div className="tit">{index}</div>
                                {
                                    _.map(item,(i,k)=>{
                                        return (<div key={k} className="li"><span>{`${i.name}`}</span><span>{`${i.value}`}</span></div>);
                                    })
                                }
                            </div>
                        );
                      })
                    }
                </div>
                <div className="mydevicebtn">
                        <Button icon="play-circle-o" style={{background : "#5cbeaa", color: "#FFF"}}
                           onClick={
                             ()=>{
                               console.log("定位车辆");
                               this.props.dispatch(ui_alarm_selcurdevice(deviceid));
                             }
                         }>定位车辆</Button>

                         <Button icon="play-circle-o" style={{background : "#5cbeaa", color: "#FFF"}}
                            onClick={
                              ()=>{
                                console.log("派发工单");
                              }
                          }>派发工单</Button>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = ({device,searchresult}) => {
    const {g_devicesdb} = device;
    const {alarms} = searchresult;
    return {g_devicesdb,alarms};
}

export default connect(mapStateToProps)(Page);
