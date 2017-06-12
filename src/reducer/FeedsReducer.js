import {
    FEED_FETCH_SUCCESS,
    MARK_AS_READ
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action ) => {
    switch (action.type) {
        case FEED_FETCH_SUCCESS:
            return action.payload;
        case MARK_AS_READ:
            console.log('Payload: ' + JSON.stringify(state[action.payload.feed.source]));

             return Object.assign({}, state, { read: true });
        default:
            return state;
    }
};