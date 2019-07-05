import { firebaseApp } from '../firebase';
import { savePosts } from '../actions';
const api = 'https://sifo.tech/culty';
const headers = {
  'Content-Type': 'application/json'
};

// export const getAllUsuarios = () =>
//   fetch(`${api}/usuarios`, {
//     headers,
//     method: 'GET'
//   })
//     .then(res => res.json())
//     .then(data => data);

export const getUsuario = id =>
  fetch(`${api}/usuarios/${id}`, {
    headers,
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => data);

// export const deleteUsuario = id =>
//   fetch(`${api}/usuarios/${id}`, {
//     headers,
//     method: 'DELETE'
//   })
//     .then(res => res.json())
//     .then(data => data);

export const createUsuario = usuario => {
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      firebaseApp
        .auth()
        .currentUser.updateProfile({
          displayName: this.state.displayName
        })
        .then(() => {
          const uid = firebaseApp.auth().currentUser.uid;
          const name = firebaseApp.auth().currentUser.displayName;
          const email = firebaseApp.auth().currentUser.email;

          firebaseApp
            .database()
            .ref('users/' + uid)
            .set({
              name,
              email,
              uid
            });

          this.setState({
            errMsg:
              'Thank you for signing up, wait for a bit to let us sign in into your account.',
            signUpSuccess: true
          });

          setTimeout(() => {
            if (firebaseApp.auth().currentUser) {
              this.props.goToHomeScreen();
              setTimeout(() => {
                this._handleGoBack();
              }, 1000);
            }
          }, 1000);
        })
        .catch(error => {
          this.setState({ errMsg: error.errorMessage });
        });
    })
    .catch(error => {
      this.setState({ errMsg: error.message });
    });
};

export const updateUsuario = usuario =>
  fetch(`${api}/usuarios/${usuario.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(usuario)
  }).then(res => res.json());

export const getAllObras = () => {
  return new Promise(function(resolve, reject) {
    firebaseApp
      .database()
      .ref('posts/')
      .once('value')
      .then(snapshot => {
        // this.setState({posts: snapshot.val()})
        savePosts(snapshot.val());
        console.log(snapshot.val());
        resolve(snapshot.val());
      })
      .then(data => data)
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
};
// fetch(`${api}/obras`, {
//   headers,
//   method: 'GET'
// })
//   .then(res => res.json())
//   .then(data => data);

export const getObra = id =>
  fetch(`${api}/obras/${id}`, {
    headers,
    method: 'GET'
  })
    .then(res => res.json())
    .then(data => data);

export const deleteObra = id =>
  fetch(`${api}/obras/${id}`, {
    headers,
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => data);

export const createObra = obra =>
  fetch(`${api}/obras`, {
    method: 'POST',
    headers,
    body: JSON.stringify(obra)
  })
    .then(res => res.json())
    .then(data => data);

export const efetueLogin = login =>
  fetch(`${api}/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(login)
  })
    .then(res => res.json())
    .then(data => data);

export const updateObra = obra =>
  fetch(`${api}/obras`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(obra)
  })
    .then(res => res.json())
    .then(data => data);
