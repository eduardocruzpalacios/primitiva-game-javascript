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

// JUGAR

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
        console.log("Los números del premio son: " + premio);
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

    console.log("Tus apuestas fueron:");

    for (let j=0 ; j<apuestas.length ; j++) {

        console.log("***** APUESTA nº " + (j+1));
        
        for (let k=0 ; k<apuestas[j].length ; k++) {
            console.log(apuestas[j][k]);
        }
    }

    for (let l=0 ; l<apuestas.length ; l++) {
        for (let m=0 ; m<apuestas[l].length ; m++) {
            for (let n=0 ; n<premio.length ; n++) {
                if (apuestas[l][m] == premio[n]) {
                    aciertos++;
                }
            }
        }
    console.log("nº ACIERTOS APUESTA " + (l+1) + ": " + aciertos);
    aciertos = 0;
    }
}