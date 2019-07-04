import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getColor } from '../config';
import { laranjaEscuro, corTexto } from '../../style';

export default class NavigationTab extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.tabs}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Culty</Text>
        </View>

        {this.props.tabs.map((tab, i) => {
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => this.props.goToPage(i)}
              style={styles.tab}
            >
              <Icon
                name={tab}
                size={30}
                color={
                  this.props.activeTab === i
                    ? getColor('#ffffff')
                    : getColor('rgba(255,255,255,.4)')
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    position: 'absolute',
    height: '100%',
    width: '10%',
    backgroundColor: laranjaEscuro,
    elevation: 5
  },
  titleContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20
  },
  title: {
    fontFamily: 'MagmaWave',
    fontSize: 30,
    color: corTexto
  },
  tab: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
