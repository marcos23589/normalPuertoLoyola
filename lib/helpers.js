const date_fns = require ('date-fns');

exports.fechaNacimiento = (aux) => {
    const fecha = new Date (aux);
    return date_fns.format(
        new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate()+1
        ), 'dd/MM/yyyy'
    );
}

exports.fechaNacimientoBacks = (aux) => {
    const fecha = new Date (aux);
    return date_fns.format(
        new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate()+1
        ), 'yyyy-MM-dd'
    );
}
