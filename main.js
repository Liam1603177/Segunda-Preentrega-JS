const listaReproduccion = [];

const mostrarListaAnimes = () => {
    const listaAnimes = animes.map(anime => {
        return '- ' + anime.nombre + ' (Episodios: ' + anime.episodios + ')';
    });
    alert('Catálogo de Anime:\n\n' + listaAnimes.join('\n'));
    buscarAnime(listaAnimes);
}

const buscarAnime = (listaDeAnimes) => {
    let continuarBuscando;
    do {
        const nombreAnime = prompt('¿Qué anime desea buscar?\n\n' + listaDeAnimes.join('\n'));
        const animeEncontrado = animes.find(anime => anime.nombre.toLowerCase() === nombreAnime.toLowerCase());

        if (animeEncontrado) {
            mostrarDetallesAnime(animeEncontrado);
        } else {
            alert('El anime no se encuentra en el catálogo.');
        }

        continuarBuscando = confirm('¿Desea buscar otro anime?');
    } while (continuarBuscando);

    mostrarListaReproduccion();
};

const mostrarDetallesAnime = (anime) => {
    const mensaje = `
        Nombre: ${anime.nombre}
        Descripción: ${anime.descripcion}
        Episodios totales: ${anime.episodios}

        ¿Qué episodio desea agregar a la lista de reproducción?
    `;

    const episodio = parseInt(prompt(mensaje));

    if (episodio > 0 && episodio <= anime.episodios) {
        agregarAListaReproduccion(anime, episodio);
    } else {
        alert('Número de episodio inválido');
    }
};

const agregarAListaReproduccion = (anime, episodio) => {
    listaReproduccion.push({
        id: Date.now(),
        nombre: anime.nombre,
        episodio: episodio
    });
    alert(`Se ha agregado ${anime.nombre} - Episodio ${episodio} a la lista de reproducción.`);
};

const mostrarListaReproduccion = () => {
    if (listaReproduccion.length === 0) {
        alert('La lista de reproducción está vacía.');
        return;
    }

    const listaItems = listaReproduccion.map(item => {
        return '- ' + item.nombre + ' - Episodio ' + item.episodio;
    });

    const mensaje = 'Lista de Reproducción:\n\n' + listaItems.join('\n');

    const opcion = prompt(mensaje + '\n\nEscriba "eliminar" para quitar un elemento o "salir" para terminar.');

    if (opcion.toLowerCase() === 'eliminar') {
        eliminarDeLista();
    } else if (opcion.toLowerCase() === 'salir') {
        alert('¡Gracias por usar nuestro buscador de anime!');
    } else {
        mostrarListaReproduccion();
    }
};

const eliminarDeLista = () => {
    const nombreAnime = prompt('Ingrese el nombre del anime a eliminar:');
    const episodio = parseInt(prompt('Ingrese el número de episodio a eliminar:'));

    const index = listaReproduccion.findIndex(item =>
        item.nombre.toLowerCase() === nombreAnime.toLowerCase() && item.episodio === episodio
    );

    if (index !== -1) {
        listaReproduccion.splice(index, 1);
        alert('El episodio ha sido eliminado de la lista de reproducción.');
    } else {
        alert('No se encontró el episodio en la lista de reproducción.');
    }

    mostrarListaReproduccion();
};

mostrarListaAnimes();