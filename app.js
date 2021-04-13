// ETIQUETA RANGE

var elInput = document.getElementById('numeroApuestas');

if (elInput) {
    
    var etiqueta = document.querySelector('#etiqueta');
  
    if (etiqueta) {

        etiqueta.innerHTML = elInput.value;

        elInput.addEventListener('input', function() {
            etiqueta.innerHTML = elInput.value;
        }, false);
    }
}

// INICIO

var numeroApuestas;
var apuestas;

function inicio() {
    let cajaQuitar = document.getElementById('inicio');
    let cajaPoner = document.getElementById('apuestas');
    cajaQuitar.style.display = "none";
    numeroApuestas = elInput.value;
    console.log(numeroApuestas);
    cajaPoner.style.display = "flex";
    crearTablero();
    apuestas = new Array(Number(numeroApuestas));
    for (let i=0 ; i< apuestas.length; i++) {
        apuestas[i] = [];
        console.log("apuesta definida " + (i+1));
    }
}

// CREAR TABLERO DE APUESTAS

function crearTablero() {

    let codigoA, bloque, titulo, casillas, unidad, codigoN;
    let tablero = document.getElementById("tablero");

    for (let i = 1; i <= numeroApuestas; i++) {

        codigoA = "a" + i;

        bloque = document.createElement("div");
        bloque.setAttribute("id",codigoA);

        titulo = document.createElement("h3");
        titulo.innerHTML = "apuesta nº " + i;
        bloque.appendChild(titulo);

        casillas = document.createElement("div");
        casillas.setAttribute("id","casillas");

        for (let j = 1; j<=49 ; j++) {
            unidad = document.createElement("span");
            if (j<10) {
                unidad.innerHTML = "0" + j;
            }
            else {
                unidad.innerHTML = j;
            }
            codigoN = codigoA + "n" + j;
            unidad.setAttribute("id",codigoN);
            let funcion = "checkCasilla('" + codigoN + "')";
            unidad.setAttribute("onclick",funcion)
            casillas.appendChild(unidad);
        }
        bloque.appendChild(casillas);
        tablero.appendChild(bloque);
    }
}

// CADA VEZ QUE USUARIO CLICA UNA CASILLA DE NÚMERO

function checkCasilla(id) {

    let elementoClicado = document.getElementById(id);

    let idElementoClicado = elementoClicado.getAttribute("id");
    let apuestaClicada = idElementoClicado.charAt(1);
    let index = Number(apuestaClicada-1);

    console.log("id elemento = " + idElementoClicado);
    idElementoClicado = idElementoClicado.substring(3);
    idElementoClicado = Number(idElementoClicado);
    console.log("id elemento = " + idElementoClicado);
    console.log("apuesta clicada = " + apuestaClicada);
    console.log("index apuestas = " + index);

    let contiene = apuestas[index].includes(idElementoClicado);
    console.log(contiene);

    let lleno = apuestas[index].length === 6;
    console.log(lleno);

    if (!contiene && !lleno) {
        elementoClicado.classList.toggle('checked');
        apuestas[index].push(idElementoClicado);
        console.log("nº elementos en apuesta " + apuestaClicada + " = " + apuestas[index].length);
    }
    else if (!contiene && lleno) {
        alert("Ese bloque está completo, quita otro número antes de añadir");
    }
    else {
        elementoClicado.classList.toggle('checked');
        let indexElemento = apuestas[index].indexOf(idElementoClicado);
        apuestas[index].splice(indexElemento,1);
        console.log("nº elementos en apuesta " + apuestaClicada + " = " + apuestas[index].length);
    }
}

// BOTÓN ECHAR PRIMITIVA

var contador = 0;
var premio;

function jugar() {

    for (let i=0 ; i< numeroApuestas; i++) {
        if (apuestas[i].length == 6) {
            contador++;
        }
    }

    console.log("nº apuestas = " + numeroApuestas);
    console.log("contador = " + contador);

    if (contador != numeroApuestas) {
        alert("debe rellenar todas las apuestas (6 números cada una)");
        contador = 0;
    }
    else if (contador == numeroApuestas) {
        console.log("apuestas completas");
        premio = rellenarVectorAleatoriosEntre(1,49,6);
        let cajaQuitar = document.getElementById('apuestas');
        let cajaPoner = document.getElementById('resultados');
        cajaQuitar.style.display = "none";
        cajaPoner.style.display = "flex";
        let imprimirPremio = document.getElementById('premio');
        imprimirPremio.innerHTML = "premio = " + premio;
        checkApuesta(apuestas, premio);
    }
}

function rellenarVectorAleatoriosEntre(min,max,longitudVector) {

    let vector = [];
    for (let i=0; i<longitudVector; i++) {
        vector.push(-1);
    }
    
    let aleatorio;
		
    for (let j=0 ; j<vector.length ; j++) {

        do {
            aleatorio = Math.floor(Math.random()*(min-max)+max);
        }
        while(aleatorio==vector[0] || aleatorio==vector[1] || aleatorio==vector[2] || aleatorio==vector[3] || aleatorio==vector[4] || aleatorio==vector[5]);
        
        vector[j] = aleatorio;
    }
	return vector;
}

function checkApuesta(apuestas,premio) {

    let aciertos = 0;
    let caja, titulo, numeros, acertados;
    let tablero = document.getElementById("rank");

    for (let j=0 ; j<apuestas.length ; j++) {

        caja = document.createElement("div");

        titulo = document.createElement("h3");
        titulo.innerHTML = "*** APUESTA " + (j+1) + " ***";
        caja.appendChild(titulo);

        numeros = document.createElement("p");
        numeros.innerHTML = "números = " +apuestas[j];
        caja.appendChild(numeros);
        
        for (let k=0 ; k<apuestas[j].length ; k++) {
            for (let l=0 ; l<premio.length ; l++) {
                if (apuestas[j][k] == premio[l]) {
                    aciertos++;
                }
            }
            
        }
        acertados = document.createElement("p");
        acertados.innerHTML = "aciertos = " + aciertos;
        caja.appendChild(acertados);
        aciertos = 0;

        tablero.appendChild(caja);
    }
}