/**
 * this is the main application component
 * it is used to configure the navigator
 * and lock to screen to portrait mode only
 * this will also determine what screen to show
 * according to the signed in status of the user
 */

import React, { Text, Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import {
  Navigator,
  NavigationBar
} from 'react-native-deprecated-custom-components';

// import the login screen view and
// add it as the first component to render
// added HomeScreen to debug
import LoginScreen from './views/login_screen';
import HomeScreen from './views/home_screen';
import Routes from './routes/index.js';
import RoutesNaoAutenticado from './routes/index_NaoAutenticado';

// import firebase to determine which view to display
import { cinzaEscuro, corTexto, laranja, laranjaEscuro } from './style';

class App extends Component {
  constructor(props) {
    super(props);

    this.routes = [{ view: LoginScreen }, { view: HomeScreen }];
  }

  render() {
    // base route stack to render
    // based on signed status of the user
    // let navigator;
    // navigator = (
    //   <Navigator
    //     style={{ flex: 1 }}
    //     initialRoute={this.routes[1]}
    //     initialRouteStack={this.routes}
    //     renderScene={this.renderScene}
    //     configureScene={this.configureScene}
    //   />
    // );
    // if (this.props.currentUser.signInStatus) {
    //   navigator = (
    //     <Navigator
    //       style={{ flex: 1 }}
    //       initialRoute={this.routes[1]}
    //       initialRouteStack={this.routes}
    //       renderScene={this.renderScene}
    //       configureScene={this.configureScene}
    //     />
    //   );
    // } else {
    //   navigator = (
    //     <Navigator
    //       style={{ flex: 1 }}
    //       initialRoute={this.routes[0]}
    //       initialRouteStack={this.routes}
    //       renderScene={this.renderScene}
    //       configureScene={this.configureScene}
    //     />
    //   );
    // }
    return (
      <View
        style={{ flex: 1, backgroundColor: cinzaEscuro, color: laranjaEscuro }}
      >
        { this.props.currentUser.signInStatus ? <Routes /> : <RoutesNaoAutenticado />}
      </View>
    );
  }

  renderScene(route, navigator) {
    return <route.view navigator={navigator} {...route} />;
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FloatFromRight;
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(App);
