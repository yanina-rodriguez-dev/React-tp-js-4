const Resultado = ({ubicacion,humedad, presion, temperatura }) => {
  return (
    <div>
      <h2>{ubicacion}</h2>
      <p>Humedad: {humedad}</p>
      <p>Presión: {presion}</p>
      <p>Temperatura: {temperatura}</p>
    </div>
  );
};


export default Resultado;
