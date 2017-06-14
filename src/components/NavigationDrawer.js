import React, { Component } from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import Sidebar from './Sidebar';

class NavigationDrawer extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="displace"
                elevation={3}
                content={<Sidebar sources={this.props.sources} />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                styles={drawerStyles}
                tweenHandler={(ratio) => ({
                    main: { opacity:Math.max(0.54,1-ratio), backgroundColor: '#000' }
                })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}

const drawerStyles = {
    drawer: {
        shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 1
    },
    main: { paddingLeft: 0 }
};

const mapStateToProps = state => {
    return { sources: state.sources };
};

export default connect(mapStateToProps)(NavigationDrawer);