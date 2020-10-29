var el = document.querySelector('#boton');

if (el) {
    el.addEventListener('click', function(){
        obtenerDatos();
    });
}

function obtenerDatos() {
    variable = document.getElementById("texto").value;

    if(variable != ""){
        let url = 'https://api.openbrewerydb.org/breweries/search?query='+ variable;
        const api = new XMLHttpRequest();


        api.onreadystatechange = function () {
            if(this.status== 200 && this.readyState == 4){
                let dat = JSON.parse(this.responseText);
                console.log(dat.length);



                paginas_totales = dat.length;
                paginas_totales /= 5;
                console.log(paginas_totales + '<--');
                let parteEntera = parseInt(paginas_totales);
                let parteDecimal =5*( paginas_totales - parteEntera)
                paginas_totales = Math.ceil(paginas_totales);
                console.log(dat);

                let paginas = [] // Numero de Paginas.
                let items = [] // Items por pagina.
                let cantidaItems = 0;
                for (let i = 0; i < parteEntera; i++) {
                    console.log('Pagina actual -->' + i);

                    let resultado = document.querySelector('#resultado');
                    for (let j = i*5; j < (i+1)*5; j++) {
                        if(i >= 1){
                            let contador = (i*5)+j;
                        }
                        items.push(dat[j]);
                        cantidaItems ++;
                    }
                    paginas.push(items);
                    items = [];
                }
                for (let i = cantidaItems; i < dat.length; i++) {
                    items.push(dat[i])
                }
                paginas.push(items);
                console.log(paginas.length);
                globalThis.paginas = paginas;
                globalThis.indexActual = 0;
                Btn();
                mostrarResultados();
                console.log("<--------------------->");
            }

        }
        api.open('GET', url, true);
        api.send();

    }

}
function mostrarResultados(){
    let items = globalThis.paginas[globalThis.indexActual];
    console.log(items);
    let detalles = '';
    document.getElementById("resultado").innerHTML = detalles;
    for (let i = 0; i < items.length; i++) {
        // console.log(items[i].idDrink);
        detalles += `<tr>`+
            `<td>${items[i].name}</td>` +
            `<td>${items[i].brewery_type}</td>` +
            `<td>${items[i].street}</td>` +
            `<td>${items[i].city}</td>` +
            `<td>${items[i].state}</td>` +
            `<td>${items[i].country}</td>` +
            `<td>${items[i].longitude}</td>` +
            `<td>${items[i].latitude}</td>` +
            `<td>${items[i].website_url}</td>`+

            `</tr>`;

    }
    document.getElementById("resultado").innerHTML = detalles;

}

function Btn() {

    if(globalThis.indexActual+1 == globalThis.paginas.length){
        document.getElementById('adelante').disabled=true;
        document.getElementById('atras').disabled=false;
    }else if(globalThis.indexActual==0){
        document.getElementById('atras').disabled=true;
        document.getElementById('adelante').disabled=false;
    }

}

function Avance() {
    Btn();
    globalThis.indexActual ++;
    console.log('<---------------------->');
    mostrarResultados();
}

function Retrazo() {
    Btn();
    globalThis.indexActual --;
    console.log("---------");
    mostrarResultados();
}


