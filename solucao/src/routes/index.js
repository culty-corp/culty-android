import React from 'react';

import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../views/login_screen';
import HomeScreen from '../views/home_screen';
import Timeline from '../components/home_screen/timeline';
import CreateNew from '../components/home_screen/createNew';
import MyPosts from '../components/home_screen/myPosts';
import Settings from '../components/home_screen/settings';
import { View, Image, ScrollView } from 'react-native';
import { DrawerItems } from 'react-navigation';
import { cinzaEscuro, corTexto, laranjaEscuro } from '../style';

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
    Timeline: Timeline,
    CreateNew: CreateNew,
    MyPosts: MyPosts,
    Settings: Settings
  },
  {
    // define customComponent here
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: laranjaEscuro,
      inactiveTintColor: corTexto
    }
  },
  {
    initialRouteName: 'Timeline'
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
