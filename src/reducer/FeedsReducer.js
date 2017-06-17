import _ from 'lodash';
import {REHYDRATE} from 'redux-persist/constants'
import {
    FEED_FETCH_SUCCESS,
    MARK_AS_READ
} from '../actions/types';
import mergeJSON from 'merge-json';

let INITIAL_STATE = {};

export default (state = INITIAL_STATE, action ) => {
    /**
     * Merge news arrays using the feed links as reference
     * @returns {Array|*|string|Array.<T>}
     * @param objValue
     * @param srcValue
     */
    function merger(objValue, srcValue) {
        if (_.isArray(objValue)) {
            //console.log('objValue: ' + JSON.stringify(objValue));
            _.forEach(objValue, function(key, value){
                console.log(key);
            })
            return objValue.concat(srcValue);
        }
    }

    switch (action.type) {
        case REHYDRATE:
            let incoming = action.payload.feed;
            if (incoming) return {...state, ...incoming};
            return state;
        case FEED_FETCH_SUCCESS:
            let stateCopy = _.cloneDeep(state);
           // let initial = _.mergeWith(stateCopy, action.payload, merger);
            let initial = mergeJSON.merge(action.payload, stateCopy);
            console.log(_.size(initial));
            return {...state, ...initial };
        case MARK_AS_READ:
            const index = state[action.payload.feed.source].items.indexOf(action.payload);
            const newState = _.cloneDeep(state);
            newState[action.payload.feed.source].items[index].read = true;
            return  { ...state, ...newState };
        default:
            return state;
    }
};