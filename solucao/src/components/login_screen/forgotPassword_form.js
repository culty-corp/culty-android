/**
 * this is the forgot password form of the login screen
 */

import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  BackHandler,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native';
import { getColor } from '../config';
import * as Animatable from 'react-native-animatable';
import { firebaseApp } from '../../firebase';
import { corTexto, cinzaClaro, laranjaEscuro } from '../../style';

export default class ForgotPassForm extends Component {
  constructor(props) {
    super(props);

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      init: true,
      errMsg: null,
      email: ''
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backBtnPressed', this._handleBackBtnPress);
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown';
    const errorMessage = this.state.errMsg ? (
      <Text style={styles.errMsg}>{this.state.errMsg}</Text>
    ) : null;

    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        onAnimationEnd={this._handleAnimEnd.bind(this)}
      >
        <Text style={styles.title}>Forgot Password</Text>
        {errorMessage}
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            underlineColorAndroid="transparent"
            placeholder="Enter Your Email"
            placeholderTextColor={corTexto}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleForgotPass.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>
                {'Recover My Password'.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    );
  }

  _handleForgotPass() {
    this.setState({ errMsg: 'Please Wait...' });

    firebaseApp
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({ errMsg: 'An email has been sent!' });
      })
      .catch(error => {
        this.setState({ errMsg: error.message });
      });
  }

  _handleGoBack() {
    this.setState({ init: false });
  }

  _handleBackBtnPress() {
    this._handleGoBack();
    return true;
  }

  _handleAnimEnd() {
    if (!this.state.init) {
      this.props.onBackFromForgotPass();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 20,
    fontFamily: 'MagmaWave',
    marginBottom: 10,
    color: corTexto
  },
  errMsg: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginBottom: 10
  },
  inputContainer: {
    backgroundColor: cinzaClaro,
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto-Bold',
    color: corTexto
  },
  btnContainers: {
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 280
  },
  submitBtnContainer: {
    width: 240,
    height: 40,
    backgroundColor: laranjaEscuro,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: corTexto
  }
});
