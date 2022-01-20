import * as UI from './interfaz.js';

class API {
	constructor(artista, cancion) {
		this.artista = artista;
		this.cancion = cancion;
	}

	consultarApi() {
		const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => {
				// en caso que si exista la cancion
				if (resultado.lyrics) {
					// extrayendo la letra
					const { lyrics } = resultado;
					UI.divResultado.textContent = lyrics;
					UI.headingResultado.textContent = `Letra de la canción "${this.cancion} - ${this.artista}"`;
				} else {
					UI.headingResultado.textContent = '';
					UI.divMensajes.textContent = `Canción "${this.cancion}" no encontrada`;
					UI.divMensajes.classList.add('error');
					setTimeout(() => {
						UI.divMensajes.textContent = '';
						UI.divMensajes.classList.remove('error');
					}, 3000);
				}
			});
	}
}

export default API;
