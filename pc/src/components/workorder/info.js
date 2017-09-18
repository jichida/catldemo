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


            <div className="warningPage devicePage deviceinfoPage" style={{height : window.innerHeight+"px"}}>

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.goBack()}}></i>
                    <div className="title">{title}</div>
                    <div className="devicebtnlist">
                        <Button type="primary" icon="environment" onClick={this.pointdevice.bind(this, data.DeviceId)}>定位设备</Button>    
                    </div>
                </div>
                <div className="lists deviceinfolist"
                    style={{
                        flexGrow: 1,
                        overflowY: "scroll"
                    }}
                    >
                    {
                        _.map(data,(item,i)=>{
                            return (
                                <div className="li" key={i}>
                                    <div>
                                        <div className="name">{i}</div><div className="text">{item}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
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
