const Months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const dateConverter = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const finalResult = `${date.toLocaleDateString("es-cl", {
    weekday: "long",
  })} ${date.getDate()} de ${Months[date.getMonth() + 1]}`;
  return finalResult;
};

const getDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("es-cl", {
    weekday: "long",
  });
};
const getYear = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.getFullYear();
};

export { dateConverter, getDay, getYear };
