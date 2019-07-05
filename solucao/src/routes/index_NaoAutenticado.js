import React from 'react';

import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../views/login_screen';
import Timeline from '../components/home_screen/timeline';
import CreateNew from '../components/home_screen/createNew';
import MyPosts from '../components/home_screen/myPosts';
import Settings from '../components/home_screen/settings';
import { View, Image, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { cinzaEscuro, corTexto, laranjaEscuro } from '../style';
import { connect } from 'react-redux';

const DrawerContent = props => (
  <ScrollView
    style={{
      backgroundColor: cinzaEscuro
    }}
  >
    <View
      style={{
        top: 10,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={{ resizeMode: 'cover' }}
      />
    </View>
    <DrawerItems {...props} />
  </ScrollView>
);

const AppNavigator = createDrawerNavigator(
  {
    Login: LoginScreen,
    Timeline: Timeline
  },
  {
    // define customComponent here
    initialRouteName: 'Timeline',
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: laranjaEscuro,
      inactiveTintColor: corTexto
    }
  }
);
const AppContainer = createAppContainer(AppNavigator);

mapStateToProps = state => {
  const stateUsuario = state.currentUser;
  return {
    ...stateUsuario
  };
};

export default connect(mapStateToProps)(AppContainer);
