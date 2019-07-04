import {
    passarPost,
    addFiltro,
    removeFiltro,
    fetchAdicionarPost,
    fetchLogar,
    deslogar,
    fetchGetAllObras,
    fetchAdicionarUsuario,
    fetchRemoveObra,
    fetchAtualizarUsuario
  } from "../actions/index";
  
  export const mapDispatchToProps = dispatch => {
    return {
      passarPost: () => dispatch(passarPost()),
      adicionarPost: post => dispatch(fetchAdicionarPost(post)),
      addFiltro: filtro => dispatch(addFiltro(filtro)),
      removeFiltro: filtro => dispatch(removeFiltro(filtro)),
      logue: (login) => dispatch(fetchLogar(login)),
      deslogar: () => dispatch(deslogar()),
      getAllObras: () => dispatch(fetchGetAllObras()),
      addUsuario:(usuario) => dispatch(fetchAdicionarUsuario(usuario)),
      updateUsuario:(usuario) => dispatch(fetchAtualizarUsuario(usuario)),
      removeObra:(id) => dispatch(fetchRemoveObra(id))
    };
  };