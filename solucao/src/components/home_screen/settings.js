/**
 * the settings tab
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import { firebaseApp } from '../../firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import { corTexto } from '../../style';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      email: '',
      signOutMsg: 'Sign Out'
    };
  }

  static navigationOptions = {
    drawerLabel: 'Settings',
    drawerIcon: ({ activeTintColor }) => (
      <Image
        source={require('../../assets/images/leek.png')}
        style={[styles.icon, { activeTintColor: activeTintColor }]}
      />
    )
  };

  componentDidMount() {
    const user = firebaseApp.auth().currentUser;
    if (user != null) {
      const name = user.displayName;
      const uemail = user.email;

      this.setState({
        user: name,
        email: uemail,
        deleteErrMsg: ''
      });
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.listItem}
          onPress={this._logOut.bind(this)}
        >
          <Icon
            name="md-log-out"
            size={30}
            color={corTexto}
            style={styles.itemIcon}
          />
          <Text style={styles.itemName}>
            {this.state.signOutMsg} - {this.state.user}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listItem}
          onPress={this._deleteAccount.bind(this)}
        >
          <Icon
            name="md-close"
            size={30}
            color={corTexto}
            style={styles.itemIcon}
          />
          <Text style={[styles.itemName, { color: 'red' }]}>
            Delete my account
          </Text>
        </TouchableOpacity>
        <Text style={{ flex: 1, margin: 20 }}>{this.state.deleteErrMsg}</Text>
      </View>
    );
  }

  _logOut() {
    this.props.onLogOut !== null
      ? this.props.onLogOut()
      : () => {
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
        };
  }

  _deleteAccount() {
    Alert.alert('Delete Account!', 'Are you sure to delete your account?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => this._deleteAccountConfirmed() }
    ]);
  }

  _deleteAccountConfirmed() {
    this.setState({
      deleteErrMsg: ''
    });
    if (firebaseApp.auth().currentUser) {
      firebaseApp
        .auth()
        .currentUser.delete()
        .then(() => {
          this.props.onLogOut();
        })
        .catch(error => {
          this.setState({
            deleteErrMsg: error.message
          });
        });
    } else {
      this.setState({
        deleteErrMsg: 'Something went wrong!'
      });
    }
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemIcon: {
    marginLeft: 20,
    marginRight: 20
  },
  itemName: {
    fontFamily: 'Roboto-Regular',
    color: corTexto
  },
  icon: {
    width: 24,
    height: 24
  }
});
