import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [CEP, setCEP] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencha com algum CEP!")
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCEP(response.data)
      setInput("");
      if (Object.keys(response.data).length === 1) {
        alert("CEP inexistente.");
      }
    } catch {
      alert("Formato inválido.")
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(CEP).length > 1 && (
        <main className='main'>
          <h2>CEP: {CEP.cep}</h2>
          <span>{CEP.logradouro}</span>
          <span>{CEP.bairro}</span>
          <span>{CEP.localidade} - {CEP.uf}</span>
        </main>
      )}
    </div>
  );
}

export default App;
