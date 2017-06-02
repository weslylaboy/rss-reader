import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { markAsRead } from '../actions';
import Colors from '../styles/Styles';

class Article extends Component {
    componentDidMount() {
        console.log('Content: ' + this.props.content);
       // console.log('Did mount. Read?: '+ JSON.stringify(this.props));
        this.props.markAsRead(this.props);
       // console.log('After action called. Read?: ' + JSON.stringify(this.props));
    }

    render() {
        return (
            <View style={styles.container}>
                <ParallaxScrollView
                    backgroundColor={Colors.contentColor}
                    contentBackgroundColor={Colors.contentColor}
                    parallaxHeaderHeight={200}
                    stickyHeaderHeight={54}
                    renderBackground={() => (
                        <View key="background">
                            <Image source={{uri: this.props.image,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT }}
                            />

                        </View>
                    )}
                    renderStickyHeader={() => (
                        <View key="sticky-header" style={styles.stickySection}>
                            <Text style={styles.stickySectionText}></Text>
                        </View>
                    )}
                    // renderFixedHeader={() => (
                    //     <View key="fixed-header" style={styles.fixedSection}>
                    //         <Text style={styles.fixedSectionText}
                    //               onPress={() => this.refs.RootView.scrollTo({ x: 0, y: 0 })}>
                    //             Scroll to top
                    //         </Text>
                    //     </View>
                    // )}
                >

                    <View style={{ height: 'auto' }}>
                        <Text style={styles.articleTitle}>{this.props.title}</Text>
                        <Text style={styles.articleStyle}>{this.props.content}</Text>
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }
}

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        justifyContent: 'center'
    },
    stickySectionText: {
        color: 'black',
        fontSize: 18,
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingBottom: 15,
        // margin: 20
    },
    fixedSection: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    articleTitle: {
        fontSize: 26,
        color: 'black',
        fontFamily: 'lora_italic',
        textAlign: 'center',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10
    },
    articleStyle: {
        fontSize: 14,
        fontFamily: 'lora_regular',
        lineHeight: 25,
        margin: 30,
        color: '#333333',
        textAlign: 'justify'
    }

};

const mapStateToProps = (state) => {
    const article  = state.selectedArticle;
    return article;
};

export default connect(mapStateToProps, { markAsRead })(Article);