/**
 * Created by jiaowenhui on 2017/7/28.
    底部点击展开菜单栏
 */
import React from 'react';

class Page extends React.Component {
    render(){

        return (
            <div className="warningPage" style={{height : window.innerHeight+"px"}}>

                <div className="appbar">
                    <i className="fa fa-angle-left back" aria-hidden="true" onClick={()=>{this.props.history.goBack()}}></i>
                    <div className="title">统计分析</div>
                </div>
                <iframe src="http://www.baidu.com" style={{width:"100%",height: "100%"}}></iframe>
            </div>

        );
    }
}
export default Page;
