import { SELECT_FEED } from '../actions/types';

export default (state = null, action) => {
    switch (action.type){
        case SELECT_FEED:
            return action.payload;
        default:
            return state;
    }
};