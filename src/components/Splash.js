import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    Text,
    View
} from 'react-native';
import { feedFetch } from '../actions';
import Spinner from 'react-native-spinkit';

class Splash extends Component {
    componentWillMount() {
        this.props.feedFetch(this.props.sources);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.icon}
                    source={require('../assets/images/rss_icon.png')}
                />

                <Spinner style={styles.spinner} isVisible={true} size={100} type={'ThreeBounce'} color={"#46cfa0"}/>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        alignContent: 'center',
        textAlign: 'center',
        margin: 10,
    },
    icon: {
        marginTop: 70,
        width: 120,
        height: 120
    },
    spinner: {
        alignItems: 'center',
        marginBottom: 30
    }
};

const mapStateToProps = state => {
    const feed = state.feed;
    const sources = _.map(state.sources, (value) => {
        return  value['feedLink'];
    });
    return { feed, sources };
};

export default connect(mapStateToProps, { feedFetch })(Splash);