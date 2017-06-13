import _ from 'lodash';
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
            const index = state[action.payload.feed.source].items.indexOf(action.payload);
            const newState = _.cloneDeep(state);
            newState[action.payload.feed.source].items[index].read = true;
            return  { ...state, ...newState };
        default:
            return state;
    }
};