const api = "https://sifo.tech/culty";
const headers = {
  "Content-Type": "application/json"
};

export const getAllUsuarios = () =>
  fetch(`${api}/usuarios`, {
    headers,
    method: "GET"
  })
    .then(res => res.json())
    .then(data => data);

export const getUsuario = id =>
  fetch(`${api}/usuarios/${id}`, {
    headers,
    method: "GET"
  })
    .then(res => res.json())
    .then(data => data);

export const deleteUsuario = id =>
  fetch(`${api}/usuarios/${id}`, {
    headers,
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => data);

export const createUsuario = usuario =>
  fetch(`${api}/usuarios`, {
    method: "POST",
    headers,
    body: JSON.stringify(usuario)
  })
    .then(res => res.json())
    .then(data => data);

export const updateUsuario = usuario =>
  fetch(`${api}/usuarios/${usuario.id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(usuario)
  })
    .then(res => res.json());

export const getAllObras = () =>
  fetch(`${api}/obras`, {
    headers,
    method: "GET"
  })
    .then(res => res.json())
    .then(data => data);

export const getObra = id =>
  fetch(`${api}/obras/${id}`, {
    headers,
    method: "GET"
  })
    .then(res => res.json())
    .then(data => data);

export const deleteObra = id =>
  fetch(`${api}/obras/${id}`, {
    headers,
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => data);

export const createObra = obra =>
  fetch(`${api}/obras`, {
    method: "POST",
    headers,
    body: JSON.stringify(obra)
  })
    .then(res => res.json())
    .then(data => data);

export const efetueLogin = login =>
  fetch(`${api}/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(login)
  })
    .then(res => res.json())
    .then(data => data);

export const updateObra = obra =>
  fetch(`${api}/obras`, {
    method: "PUT",
    headers,
    body: JSON.stringify(obra)
  })
    .then(res => res.json())
    .then(data => data);
