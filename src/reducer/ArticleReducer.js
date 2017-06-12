import { SELECT_ARTICLE, MARK_AS_READ } from '../actions/types';

export default (state = null, action) => {
    switch (action.type){
        case SELECT_ARTICLE:
            return action.payload;
        // case MARK_AS_READ:
        //     console.log('State: ' + JSON.stringify(state))
        // //    console.log('Mark as read Reduceer called: '+ JSON.stringify(action.payload));
        //    // console.log('Before replace: ' + action.payload.read)
        //     //console.log('After Delete: ' + JSON.stringify(action.payload))
        //     //action.payload.read = true;
        //   //  const newState = Object.assign({}, action.payload, { read: true });
        //   //  console.log("Assign: " + JSON.stringify(newState));
        //    // console.log('After replace read: '+ action.payload.read);
        //     //console.log('Prop after replace: '+ JSON.stringify(action.payload));
        //     return Object.assign({}, state, { read: true });
        default:
            return state;
    }
};