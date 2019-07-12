/**
 * Home screen
 * ScrollableTabView is used for different screens
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import ScrollableTabView, {
  DefaultTabBar
} from 'react-native-scrollable-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import { firebaseApp } from '../firebase';
import LoginScreen from './login_screen';
import { getColor } from '../components/config';
import { signedOut } from '../actions';
import NavigationTab from '../components/home_screen/navTab';
import Timeline from '../components/home_screen/timeline';
import CreateNew from '../components/home_screen/createNew';
import MyPosts from '../components/home_screen/myPosts';
import Settings from '../components/home_screen/settings';
import * as Maps from '../components/Maps';
import { laranjaEscuro } from '../style';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ activeTintColor }) => (
      <Image
        source={require('../assets/images/leek.png')}
        style={[styles.icon, { activeTintColor: activeTintColor }]}
      />
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={laranjaEscuro} animated={true} />
        <ScrollableTabView
          initialPage={0}
          // renderTabBar={() => <NavigationTab />}
        >
          <Timeline tabLabel="md-pulse" />
          <CreateNew tabLabel="md-create" />
          <MyPosts tabLabel="md-contact" />
          <Settings
            tabLabel="ios-settings"
            onLogOut={() => {
              this._onLogOut();
            }}
          />
        </ScrollableTabView>
      </View>
    );
  }

  _onLogOut() {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        this.props.navigator.pop();
        this.props.signedOut();
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  icon: {
    width: 24,
    height: 24
  }
});

function mapStateToProps(state) {
  const usuarioLogado = state.usuario.usuarioLogado;
  return {
    currentUser: firebaseApp.auth().currentUser
  };
}

export default connect(
  mapStateToProps,
  Maps.mapDispatchToProps,
  { signedOut }
)(HomeScreen);
