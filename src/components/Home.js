import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { feedFetch } from '../actions';
import { Button } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


class Home extends Component {
    componentWillMount() {
        this.props.feedFetch(this.props.sources);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to News reader!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>

                <Text style={styles.welcome}>You have {_.size(this.props.feed)} Feed Sources</Text>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
};

const mapStateToProps = state => {
    const feed = state.feed;
    const sources = _.map(state.sources, (value) => {
        return  value['feedLink'];
    });
    return { feed, sources };
};

export default connect(mapStateToProps, { feedFetch })(Home);