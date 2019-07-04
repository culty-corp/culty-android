/**
 * individual post component
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import * as Maps from '../Maps'
import { connect } from "react-redux";
import { getColor } from '../config';
import { corTexto, cinzaClaro } from '../../style';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards
  }

  
}
      componentDidMount = () => {

      }

  handleYup(card) {
    console.log(`Yup for ${card.text}`);
  }
  handleNope(card) {
    console.log(`Nope for ${card.text}`);
  }
  handleMaybe(card) {
    console.log(`Maybe for ${card.text}`);
  }
  render() {
    // If you want a stack of cards instead of one-per-one view, activate stack mode
    // stack={true}
    return (
      <SwipeCards
        cards={this.props.cards}
        renderCard={cardData => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        handleYup={this.handleYup}
        handleNope={this.handleNope}
        handleMaybe={this.handleMaybe}
        hasMaybeAction
      />
    );
  }
}

function mapStateToProps(store) {
  const posts = store.postsCulty
  return {
    ...posts
  }
}

export default connect(mapStateToProps, Maps.mapDispatchToProps)(Posts)

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={[styles.card, { backgroundColor: this.props.backgroundColor }]}
      >
        <Text style={styles.name}>{this.props.usuario.nome}</Text>
        <Text style={styles.time}>{this.props.tipo}</Text>
        <Text style={styles.content}>{this.props.titulo}</Text>
        <Text style={styles.content}>{this.props.conteudoTexto}</Text>
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
  name: {
    color: corTexto,
    fontFamily: 'Roboto-Bold',
    fontSize: 15
  },
  time: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    paddingBottom: 10
  },
  content: {
    color: corTexto,
    fontFamily: 'Roboto-Regular',
    fontSize: 14
  },
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: cinzaClaro,
    backgroundColor: cinzaClaro,
    borderWidth: 1,
    elevation: 1,
    minWidth: '90%',
    minHeight: '70%'
  },
  noMoreCardsText: {
    fontSize: 22
  }
});
