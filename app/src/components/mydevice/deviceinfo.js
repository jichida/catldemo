/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Devicestar from "../../img/16.png";
import Moresetting from "../../img/17.png";
import Searchimg from '../../img/13.png';
import Footer from "../index/footer.js";
import {ui_sel_tabindex} from '../../actions';
import { Button } from 'antd';
import {
    ui_index_addcollection,
    ui_index_unaddcollection
} from '../../actions';

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showtype : 0
        };
    }

    render() {
        const {carcollections,g_devicesdb} = this.props;
        let deviceid = this.props.match.params.deviceid;
        let isincollections = false;
        _.map(carcollections,(id)=>{
            if(id === deviceid){
                isincollections = true;
            }
        });
        const datadevice = {

            "基本信息" :[ {
                    name:'采集时间',
                    value: "2017-09-13 18:16:57",
                },
                {
                    name:'车速(km/h)',
                    value: "14.0",
                },
                {
                  name:'驱动有效',
                  value: "驱动有效",
                },
                {
                  name:'制动有效',
                  value: "制动有效",
                },
                {
                  name:'里程(km)',
                  value: "27196",
                },
                {
                  name:'空调温度(℃)',
                  value: "23",
                },
                {
                  name:'档位',
                  value: "自动档/D",
                },
                {
                  name:'加速踏板行程值(%)',
                  value: "缺省值",
                },
                {
                  name:'充放电状态',
                  value: "放电",
                },
                {
                  name:'驱动电机控制器温度(℃)',
                  value: "51",
                },
                {
                  name:'驱动电机转速(r/min)',
                  value: "991",
                },
                {
                  name:'驱动电机温度(℃)',
                  value: "49",
                },
                {
                  name:'电机控制器输入电压',
                  value: "371.0",
                },
                {
                  name:'电机控制器直流母线电流',
                  value: "-7.0",
                },

                {
                  name:'定位状态',
                  value: "有效定位",
                },
                {
                  name:'纬度信息',
                  value: "北纬",
                },
                {
                  name:'经度信息',
                  value: "东经",
                },
                {
                  name:'经度',
                  value: "118.159387",
                },
                {
                  name:'纬度',
                  value: "24.499292",
                },
                {
                  name:'GPS速度(km/h)',
                  value: " 14.0",
                },
                {
                  name:'方向',
                  value: " 西偏北 76.0°",
                },
            ],
            "车辆状态" : [
                {
                  name:'动力系统就绪',
                  value: "活跃亮灯",
                },
                {
                  name:'紧急下电请求',
                  value: "正常",
                },
                {
                  name:'电池均衡激活',
                  value: "无均衡",
                }
          ],

          "电池类信息" : [

              {
                  name:'总电压(V)',
                  value: "374.0",
              },
              {
                  name:'SOC(%)',
                  value: "76.0",
              },
              {
                  name:'总电流(A)',
                  value: "-5.4",
              },
              {
                  name:'电池绝缘电阻(KΩ)',
                  value: "3015",
              },
          ],
          "GPS信息" : [
              {
                  name:'最高电压动力蓄电池包序号',
                  value: "1",
              },
              {
                  name:'最高电压单体蓄电池序号',
                  value: "93",
              },
              {
                  name:'电池单体最高电压值(V)',
                  value: "3.870",
              },
              {
                  name:'最低电压动力蓄电池包序号',
                  value: "1",
              },
              {
                  name:'最低电压单体蓄电池序号',
                  value: "82",
              },


              {
                  name:'电池单体最低电压值(V):',
                  value: "3.830",
              },
              {
                  name:'最高温度动力蓄电池包序号',
                  value: "1",
              },
              {
                  name:'最高温度探针序号',
                  value: "1",
              },
              {
                  name:'最高温度值(℃)',
                  value: "39",
              },
              {
                  name:'最低温度动力蓄电池包序号',
                  value: "1",
              },
              {
                  name:'最低温度探针序号',
                  value: "4",
              },


              {
                  name:'最低温度值(℃)',
                  value: "37",
              },
              {
                  name:'剩余能量(KW*h)',
                  value: "30.2",
              },
              {
                  name:'最高电压电池总数',
                  value: "0",
              },
              {
                  name:'最低电压电池总数',
                  value: "0",
              },
              {
                  name:'最高温度探针总数',
                  value: "3",
              },
              {
                  name:'最低温度探针总数',
                  value: "13",
              },
              {
                  name:'单体蓄电池总数',
                  value: "97",
              },
              {
                  name:'动力蓄电池包总数(单体)',
                  value: "1",
              },
              {
                  name:'温度探针总数',
                  value: "34",
              },
              {
                  name:'动力蓄电池包总数(动力)',
                  value: "1",
              },


            ]
        };
        return (
            <div className="mydevicePage AppPage"
                style={{
                    backgroundSize: "100% 100%",
                    height : `${window.innerHeight}px`
                }}>
                <div className="navhead">
                    <a onClick={()=>{this.props.history.goBack()}} className="back"></a>
                    <span className="title" style={{paddingRight : "30px"}}>车辆详情</span>
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
                        {!isincollections &&
                        <Button type="primary" icon="star" onClick={()=>{
                            this.props.dispatch(ui_index_addcollection(deviceid));
                          }
                        }>收藏车辆</Button>}
                        {isincollections &&
                        <Button type="primary" icon="star" onClick={()=>{
                            this.props.dispatch(ui_index_unaddcollection(deviceid));
                          }
                        }>取消收藏</Button>}
                        <Button icon="play-circle-o" style={{background : "#5cbeaa", color: "#FFF"}}
                           onClick={
                             ()=>{
                               console.log("轨迹回放");
                               this.props.dispatch(ui_sel_tabindex(4));
                               this.props.history.replace('/playback');
                             }
                         }>轨迹回放</Button>
                    </div>
            </div>
        );
    }
}

const mapStateToProps = ({device}) => {
    const {carcollections,g_devicesdb} = device;
    return {carcollections,g_devicesdb};
}

export default connect(mapStateToProps)(Page);
