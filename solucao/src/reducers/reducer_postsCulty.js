const initialStatePosts = {
  index: -1,
  postagemAtual: {},
  filtros: [],
  postagensCompletas: [],
  postagens: [],
  postagensFake: [
    {
      usuario: { id: '', nome: 'Zé Paulo' },
      titulo: 'O Grito',
      tipoMidia: 'Imagem',
      resumo:
        'Arte que criei enquanto observava universitários em fim de semestre.',
      conteudo: require(`../assets/images/ogrito.jpg`),
      filtros: ['#pintura', '#impressionismo']
    },
    {
      usuario: { id: '', nome: 'Menino da Puc' },
      titulo: 'Quem te viu, quem te vê',
      tipoMidia: 'Audio',
      resumo: 'Um dia eu vi uma garota para nunca mais, criei essa música.',
      conteudo: require(`../assets/images/miku.jpg`),
      filtros: ['#música', '#mpb']
    }
  ]
};

export default (postsCulty = (state = initialStatePosts, action) => {
  let postagens = [];
  let postagensCompletas = [];
  switch (action.type) {
    case 'PASSAR_POST':
      let postagensFiltradas;
      if (state.filtros.length > 0) {
        postagensFiltradas = state.postagens.filter(
          x =>
            x.filtros.filter(filtro => state.filtros.includes(filtro)).length >
            0
        );
        postagensFiltradas =
          postagensFiltradas.length > 0 ? postagensFiltradas : state.postagens;
        state.index =
          state.index + 1 > postagensFiltradas.length - 1 ? 0 : state.index + 1;
        state.postagemAtual = postagensFiltradas[state.index];
      } else {
        postagensFiltradas = state.postagens;
        state.index =
          state.index + 1 > postagensFiltradas.length - 1 ? 0 : state.index + 1;
        state.postagemAtual = state.postagens[state.index];
      }

      return {
        ...state
      };
    case 'ADICIONAR_POST':
      postagens = [...state.postagens, action.post];
      postagensCompletas = [...state.postagensCompletas, action.post];
      return {
        ...state,
        postagens,
        postagensCompletas
      };
    case 'GET_ALL_OBRAS':
      postagens = [...state.postagensFake, ...action.obras];
      postagensCompletas = [...state.postagensFake, ...action.obras];
      return {
        ...state,
        postagens,
        postagensCompletas
      };
    case 'REMOVE_OBRA':
      state.postagens = state.postagens.filter(
        x => x.usuarios.id !== action.idObra
      );
      state.index = 0;
      state.postagemAtual = state.postagens[state.index];
      return {
        ...state
      };
    case 'ADD_FILTRO':
      if (state.filtros.indexOf(action.filtro) === -1) {
        state.filtros = [...state.filtros, action.filtro];
      }
      return {
        ...state
      };
    case 'REMOVE_FILTRO':
      if (state.filtros.indexOf(action.filtro) !== -1) {
        state.filtros = state.filtros.filter(x => x !== action.filtro);
      }
      return {
        ...state
      };
    default:
      return state;
  }
});
