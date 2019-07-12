/**
 * individual post component
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Share } from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
import * as Maps from '../Maps';
import { connect } from 'react-redux';
import { getColor } from '../config';
import { corTexto, cinzaClaro, laranja } from '../../style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ResponsiveImage from 'react-native-responsive-image';
import Icon from 'react-native-vector-icons/FontAwesome';

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

  onShare = async shareMessage => {
    try {
      const result = await Share.share({
        message: shareMessage
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

  follow = usuario => {
    alert(`você acaba de começar a seguir: ${usuario}`);
  };

  contentRender = mediaType => {
    console.log(mediaType);
    switch (mediaType) {
      case 'Texto':
        return <Text style={styles.content}>{this.props.conteudo}</Text>;
      case 'Imagem':
        return (
          <ResponsiveImage
            source={{ uri: this.props.conteudo }}
            initWidth="320"
            initHeight="360"
          />
        );
      case 'Video':
        return <Text style={styles.content}>{this.props.conteudo}</Text>;
      case 'Audio':
        return <Text style={styles.content}>{this.props.conteudo}</Text>;
      default:
        return <Text style={styles.content}>{this.props.conteudo}</Text>;
    }
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
              {this.props.titulo}
            </Text>
            <View
              style={{
                flex: 7,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            >
              {this.contentRender(this.props.tipoMidia)}
            </View>
            <View style={{ flex: 1, flexWrap: 'wrap', width: '100%' }}>
              <View
                style={{
                  flex: 2,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }}
              >
                <TouchableOpacity
                  onPress={() => this.onShare(this.props.conteudo)}
                >
                  <Icon name="share-alt" size={30} color={laranja} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.follow(this.props.usuario.nome)}
                >
                  <Icon name="heart" size={30} color={laranja} />
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
    fontSize: 22,
    color: corTexto
  }
});
