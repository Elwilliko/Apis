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
        api.open('GET', url, true);
        api.send();

        api.onreadystatechange = function () {
            if(this.status== 200 && this.readyState == 4){
                let dat = JSON.parse(this.responseText);
                console.log(dat.length);

               let resultado = document.querySelector('#resultado');


                for(i=0; i<=dat.length ; i++){
                    console.log(i);
                    resultado.innerHTML += `<td>${dat[i].name}</td>` +
                        `<td>${dat[i].brewery_type}</td>` +
                        `<td>${dat[i].street}</td>` +
                        `<td>${dat[i].city}</td>` +
                        `<td>${dat[i].state}</td>` +
                        `<td>${dat[i].postalCode}</td>`

                };


                /* for(let item of dat){
                 }*/

            }

        }

    }

}


