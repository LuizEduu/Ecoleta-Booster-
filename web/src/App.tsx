import React from 'react';
import './App.css';

import Routes from './routes';

//É chamado pelo arquivo index.tsx que joga o conteudo da function dentro da div root do index.html
function App() {

  return (
    <Routes />
  );
}

export default App;

/*
  Estados são informações mantidas pelo próprio componente e são usados para armazenar dados
  <Header title="hello word" /> passar propriedades para o componente
*/