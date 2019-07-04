/**
 * create new tab
 */

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Image
} from 'react-native';
import { Container, Content, Form, Item, Input, Label, Textarea } from 'native-base';
import { cinzaClaro, cinzaEscuro, corTexto, laranjaEscuro } from '../../style';
import { getColor } from '../config';
import * as Maps from '../Maps'
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';

export class CreateNew extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  state = {
    titulo: '',
    conteudoTexto: '',
    resumo: '',
  }

  submit = () => {

    const { titulo, resumo, conteudoTexto } = this.state;

    const post = {
      usuario: { id: "5ccda98baacad326400e9195", nome: "saulocalixto", },
      titulo,
      tipoMidia: 'Texto',
      resumo,
      conteudoTexto,
      filtros : ["mpb", "rock"]
  };

  this.props.adicionarPost(post).then(() => {
    this.props.getAllObras()
})

    this.setState({ titulo: '', resumo: '', conteudoTexto: '' });
  }

  toHome = () => {
    // this.props.navigation.dispatch(NavigationActions.back())
  }

  static navigationOptions = {
    drawerLabel: 'New Post',
    drawerIcon: ({ activeTintColor }) => (
      <Image
        source={require('../../assets/images/leek.png')}
      />
    )
  };

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'Nova postagem'.toUpperCase()}</Text>
        <Text style={styles.message}>Crie um novo post</Text>
        <Container style={{ padding: 10, backgroundColor: 'white' }}>
        <Content>
          <Form>
          <Item floatingLabel>
              <Label>Titulo</Label>
              <Input
              value={this.state.titulo}
                onChangeText={(titulo) => { this.setState({ titulo }); }} />
            </Item>
            <Item floatingLabel>
              <Label>Resumo</Label>
              <Input
                value={this.state.resumo} onChangeText={(resumo) => { this.setState({ resumo }); }}/>
            </Item>
            <Textarea 
              value={this.state.conteudo} onChangeText={(conteudoTexto) => { this.setState({ conteudoTexto }); }} 
              rowSpan={5} 
              bordered 
              placeholder="Conteúdo" />
          </Form>
          <View
            style={styleButton.containerBtn}>
            <TouchableOpacity
              onPress={() => this.submit()}
              style={ true ? 
                styleButton.styleBtnAtive : 
                styleButton.styleBtnInative }
              disabled={!true}>
              <Text style={ true ? 
                styleButton.btnTextAtive : 
                styleButton.btnTextInative }>Postar</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>

      </View>
    );
  }

  _handleNewPost() {
    // this.setState({
    //   postStatus: 'Posting...'
    // });

    // if (this.state.postText.length > 20) {
    //   const time = Date.now();
    //   const uid = firebaseApp.auth().currentUser.uid;
    //   const email = firebaseApp.auth().currentUser.email;
    //   const newPostKey = firebaseApp
    //     .database()
    //     .ref()
    //     .child('posts')
    //     .push().key;

    //   const postData = {
    //     name: firebaseApp.auth().currentUser.displayName,
    //     time: time,
    //     text: this.state.postText,
    //     puid: newPostKey
    //   };
    //   let updates = {};
    //   updates['/posts/' + newPostKey] = postData;
    //   updates['/users/' + uid + '/posts/' + newPostKey] = postData;

    //   firebaseApp
    //     .database()
    //     .ref()
    //     .update(updates)
    //     .then(() => {
    //       this.setState({ postStatus: 'Posted! Thank You.', postText: '' });
    //     })
    //     .catch(() => {
    //       this.setState({ postStatus: 'Something went wrong!!!' });
    //     });
    // } else {
    //   this.setState({ postStatus: 'You need to post at least 20 charecters.' });
    // }

    // setTimeout(() => {
    //   this.setState({ postStatus: null });
    // }, 2000);
  }
}

function mapStateToProps(state) {
  const postagens = state.postsCulty.postagens
  return {
    postagens
  };
}

export default connect(
  mapStateToProps,
  Maps.mapDispatchToProps
)(CreateNew);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  title: {
    marginTop: 10,
    paddingBottom: 10,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    color: corTexto
  },
  message: {
    textAlign: 'left',
    paddingTop: 10,
    paddingBottom: 0
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: cinzaClaro,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    borderRadius: 2
  },
  inputField: {
    flex: 1,
    padding: 0,
    textAlignVertical: 'top'
  },
  btnContainer: {
    width: 120,
    height: 40,
    backgroundColor: laranjaEscuro,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: corTexto
  },
  icon: {
    width: 24,
    height: 24
  }
});

const cores = {
  titulo: '#54504E',
  subTitulo: '#9BADAD',
  botaoAtivo: '#ff6600',
  botaoInativo: '#D4CEC9',
  textoBotao: '#8A8685'
};

const styleButton = StyleSheet.create({
  containerBtn: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: 'space-between',
    padding: 15,
  },
  styleBtnAtive: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    borderColor: cores.botaoAtivo,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnTextAtive: {
    color: cores.textoBotao,
    fontWeight: 'bold',
  },
  styleBtnInative: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'transparent',
    borderColor: cores.botaoInativo,
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnTextInative: {
    color: cores.textoBotao,
    fontWeight: 'bold'
  },
})