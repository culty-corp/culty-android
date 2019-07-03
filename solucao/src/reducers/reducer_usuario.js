const initialStateUsuario = {
    logado: false,
    usuarioLogado: {}
  };
  
  export default usuario = (state = initialStateUsuario, action) => {
    let logado = false;
    let usuarioLogado = {}
    switch (action.type) {
      case "LOGAR":
        logado = action.login.sucesso;
        usuarioLogado = action.login.usuario
        return {
          ...state,
          logado,
          usuarioLogado
        };
      case "DESLOGAR":
        state.logado = false;
        state.usuarioLogado = '';
        return {
          ...state
        };
        case "ATUALIZAR_USUARIO":
            usuarioLogado = action.usuario
            return {
              ...state,
              usuarioLogado
            };
      default:
        return state;
    }
  };