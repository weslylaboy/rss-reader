import _ from 'lodash';
import {REHYDRATE} from 'redux-persist/constants'
import {
    FEED_FETCH_SUCCESS,
    MARK_AS_READ
} from '../actions/types';

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
            // _.forEach(objValue, function(key, value){
            //     console.log(key);
            // })
            return objValue.concat(srcValue);
        }
    }

    function customMerger(state, payload){
        var result = _.cloneDeep(state);
//        console.log(payload);
  //      console.log(state)
        /**
         * value => feed
         * key => feedLink
         */
        _.forEach(payload, function (feed, feedLink){
           // console.log('Key from payload: ' + JSON.stringify(feedLink));
            if(_.isEqual(state[feedLink].items, payload[feedLink].items)){
                console.log('Equals at feed: ' + feedLink)
            }
            else{
                _.forEach(payload[feedLink].items, function (value, key) {
                    if(payload[feedLink].items.indexOf(value) < 0 ){
                        console.log("Not equals, pushing value with title: " + payload[feedLink].items[key].title);
                        result[feedLink].items.push(value);
                    }
                })
                // console.log('Not equals at feed: ' + feedLink);
                // console.log('State: ' + JSON.stringify(state[feedLink].items[0]))
                // console.log('Payload: ' + JSON.stringify(payload[feedLink].items[0]))
              //  JSON.stringify()
            }
        })
    }

    function deleteDuplicates(initial){
        _.forEach(initial, function(feed, feedLink){
            console.log('Deleting: ' + initial[feedLink].items)
            _.forEach(initial[feedLink].items, function (value, key) {
                _.uniqWith(initial[feedLink].items[key], _.isEqual);
                console.log('Uniqwith: ' + JSON.stringify(initial[feedLink].items))
            })

        })
        return initial;
    }

    switch (action.type) {
        case REHYDRATE:
            let incoming = action.payload.feed;
            if (incoming) return {...state, ...incoming};
            return state;
        case FEED_FETCH_SUCCESS:
            let stateCopy = _.cloneDeep(state);
           let initial = _.mergeWith(stateCopy, action.payload, merger);
          //  let initial = customMerger(stateCopy, action.payload);
            console.log(_.size(initial));
            let copyInitial = deleteDuplicates(initial);
            console.log(_.size(copyInitial))
            console.log(_.size(initial));
            return {...state, ...copyInitial };
        case MARK_AS_READ:
            const index = state[action.payload.feed.source].items.indexOf(action.payload);
            const newState = _.cloneDeep(state);
            newState[action.payload.feed.source].items[index].read = true;
            return  { ...state, ...newState };
        default:
            return state;
    }
};