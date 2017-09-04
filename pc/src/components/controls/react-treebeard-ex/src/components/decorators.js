'use strict';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Radium from 'radium';
import {VelocityComponent} from 'velocity-react';

const Loading = ({style}) => {
    return <div style={style}>loading...</div>;
};
Loading.propTypes = {
    style: PropTypes.object
};

const Toggle = ({style}) => {
    const {height, width} = style;
    const midHeight = height * 0.5;
    const points = `0,0 0,${height} ${width},${midHeight}`;

    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon points={points}
                             style={style.arrow}/>
                </svg>
            </div>
        </div>
    );
};
Toggle.propTypes = {
    style: PropTypes.object
};

let Header = ({node, style,gmap_acode_treename,gmap_acode_treecount,treeviewstyle}) => {
    let title = node.name || '';
    if(node.type !== 'device'){
      if(treeviewstyle === 'byloc'){
        const name = gmap_acode_treename[node.adcode];
        title = `${name}`;
        const count = gmap_acode_treecount[node.adcode];
        if(!!count){
          title = `${name}(${count})`;
        }
      }
    }

    return (
        <div style={style.base}>
            <div style={style.title}>
                {title}
            </div>
        </div>
    );
};
Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired
};
const mapStateToProps = ({device:{gmap_acode_treename,gmap_acode_treecount}}) => {
  return {gmap_acode_treename,gmap_acode_treecount};
}
Header = connect(mapStateToProps)(Header);

// @Radium
class Container extends React.Component {
    render() {
        const {style, decorators, terminal, onClick, node,treeviewstyle} = this.props;

        return (
            <div onClick={onClick}
                 ref={ref => this.clickableRef = ref}
                 style={style.container}>
                {!terminal ? this.renderToggle() : null}

                <decorators.Header node={node}
                                   style={style.header}
                                 treeviewstyle={treeviewstyle}/>
            </div>
        );
    }

    renderToggle() {
        const {animations} = this.props;

        if (!animations) {
            return this.renderToggleDecorator();
        }

        return (
            <VelocityComponent animation={animations.toggle.animation}
                               duration={animations.toggle.duration}
                               ref={ref => this.velocityRef = ref}>
                {this.renderToggleDecorator()}
            </VelocityComponent>
        );
    }

    renderToggleDecorator() {
        const {style, decorators} = this.props;

        return <decorators.Toggle style={style.toggle}/>;
    }
}
Container.propTypes = {
    style: PropTypes.object.isRequired,
    decorators: PropTypes.object.isRequired,
    terminal: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    animations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]).isRequired,
    node: PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    Container
};
