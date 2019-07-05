/**
 * create new tab
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Image
} from 'react-native';
import {
  Container,
  Text,
  View,
  Content,
  Form,
  Item,
  Input,
  Label,
  Textarea,
  ListItem,
  Radio,
  Right,
  Left,
  Body
} from 'native-base';
import { cinzaClaro, cinzaEscuro, corTexto, laranjaEscuro } from '../../style';
import { getColor } from '../config';
import * as Maps from '../Maps';
import { firebaseApp } from '../../firebase';
import { connect } from 'react-redux';
import CameraRollPicker from 'react-native-camera-roll-picker';

export class CreateNew extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.currentUser);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  state = {
    titulo: '',
    conteudo: '',
    resumo: '',
    texto: true,
    imagem: false,
    video: false,
    audio: false,
    uid: this.props.currentUser.uid
  };

  submit = () => {
    this.setState({
      postStatus: 'Posting...'
    });

    const { titulo, resumo, conteudo, uid } = this.state;

    const postData = {
      usuario: {
        id: this.props.currentUser.uid,
        nome: this.props.currentUser.name
      },
      titulo,
      tipoMidia: 'Texto',
      resumo,
      conteudo,
      filtros: ['mpb', 'rock']
    };

    const newPostKey = firebaseApp
      .database()
      .ref()
      .child('posts')
      .push().key;

    let updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/users/' + uid + '/posts/' + newPostKey] = postData;

    firebaseApp
      .database()
      .ref()
      .update(updates)
      .then(() => {
        this.setState({ postStatus: 'Posted! Thank You.', postText: '' });
      })
      .then(() => {
        this.props.getAllObras();
        this.setState({ titulo: '', resumo: '', conteudo: '' });
      })
      .catch(() => {
        this.setState({ postStatus: 'Something went wrong!!!' });
        this.setState({ titulo: '', resumo: '', conteudo: '' });
      });

    // this.props.adicionarPost(post).then(() => {
    //   this.props.getAllObras();
    // });

    setTimeout(() => {
      this.setState({ postStatus: null });
    }, 2000);
  };

  toHome = () => {
    // this.props.navigation.dispatch(NavigationActions.back())
  };

  static navigationOptions = {
    drawerLabel: 'Novo Post',
    drawerIcon: ({ activeTintColor }) => (
      <Image
        source={require('../../assets/images/leek.png')}
        style={[styles.icon, { activeTintColor: activeTintColor }]}
      />
    )
  };

  componentDidUpdate = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  conteudo = () => {
    if (this.state.texto) {
      return (
        <Textarea
          value={this.state.conteudo}
          onChangeText={conteudo => {
            this.setState({ conteudo });
          }}
          rowSpan={5}
          bordered
          placeholder="Texto"
        />
      );
    } else if (this.state.audio) {
      return (
        <Textarea
          value={this.state.conteudo}
          onChangeText={conteudo => {
            this.setState({ conteudo });
          }}
          rowSpan={5}
          bordered
          placeholder="Áudio"
        />
      );
    } else if (this.state.video) {
      return (
        <Textarea
          value={this.state.conteudo}
          onChangeText={conteudo => {
            this.setState({ conteudo });
          }}
          rowSpan={5}
          bordered
          placeholder="Vídeo"
        />
      );
    } else {
      return (
        <Textarea
          value={this.state.conteudo}
          onChangeText={conteudo => {
            this.setState({ conteudo });
          }}
          rowSpan={5}
          bordered
          placeholder="Imagem"
        />
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'Nova postagem'.toUpperCase()}</Text>
        <Text style={styles.message}>Crie um novo post</Text>
        <Container style={{ padding: 10, backgroundColor: cinzaClaro }}>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Titulo</Label>
                <Input
                  value={this.state.titulo}
                  onChangeText={titulo => {
                    this.setState({ titulo });
                  }}
                />
              </Item>
              <Item floatingLabel>
                <Label>Resumo</Label>
                <Input
                  value={this.state.resumo}
                  onChangeText={resumo => {
                    this.setState({ resumo });
                  }}
                />
              </Item>
              <Text>Tipo de postagem</Text>
              <ListItem
                onPress={() =>
                  this.setState({
                    texto: true,
                    audio: false,
                    video: false,
                    imagem: false
                  })
                }
              >
                <Left>
                  <Text>Texto</Text>
                </Left>
                <Right>
                  <Radio
                    selected={this.state.texto}
                    onPress={() =>
                      this.setState({
                        texto: true,
                        audio: false,
                        video: false,
                        imagem: false
                      })
                    }
                  />
                </Right>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({
                    texto: false,
                    audio: false,
                    video: false,
                    imagem: true
                  })
                }
              >
                <Left>
                  <Text>Imagem</Text>
                </Left>
                <Right>
                  <Radio
                    selected={this.state.imagem}
                    onPress={() =>
                      this.setState({
                        texto: false,
                        audio: false,
                        video: false,
                        imagem: true
                      })
                    }
                  />
                </Right>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({
                    texto: false,
                    audio: true,
                    video: false,
                    imagem: false
                  })
                }
              >
                <Left>
                  <Text>Áudio</Text>
                </Left>
                <Right>
                  <Radio
                    selected={this.state.audio}
                    onPress={() =>
                      this.setState({
                        texto: false,
                        audio: true,
                        video: false,
                        imagem: false
                      })
                    }
                  />
                </Right>
              </ListItem>
              <ListItem
                onPress={() =>
                  this.setState({
                    texto: false,
                    audio: false,
                    video: true,
                    imagem: false
                  })
                }
              >
                <Left>
                  <Text>Vídeo</Text>
                </Left>
                <Right>
                  <Radio
                    selected={this.state.video}
                    onPress={() =>
                      this.setState({
                        texto: false,
                        audio: false,
                        video: true,
                        imagem: false
                      })
                    }
                  />
                </Right>
              </ListItem>
              <Text>Conteudo</Text>
              {this.conteudo()}
            </Form>
            <View style={styleButton.containerBtn}>
              <TouchableOpacity
                onPress={() => this.submit()}
                style={
                  true ? styleButton.styleBtnAtive : styleButton.styleBtnInative
                }
                disabled={!true}
              >
                <Text
                  style={
                    true ? styleButton.btnTextAtive : styleButton.btnTextInative
                  }
                >
                  Postar
                </Text>
              </TouchableOpacity>
            </View>
          </Content>
        </Container>
      </View>
    );
  }

  _handleNewPost() {}
}

function mapStateToProps(state) {
  const postagens = state.postsCulty.postagens;
  const usuarioLogado = state.usuario.usuarioLogado;
  return {
    currentUser: state.currentUser,
    postagens,
    usuarioLogado
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
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    padding: 15
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
    justifyContent: 'center'
  },
  btnTextAtive: {
    color: cores.textoBotao,
    fontWeight: 'bold'
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
    justifyContent: 'center'
  },
  btnTextInative: {
    color: cores.textoBotao,
    fontWeight: 'bold'
  }
});
