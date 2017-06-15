import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Image,
    Text,
    View
} from 'react-native';
import { feedFetch } from '../actions';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class Spash extends Component {
    componentWillMount() {
        console.log('SPlash...')
        this.props.feedFetch(this.props.sources);
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../assets/images/rss_icon.png')}
                />
                <Text style={styles.welcome}>
                    Splash me baby!
                </Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
      //  justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        alignContent: 'center',
        textAlign: 'center',
        margin: 10,
    },
    image: {
        marginTop: 70,
    },
};

const mapStateToProps = state => {
    const feed = state.feed;
    const sources = _.map(state.sources, (value) => {
        return  value['feedLink'];
    });
    return { feed, sources };
};

export default connect(mapStateToProps, { feedFetch })(Spash);