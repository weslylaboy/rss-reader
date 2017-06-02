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
        const links = [
            'https://www.androidcentral.com/feed',
            'http://www.androidpolice.com/feed/',
            'http://feeds2.feedburner.com/AndroidPhoneFans'
        ];

        this.props.feedFetch(links);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Text>Test</Text>
                <Button
                    onPress={() => { Actions.newsList() }}
                    raised
                    icon={{name: 'cached'}}
                    title='Button' />
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
   // console.log("Feed home: " + JSON.stringify(feed));
    return { feed };
};

export default connect(mapStateToProps, { feedFetch })(Home);