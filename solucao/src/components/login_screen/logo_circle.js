/**
 * circle logo with white background
 * and the shadow (shadow doesn't work on android < 5.0)
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getColor } from '../config';
import { cinzaClaro, corTexto } from '../../style';

export default class LogoCircle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.logoContainer}>
        <Image
        source={require('../../assets/images/logo.png')}
        style={{ resizeMode: 'cover' }}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logoContainer: {
    height: 180,
    width: 180,
    backgroundColor: cinzaClaro,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20
  },
  logoText: {
    fontSize: 80,
    fontFamily: 'MagmaWave',
    color: corTexto,
    marginTop: 5,
    marginLeft: 5
  }
});
