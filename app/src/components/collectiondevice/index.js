/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Devicestar from "../../img/16.png";
import { withRouter } from 'react-router-dom';

class Page extends React.Component {
    
    render() {

        const data = [{name : "车辆1"},{name : "车辆2"}]
        
        return (
            <div className="mydevicelist">
                {
                    _.map(data, (d, i)=>{
                        return (
                            <div className="li" key={i} onClick={()=>{this.props.history.push("/deviceinfo")}}><img src={Devicestar} />{d.name}</div>
                        )
                    })
                }<div></div>
            </div>
        );
    }
}

Page = withRouter(Page);
export default connect()(Page);
