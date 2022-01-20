import * as UI from './interfaz.js';
import API from './api.js';

UI.formularioBuscar.addEventListener('submit', buscarCancion);

function buscarCancion(e) {
	e.preventDefault();

	// obtener datos del formulario
	const artista = document.querySelector('#artista').value;
	const cancion = document.querySelector('#cancion').value;

	// validando
	if (artista === '' || cancion === '') {
		UI.divMensajes.textContent = 'Error, todos los campos son obligatorios';
		UI.divMensajes.classList.add('error');

		setTimeout(() => {
			UI.divMensajes.textContent = '';
			UI.divMensajes.classList.remove('error');
		}, 3000);

		return;
	}

	// consultar API
	const busqueda = new API(artista, cancion);
	limpiarHTML();
	spinner();
	busqueda.consultarApi();
	if (!busqueda.consultarApi) {
		divSpinner.remove();
	}
}

function limpiarHTML() {
	while (UI.divResultado.firstChild) {
		UI.divResultado.removeChild(UI.divResultado.firstChild);
	}
}

function spinner() {
	const divSpinner = document.createElement('div');
	divSpinner.classList.add('sk-chase', 'centrar');

	divSpinner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `;
	UI.headingResultado.appendChild(divSpinner);

	setTimeout(() => {
		divSpinner.remove();
	}, 1000);
}
