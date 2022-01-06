const date_fns = require ('date-fns');

exports.fechaNacimiento = (aux) => {
    const fecha = new Date (aux);
    return date_fns.format(
        new Date(
            fecha.getFullYear(),
            fecha.getMonth(),
            fecha.getDate()
        ), 'dd/MM/yyyy'
    );
}

