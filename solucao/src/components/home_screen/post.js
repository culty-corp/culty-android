/**
 * individual post component
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Share } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import * as Maps from '../Maps';
import { connect } from 'react-redux';
import { getColor } from '../config';
import { corTexto, cinzaClaro } from '../../style';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards
    };
  }
  componentDidMount = () => {};

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }

  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }
  
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.props.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        loop={true}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
      />
    );
  }
}

function mapStateToProps(store) {
  const posts = store.postsCulty;
  return {
    ...posts
  };
}

export default connect(
  mapStateToProps,
  Maps.mapDispatchToProps
)(Posts);

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  follow = (usuario) => {
    alert(`você acaba de começar a seguir: ${usuario}`);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          flexDirection: 'column',
          justifyContent: 'center',
          alignSelf: 'stretch',
          minWidth: '90%'
        }}
      >
        <View
          style={{ flex: 0.9, flexDirection: 'row', justifyContent: 'center' }}
        >
          <View style={[styles.card]}>
            <Text style={[styles.name, { flex: 1, flexWrap: 'wrap' }]}>
              {this.props.usuario.nome}
            </Text>
            <Text style={[styles.content, { flex: 1, flexWrap: 'wrap' }]}>
              {this.props.titulo} + {this.props.tipo}
            </Text>
            <View
              style={{
                flex: 7,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            >
              <Text style={styles.content}>{this.props.conteudo}</Text>
            </View>
            <View style={{ flex: 1, flexWrap: 'wrap', width: '100%' }}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}
              >
                <TouchableOpacity onPress={this.onShare}>
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/images/leek.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.follow(this.props.usuario.nome)}>
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require('../../assets/images/leek.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class NoMoreCards extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.noMoreCardsText}>No more cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // card: {
  //   borderWidth: 1,
  //   borderColor: '#e2e2e2',
  //   borderRadius: 2,
  //   backgroundColor: '#ffffff',
  //   padding: 10,
  //   marginTop: 5,
  //   marginBottom: 5,
  //   marginLeft: 10,
  //   marginRight: 10
  // },
  container: {},
  name: {
    color: corTexto,
    fontFamily: 'Roboto-Bold',
    fontSize: 15
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12
  },
  content: {
    color: corTexto,
    fontFamily: 'Roboto-Regular',
    fontSize: 14
  },
  card: {
    flex: 0.9,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: cinzaClaro,
    backgroundColor: cinzaClaro,
    borderWidth: 1,
    elevation: 1
  },
  noMoreCardsText: {
    fontSize: 22
  }
});
