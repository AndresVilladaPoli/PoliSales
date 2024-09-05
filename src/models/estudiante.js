class Estudiante {
    constructor(nombre, edad, carrera, correo) {
        this._nombre = nombre;
        this._edad = edad;
        this._carrera = carrera;
        this._correo = correo;
    }

    get nombre() {
        return this._nombre;
    }

    get edad() {
        return this._edad;
    }

    get carrera() {
        return this._carrera;
    }

    get correo() {
        return this._correo;
    }

    set nombre(value) {
        this._nombre = value;
    }

    set edad(value) {
        this._edad = value;
    }

    set carrera(value) {
        this._carrera = value;
    }

    set correo(value) {
        this._correo = value;
    }

    mostrarInformacion() {
        return `Nombre: ${this._nombre}, Edad: ${this._edad}, Carrera: ${this._carrera}, Correo: ${this._correo}`;
    }
}

module.exports = Estudiante;
