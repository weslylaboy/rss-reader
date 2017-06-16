import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    Image,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Triangle from 'react-native-triangle';
import { selectArticle } from '../actions';

class NewsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            refreshing: false,
        };
    }

    componentWillMount() {
        Actions.refresh({key: 'drawer', open: value => !value});
        this.createDataSource(this.props.feed)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.name !== nextProps.name){
            Actions.refresh({key: 'newsList', title: nextProps.name });
        }
        this.createDataSource(nextProps.feed);
    }

    createDataSource( feed ){
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 != r2
        });

        this.dataSource = ds.cloneWithRows(feed);
    }

    getListItem (rowData) {
        const { rowText, title, preview, image, triangle, read } = styles;
        return(
            <TouchableWithoutFeedback onPress={ () => {
                this.props.selectArticle(rowData);
                Actions.article();
            }}
            >
                <View>
                    <View style={rowText}>
                        <Text style={[title, rowData.read && read ]} >{rowData.title}</Text>
                        <Text style={preview} numberOfLines={2}  > {rowData.description} </Text>
                    </View>
                    <Image
                        source={{uri: rowData.image}}
                        style={image}>
                        <View style={triangle}>
                            <Triangle
                                width={15}
                                height={7}
                                color={'#FFF'}
                                direction={'down'}
                            />
                        </View>
                    </Image>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            // prepend 10 items
            console.log('ON Refresh called');
            // fetchData().then(() => {
            //     this.setState({refreshing: false});
            // });
            this.setState({
                loaded: this.state.loaded + 10,
                isRefreshing: false,
            });
        }, 5000);
    }

    render() {
        return (
            <View style={{paddingTop: 55}}>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    dataSource={this.dataSource}
                    renderRow={
                        (rowData) => (
                            this.getListItem(rowData)
                        )
                    }
                />
            </View>
        );
    }
}

const styles = {
    rowText: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        color: '#000'
    },
    read: {
        color: 'grey'
    },
    preview: {
        textAlign: 'justify',
    },
    image: {
        width: null,
        height: 200
    },
    triangle: {
        paddingLeft: 15
    }

};

const mapStateToProps = (state) => {
    const { feedLink, name} = state.selectedFeed;
    const feed = state.feed[feedLink].items;
    return  { feed, name };
};

export default connect(mapStateToProps, {selectArticle})(NewsList);