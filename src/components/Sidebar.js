import React, { Component } from 'react';
import { View, ListView, Image } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { ListItem, Badge } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { selectFeed } from '../actions';

class Sidebar extends Component {

    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(this.props.sources);
    }

    componentWillReceiveProps(){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(this.props.sources);

    }

    render() {
        const {
            topBackground, topAvatar, listItemStyle, listAvatar, listTitleStyle } = styles;

        return (
            <View>
                <Image
                    style={topBackground}
                    source={{uri: 'http://d3ui957tjb5bqd.cloudfront.net/images/screenshots/products/29/294/294444/1-o.jpg'}}
                >
                    <Image
                        style={topAvatar}
                        source={{uri: 'https://cdn.pixabay.com/photo/2017/03/24/07/28/rss-2170424_960_720.png' }}
                    />
                </Image>
                <ListView
                    dataSource={this.dataSource}
                    renderRow={
                        (rowData) => (
                            <ListItem
                                containerStyle={listItemStyle}
                                hideChevron
                                roundAvatar
                                onPress={() => {
                                    // console.log("Pressed: "+ JSON.stringify(rowData));
                                    this.props.selectFeed(rowData.feedLink, rowData.name);
                                    Actions.refresh({key: 'drawer', open: value => !value});
                                    Actions.newsList({ title: rowData.name});
                                }}
                                avatar={{uri: rowData.avatar}}
                                avatarStyle={listAvatar}
                                title={rowData.name}
                                titleStyle={listTitleStyle}
                                badge={{ element: <Badge
                                    containerStyle={{ marginTop: 2}}
                                    value={this.props.badge[rowData.feedLink]}
                                    textStyle={{ fontFamily: 'bariol_bold' }}
                                />}}
                               // badge={{ value:  this.props.badge[rowData.feedLink], badgeTextStyle: { color: 'orange' }, badgeContainerStyle: { marginTop: -20 } }}
                                // subtitle={rowData.description}
                                //subtitleStyle={listSubtitleStyle}
                            />
                        )
                    }
                />
            </View>
        )
    }
}

const styles = {
    topBackground: {
        width: undefined,
        height: 170,
        justifyContent:'center'
    },
    topAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center'
    },
    listItemStyle: {
        flex: 1,
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 10
    },
    listAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50
    },
    listTitleStyle: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'opensans_bold',
        marginLeft: 14
    },
    listSubtitleStyle: {
        paddingLeft: 10
    }
};

const mapStateToProps = (state) => {
    const selectedSource = state.selectedFeed;
    const news = state.feed;
    var badge = {};
    if(_.size(news)) {
        _.forEach(news, function (feeds, feedLink) {
            var counter = 0;
            _.forEach(news[feedLink].items, function (item) {
                if (!item.read)
                    counter++;
            });
            badge[feedLink] = counter


        });
    }
    return { selectedSource, news, badge };
};

export default connect(mapStateToProps, {selectFeed})(Sidebar);