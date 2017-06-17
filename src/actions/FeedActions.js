import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    SELECT_FEED,
    SELECT_ARTICLE,
    MARK_AS_READ,
    FEED_FETCH_SUCCESS
} from './types';

const server = 'http://192.168.0.165:3000/rss/?feed=';
//const server = 'https://fetcher-rss.herokuapp.com/rss/?feed=';

export const selectFeed = ( feedLink, name ) => {
    return {
        type: SELECT_FEED,
        payload: { feedLink, name }
    };
};

export const selectArticle = ( feed ) => {
    return {
        type: SELECT_ARTICLE,
        payload: feed
    }
};

export const markAsRead = ( feed ) => {
    // return(dispatch) => {
    //     dispatch( { type: MARK_AS_READ, payload: feed });
    //     // Actions.newsList({ type: 'reset' });
    // }
    return {
        type: MARK_AS_READ,
        payload: feed
    }
};

export const feedFetch = ( sources ) => {
    return(dispatch) => {
        axios.get(server + sources)
            .then(response => {
                console.log('Dispatching...')
                dispatch({ type: FEED_FETCH_SUCCESS, payload: response.data });
                Actions.home({ type: 'reset' });

            })
            .catch(error => console.log(error));

    };
};