/**
 * my post timeline
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import * as Maps from '../Maps';
import { getColor } from '../config';
import _ from 'lodash';
import moment from 'moment';
import Post from './post';
import { firebaseApp } from '../../firebase';
import { laranjaEscuro, corTexto } from '../../style';

class MyPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: {},
      postsCount: 0
    };
  }

  static navigationOptions = {
    drawerLabel: 'Profile',
    drawerIcon: ({ activeTintColor }) => (
      <Image
        source={require('../../assets/images/leek.png')}
        style={[styles.icon, { activeTintColor: activeTintColor }]}
      />
    )
  };

  componentDidMount() {
    const userUid = this.props.currentUser.uid;

    firebaseApp
      .database()
      .ref('/users/' + userUid + '/posts/')
      .on('value', snapshot => {
        console.log(snapshot.val());
        this.setState({
          posts: snapshot.val() || [],
          postsCount: _.size(snapshot.val()) || 0
        });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              {this.props.currentUser.name}
            </Text>
          </View>
          <View style={styles.profileCountsContainer}>
            <Text style={styles.profileCounts}>{this.state.postsCount}</Text>
            <Text style={styles.countsName}>POSTS</Text>
          </View>
        </View>

        <ScrollView styles={styles.postContainer}>
          {this.renderPosts()}
        </ScrollView>
      </View>
    );
  }

  renderPosts() {
    // const postArray = [];
    // _.forEach(this.state.posts, (value, index) => {
    //   const time = value.time;
    //   const timeString = moment(time).fromNow();
    //   postArray.push(
    //     <TouchableOpacity
    //       onLongPress={this._handleDelete.bind(this, value.puid)}
    //       key={index}
    //     >
    //       <Post
    //         posterName={value.name}
    //         postTime={timeString}
    //         postContent={value.text}
    //       />
    //     </TouchableOpacity>
    //   );
    // });
    // _.reverse(postArray);
    // return postArray;

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
    return <Post style={styles.container} cards={this.state.posts} />;
  }

  _handleDelete(puid) {
    Alert.alert('Delete Post', 'Are you sure to delete the post?', [
      { text: 'Yes', onPress: () => this._deleteConfirmed(puid) },
      { text: 'No' }
    ]);
  }

  _deleteConfirmed(puid) {
    firebaseApp
      .database()
      .ref('/posts/' + puid)
      .remove();
    firebaseApp
      .database()
      .ref('/users/' + this.props.currentUser.uid + '/posts/' + puid)
      .remove();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profileInfoContainer: {
    flexDirection: 'row',
    height: 65,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 2,
    backgroundColor: laranjaEscuro
  },
  profileNameContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  profileName: {
    marginLeft: 20,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    color: corTexto,
    fontFamily: 'MagmaWave'
  },
  profileCountsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5
  },
  profileCounts: {
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    color: corTexto
  },
  countsName: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: corTexto
  },
  icon: {
    width: 24,
    height: 24
  }
});

function mapStateToProps(state) {
  const postagens = state.postsCulty.postagens;

  return {
    currentUser: state.currentUser,
    posts: state.posts,
    postagens
  };
}
export default connect(
  mapStateToProps,
  Maps.mapDispatchToProps
)(MyPosts);
