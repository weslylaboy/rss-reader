import { combineReducers } from 'redux';
import SourcesReducer from './SourcesReducer';
import FeedSelectionReducer from './FeedSelectionReducer';
import FeedsReducer from'./FeedsReducer';
import ArticleReducer from './ArticleReducer';

export default combineReducers({
    sources: SourcesReducer,
    selectedFeed: FeedSelectionReducer,
    selectedArticle: ArticleReducer,
    feed: FeedsReducer
});