import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import ReduxThunk from 'redux-thunk';
import reducers from './reducer';
import Router from './Router';
import Colors from './styles/Styles';

class App extends Component {
    componentDidMount() {
        StatusBar.setBarStyle('dark-content', true);
        StatusBar.setBackgroundColor(Colors.statusBarColor, true)
    }

    render() {
        //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk), autoRehydrate());
        const store = createStore(
            reducers,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            compose(
                applyMiddleware(ReduxThunk),
                autoRehydrate()
            )
        );

        persistStore(store, { storage: AsyncStorage, blacklist: ['selectedArticle', 'selectedFeed', 'sources'] }, () =>
            console.log('Rehydrate completed...')
        );
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;