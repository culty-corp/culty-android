/**
 * the universal timeline
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  RefreshControl,
  Image
} from 'react-native';
import * as Maps from '../Maps';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import { savePosts } from '../../actions/index';
import { getColor } from '../config';
import { firebaseApp } from '../../firebase';
import Post from './post';
import { cinzaClaro, corTexto } from '../../style';

class Timeline extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      isRefreshing: false,
      updateNotification: null
    };
  }

  static navigationOptions = {
    drawerLabel: 'Explorar',
    params: {exigeLogin: false},
    drawerIcon: ({ activeTintColor }) => (
      <Image
        source={require('../../assets/images/leek.png')}
        style={[styles.icon, { activeTintColor: activeTintColor }]}
      />
    )
  };

  componentDidMount() {
    if (this.props.postagens.length === 0) {
      this.props.getAllObras();
    }

    firebaseApp
      .database()
      .ref('posts/')
      .once('value')
      .then(snapshot => {
        // this.setState({posts: snapshot.val()})
        savePosts(snapshot.val());
      })
      .catch(err => {
        console.log(err);
      });

    setTimeout(() => {
      this.setState({ updateNotification: 'Pull to refresh...' });
    }, 10000);
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });

    firebaseApp
      .database()
      .ref('posts/')
      .once('value')
      .then(snapshot => {
        savePosts(snapshot.val());
        this.setState({ isRefreshing: false, updateNotification: null });
      })
      .catch(err => {
        this.setState({
          isRefreshing: false,
          updateNotification: 'Pull to refresh...'
        });
        alert('No updates. :(');
        console.log(err);
      });
  }

  render() {
    // const notify = this.state.updateNotification ? (
    //   <Text style={styles.updateNotificationStyle}>
    //     {this.state.updateNotification}
    //   </Text>
    // ) : null;

    // const view = this.props.posts ? (
    //   <ScrollView
    //     refreshControl={
    //       <RefreshControl
    //         refreshing={this.state.isRefreshing}
    //         onRefresh={this._onRefresh.bind(this)}
    //         activeTintColor="#ff0000"
    //         title="Loading..."
    //         titleColor="#00ff00"
    //         colors={[getColor()]}
    //         progressBackgroundColor={getColor('#ffffff')}
    //       />
    //     }
    //   >
    //     {notify}

    //     {this.renderPosts()}
    //   </ScrollView>
    // ) : (
    //   <View style={styles.waitView}>
    //     <Text>Getting universal timeline...</Text>
    //   </View>
    // );

    // return <View style={styles.container}>{view}</View>;
    return this.renderPosts();
  }

  renderPosts() {
    // const postArray = [];
    // _.forEach(this.props.posts, (value, index) => {
    //   const time = value.time;
    //   const timeString = moment(time).fromNow();
    //   postArray.push(
    //     <Post
    //       posterName={value.name}
    //       postTime={timeString}
    //       postContent={value.text}
    //       key={index}
    //     />
    //   );
    // });
    // _.reverse(postArray);
    // return postArray;
    return <Post style={styles.container} cards={this.props.postagens} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  waitView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    borderWidth: 1,
    borderColor: cinzaClaro,
    borderRadius: 2,
    backgroundColor: cinzaClaro,
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10
  },
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
  updateNotificationStyle: {
    textAlign: 'center',
    marginTop: 10,
    paddingBottom: 5
  },
  icon: {
    width: 24,
    height: 24
  }
});

function mapStateToProps(state) {
  const postagens = state.postsCulty.postagens;
  return {
    posts: state.posts,
    postagens
  };
}

export default connect(
  mapStateToProps,
  Maps.mapDispatchToProps
)(Timeline);
