/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Devicestar from "../../img/16.png";

class Page extends React.Component {
    
    render() {

        const data = [{name : "设备1"},{name : "设备2"}]
        
        return (
            <div className="mydevicelist">
                {
                    _.map(data, (d, i)=>{
                        return (
                            <div className="li" key={i}><img src={Devicestar} />{d.name}</div>
                        )
                    })
                }<div></div>
            </div>
        );
    }
}

export default connect()(Page);
