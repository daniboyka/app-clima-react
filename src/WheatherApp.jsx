import { useState } from "react";

export const WheatherApp = () => {
  const [ciudad, setCiudad] = useState("");
  const [dataClima, setDataClima] = useState(null);
  const apiKey = `36bdc63759114beb9c95d05e00c25e4a`;
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=`;
  const difKelvin = 273.15

  const fetchClima = async () => {
    try {
      const response = await fetch(`${urlApi}+${ciudad}+&appid=${apiKey}`);
      const data = await response.json();
      setDataClima(data);
    } catch (error) {
      console.error("ocurrio el siguente problema:", error);
    }
  };

  /* esta funcion handleCambioCiudad setea lo escrito en el campo
del texto y lo guarda en la variable ciudad*/
  const handleCambioCiudad = (e) => {
    setCiudad(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /*aca se pregunta que "SI EXISTE" lo q se escribe en ciudad existe 
    en la API q haga el fetch*/
    if (ciudad.length > 0) fetchClima();
  };

  return (
    <>
      {/* creamos la parte html un form q vamos a usar para un formulario
    y un imput tipo texto donde la funcion handleCambioCiudad q esta 
    en el onChange va a ir guardando lo q se escriba es ese campo de
    texto */}
      <h1>danu</h1>
      <form className="container" onSubmit={handleSubmit}>
        <input type="text" value={ciudad} onChange={handleCambioCiudad} />
        <button type="submit">buscar</button>
      </form>
      {
        dataClima && (
          <div>
            <h2>{dataClima.name}</h2>
            {console.log(dataClima.weather[0].icon)}
            <p>Temperatura: {parseInt(dataClima?.main.temp - difKelvin)}°C </p>
            <p>Condicion meteorologica:{dataClima.weather[0].description}</p>            
            <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`} />
          </div>
        )
      }
    </>
  );
};
