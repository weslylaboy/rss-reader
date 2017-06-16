import React from 'react';
import { TouchableWithoutFeedback  } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import NavigationDrawer from './components/NavigationDrawer';
import { Icon } from 'react-native-elements'
import Home from './components/Home';
import NewsList from './components/NewsList';
import Article from './components/Article';
import Splash from './components/Splash';

const RouterComponent = () => {
    const { titleStyle, articleNavBarStyle } = styles;

    renderLeftButton = () => {
        return (
            <Icon
                onPress={() => {
                    Actions.refresh({key: 'drawer', open: value => !value});
                } }
               // component={TouchableWithoutFeedback}
                name='menu'
                color='#000'
            />
        )
    };

    return(
        <Router>
            <Scene key="drawer" component={NavigationDrawer} open={false} >
                <Scene key="main">
                    <Scene key="splash" component={Splash} hideNavBar initial reset />
                    <Scene
                        key="home"
                        component={Home}
                        title="Home"
                        titleStyle={titleStyle}
                        renderLeftButton={this.renderLeftButton}
                    />
                    <Scene
                        key="newsList"
                        component={NewsList}
                        title=''
                        titleStyle={titleStyle}
                        renderLeftButton={this.renderLeftButton}
                        type="reset"
                    />
                    <Scene
                        key="article"
                        component={Article}
                        navigationBarStyle={articleNavBarStyle}
                        title=""
                        titleStyle={titleStyle}
                       // renderLeftButton={this.renderLeftButton}
                    />
                </Scene>
            </Scene>
        </Router>
    );
};

const styles = {
    titleStyle: {
        fontWeight: 'bold'
    },
    articleNavBarStyle: {
        backgroundColor: 'transparent',
        borderBottomWidth: 0
    }
};

export default RouterComponent;


