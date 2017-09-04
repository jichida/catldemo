import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './node.js';
import _ from 'lodash';
import NodeArray from './nodearray.js';

class NodeRenderChildren extends React.Component {
    renderLoading(decorators) {
        const {style} = this.props;

        return (
            <ul style={style.subtree}>
                <li>
                    <decorators.Loading style={style.loading}/>
                </li>
            </ul>
        );
    }

    getsplitarray =(children)=>{
      let retchildren = [];
      let splitsz = _.chunk(children,80);
      if(splitsz.length > 1){
        let firstsz = _.flattenDeep(splitsz[0]);
        let lastsz = [];
        retchildren = [...firstsz];
        if(splitsz.length > 2){
           lastsz = _.flattenDeep(splitsz[splitsz.length-1]);
           for(let i=1;i<splitsz.length-2;i++){
             retchildren.push(splitsz[i]);
           }
           retchildren = [...retchildren,...lastsz];
        }
        else{
          retchildren = [...retchildren,splitsz[1]];
        }
      }
      else{
        retchildren = [...children];
      }
      //
      //
      //
      //if(children.length > 100){
        //
        // 目标===>${JSON.stringify(retchildren)}`);
      //}
      return retchildren;
    }
    render() {
        const {animations, decorators: propDecorators, node, style,
          _eventBubbles,treeviewstyle} = this.props;
        if (node.loading) {
            return this.renderLoading(propDecorators);
        }

        let children = node.children;
        if (!_.isArray(children)) {
            children = children ? [children] : [];
        }
        let retchildren = (node.type==='group_area' || node.type==='group_leaf')?this.getsplitarray(children):children;

        return (
            <ul style={style.subtree}
                ref={ref => this.subtreeRef = ref}>
                {
                  _.map(retchildren,(child,index)=>{
                    if(_.isArray(child)){
                      //
                      return (<NodeArray subnodes={child}
                          treeviewstyle={treeviewstyle}
                          {..._eventBubbles}
                          animations={animations}
                          decorators={propDecorators}
                          key={child.id || index}
                          style={style}
                      />);
                    }
                    else{
                      return (<TreeNode {..._eventBubbles}
                                    animations={animations}
                                    decorators={propDecorators}
                                    key={child.id || index}
                                    node={child}
                                    style={style}
                                    treeviewstyle={treeviewstyle}
                                />);
                    }
                  })
                }
            </ul>
        );
    }
}

NodeRenderChildren.propTypes = {
    decorators: PropTypes.object.isRequired,
    animations: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
    _eventBubbles: PropTypes.object
};

export default NodeRenderChildren;
