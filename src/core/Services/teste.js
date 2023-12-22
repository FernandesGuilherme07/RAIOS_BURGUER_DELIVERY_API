function  getDate() {
    const dataHoraUTC = new Date();
    const dataHoraBrasil = new Date(dataHoraUTC.getTime() );

    return dataHoraBrasil.toLocaleString('pt-BR').toString().replace(", ", " - ");
}

console.log(getDate())