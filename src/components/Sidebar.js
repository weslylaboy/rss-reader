import React, { Component } from 'react';
import { View, ListView, Image } from 'react-native';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements'
import { Actions } from 'react-native-router-flux';
import { selectFeed } from '../actions';

class Sidebar extends Component {
    componentWillMount() {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });
        this.dataSource = ds.cloneWithRows(this.props.sources);
    }

    render() {
        const {
            topBackground, topAvatar, listItemStyle, listAvatar, listTitleStyle, listSubtitleStyle
        } = styles;

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
                                subtitle={rowData.description}
                                subtitleStyle={listSubtitleStyle}
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
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:10
    },
    listAvatar: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    listTitleStyle: {
        color: '#000',
        fontSize: 16,
        paddingLeft: 10
    },
    listSubtitleStyle: {
        paddingLeft: 10
    }
};

const mapStateToProps = (state) => {
    const selectedSource = state.selectedFeed;
    console.log('SelectedSource: ' + JSON.stringify(selectedSource));
    return { selectedSource };
};

export default connect(mapStateToProps, {selectFeed})(Sidebar);