const API_LIBROS = "/api/libros";
const API_CATEGORIAS = "/api/categorias";

let libros = [];
let categorias = [];

function cabeceras() {
    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;
    return {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Authorization": "Basic " + btoa(usuario + ":" + clave)
    };
}

function mostrarAviso(mensaje, esError) {
    const aviso = document.getElementById("aviso");
    aviso.textContent = mensaje;
    aviso.className = "aviso visible" + (esError ? " error" : "");
    setTimeout(() => aviso.className = "aviso", 2500);
}

function texto(valor) {
    return valor === null || valor === undefined || valor === "" ? "—" : valor;
}

async function cargarCategorias() {
    const respuesta = await fetch(API_CATEGORIAS);
    categorias = await respuesta.json();
    const tabla = document.getElementById("tablaCategorias");
    tabla.innerHTML = categorias.length
        ? categorias.map(c => `<tr><td>${c.id}</td><td>${c.nombre}</td><td>${texto(c.descripcion)}</td></tr>`).join("")
        : `<tr><td colspan="3" class="vacio">No hay categorías registradas</td></tr>`;
    const select = document.getElementById("selectCategoria");
    select.innerHTML = `<option value="">Sin categoría</option>` +
        categorias.map(c => `<option value="${c.id}">${c.nombre}</option>`).join("");
    document.getElementById("totalCategorias").textContent = categorias.length;
}

async function cargarLibros() {
    const respuesta = await fetch(API_LIBROS);
    libros = await respuesta.json();
    pintarLibros();
}

function pintarLibros() {
    const filtro = document.getElementById("buscar").value.toLowerCase();
    const lista = libros.filter(l =>
        (l.titulo || "").toLowerCase().includes(filtro) || (l.autor || "").toLowerCase().includes(filtro));
    const tabla = document.getElementById("tablaLibros");
    tabla.innerHTML = lista.length
        ? lista.map(l => `
            <tr>
                <td>${l.id}</td>
                <td>${l.titulo}</td>
                <td>${l.autor}</td>
                <td>${texto(l.editorial)}</td>
                <td>${texto(l.isbn)}</td>
                <td>${texto(l.anioPublicacion)}</td>
                <td>${texto(l.numeroPaginas)}</td>
                <td>${texto(l.idioma)}</td>
                <td>${l.categoria ? l.categoria.nombre : "—"}</td>
                <td>${l.precio != null ? "$" + Number(l.precio).toFixed(2) : "—"}</td>
                <td>${texto(l.stock)}</td>
                <td><span class="estado ${l.disponible ? "si" : "no"}">${l.disponible ? "Disponible" : "No disponible"}</span></td>
            </tr>`).join("")
        : `<tr><td colspan="12" class="vacio">No hay libros registrados</td></tr>`;
    document.getElementById("totalLibros").textContent = libros.length;
    document.getElementById("totalStock").textContent = libros.reduce((suma, l) => suma + (l.stock || 0), 0);
}

function numero(valor) {
    return valor === "" ? null : Number(valor);
}

async function guardar(url, datos, formulario, recargar) {
    const respuesta = await fetch(url, { method: "POST", headers: cabeceras(), body: JSON.stringify(datos) });
    if (respuesta.status === 401 || respuesta.status === 403) {
        mostrarAviso("Credenciales incorrectas o sin permiso de ADMIN", true);
        return;
    }
    if (!respuesta.ok) {
        mostrarAviso("No se pudo guardar", true);
        return;
    }
    formulario.reset();
    mostrarAviso("Guardado correctamente");
    await recargar();
}

document.getElementById("formLibro").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    const datos = {
        titulo: f.titulo.value,
        autor: f.autor.value,
        editorial: f.editorial.value,
        isbn: f.isbn.value || null,
        anioPublicacion: numero(f.anioPublicacion.value),
        numeroPaginas: numero(f.numeroPaginas.value),
        idioma: f.idioma.value,
        precio: numero(f.precio.value),
        stock: numero(f.stock.value),
        disponible: f.disponible.checked,
        categoria: f.categoria.value ? { id: Number(f.categoria.value) } : null
    };
    guardar(API_LIBROS, datos, f, cargarLibros);
});

document.getElementById("formCategoria").addEventListener("submit", e => {
    e.preventDefault();
    const f = e.target;
    guardar(API_CATEGORIAS, { nombre: f.nombre.value, descripcion: f.descripcion.value }, f, cargarCategorias);
});

document.getElementById("buscar").addEventListener("input", pintarLibros);

document.querySelectorAll(".pestana").forEach(boton => {
    boton.addEventListener("click", () => {
        document.querySelectorAll(".pestana").forEach(b => b.classList.remove("activa"));
        document.querySelectorAll(".vista").forEach(v => v.classList.remove("activa"));
        boton.classList.add("activa");
        document.getElementById(boton.dataset.vista).classList.add("activa");
    });
});

cargarCategorias();
cargarLibros();
