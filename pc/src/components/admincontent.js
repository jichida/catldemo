/**
 * Created by jiaowenhui on 2017/3/15.
 */
import React from 'react';
import { connect } from 'react-redux';
import {
    carmapshow_createmap,
    carmapshow_destorymap,
} from '../actions';
const divmapid = 'mapmain';
class MapPage extends React.Component {
    componentWillMount () {

    }
    componentWillUnmount(){

        this.props.dispatch(carmapshow_destorymap({divmapid}));
    }
    componentDidMount () {

        this.props.dispatch(carmapshow_createmap({divmapid}));
    }
    render() {
        const height = this.props.height || window.innerHeight-64;

        return (
            <div className="AdminContent">
                <div id={divmapid} style={{height:`${height}px`}}/>
            </div>
        );
    }
}
export default connect()(MapPage);