const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarCampo = (e,campo) => {
	if(expresiones[campo].test(e.target.value)){
		document.getElementById(`grupo__${campo}`).classList.add(`correcto`);
		document.getElementById(`grupo__${campo}`).classList.remove(`incorrecto`);
		document.querySelector(`#grupo__${campo} i`).classList.replace(`fa-times-circle`,`fa-check-circle`);
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove(`activo`);
		campos[campo] = true;
	}
	else{
		document.getElementById(`grupo__${campo}`).classList.add(`incorrecto`);
		document.getElementById(`grupo__${campo}`).classList.remove(`correcto`);
		document.querySelector(`#grupo__${campo} i`).classList.replace(`fa-check-circle`,`fa-times-circle`);
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add(`activo`);
		campos[campo] = false;
	}
}

const considirAmbasPassword = () => {
	const inputPassword1 = document.getElementById("password").value;
	const inputPassword2 = document.getElementById("password2").value;

	if(inputPassword1 === inputPassword2 && inputPassword2 !== ""){
		document.getElementById(`grupo__password2`).classList.add(`correcto`);
		document.getElementById(`grupo__password2`).classList.remove(`incorrecto`);
		document.querySelector(`#grupo__password2 i`).classList.replace(`fa-times-circle`,`fa-check-circle`);
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove(`activo`);
		campos.password = true;
	}
	else{
		document.getElementById(`grupo__password2`).classList.add(`incorrecto`);
		document.getElementById(`grupo__password2`).classList.remove(`correcto`);
		document.querySelector(`#grupo__password2 i`).classList.replace(`fa-check-circle`,`fa-times-circle`);
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add(`activo`);
		campos.password = false;
	}
}

const validarFormulario = (e) =>{
	switch(e.target.name){
		case "usuario":
			validarCampo(e,"usuario");
			break
		case "nombre":
			validarCampo(e,"nombre");
			break
		case "password":
			validarCampo(e,"password");
			considirAmbasPassword();
			break
		case "password2":
			considirAmbasPassword();
			break
		case "correo":
			validarCampo(e,"correo");
			break
		case "telefono":
			validarCampo(e,"telefono");
			break
	}
}

inputs.forEach(input => {
	input.addEventListener("keyup",validarFormulario);
	input.addEventListener("blur",validarFormulario);
})

formulario.addEventListener("submit", (e) => {
	e.preventDefault();

	const terminos = document.getElementById("terminos").checked;
	if(terminos && campos.usuario && campos.nombre && campos.password && campos.password && campos.correo && campos.telefono){
		formulario.reset();

		document.getElementById("formulario__mensaje-exito").classList.add("activo");
		setTimeout(() => {
			document.getElementById("formulario__mensaje-exito").classList.remove("activo");
		}, 3000);

		document.querySelectorAll(".correcto").forEach( (icono) => {
			icono.classList.remove("correcto");
		})

		document.getElementById("formulario__mensaje").classList.remove("activo");
	}
	else {
		document.getElementById("formulario__mensaje").classList.add("activo");
	}
})