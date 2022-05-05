import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type FormData = {
  cep: string;
};

type Address = {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<FormData>({
    cep: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //previne que o formulário seja enviado da forma padrão (toda vez que clicamos em enviar)
    event.preventDefault();

    axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
    .then((response) => {
      setAddress(response.data);
    })
    .catch((err) => {
      setAddress(undefined);
      console.log(err);
    });
  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              name="cep"
              value={formData?.cep}
              type="text"
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {address && (
          <>
            <ResultCard title="Logradouro" description={address.logradouro}/>
            <ResultCard title="Localidade" description={address.localidade} />
            <ResultCard title="Bairro" description={address.bairro} />
            <ResultCard title="UF" description={address.uf} />
          </>
        )}
      </div>
    </div>
  );
};

export default CepSearch;
