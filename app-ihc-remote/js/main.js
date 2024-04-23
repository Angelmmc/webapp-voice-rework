document.addEventListener('DOMContentLoaded', function () {
    // Definicion de elementos a modificar en el programa
    var orden = document.getElementById("orden");
    var edit = document.getElementById("editable");

    var flag = 0;
    // Funcon que se repite cada 4 segundos para actualizar la informacion de la orden
    // Se hace uso de la funcion getJson para obtener la informacion de MockApi

    function main() {
        getJson()
            .then(data => {
                //Si la promesa se cumple se imprime el valor obtenido en consola y en la pagina
                console.log(data);
                orden.innerHTML = data;
                //Ejecucion de metodo que ejecuta la funcion basado en el texto proporcionado
                read(data);

            })
            .catch(error => {
                console.error('Error al obtener o procesar los datos:', error);
            });

    }

    //Ejecucion del codigo main cada 4 segundos
    setInterval(main, 4000);

    // Funcion para obtiene el valor del json
    function getJson() {
        // La funcion trabaja con promesas para asegurar que los datos se obtengan antes de ser usados
        return new Promise((resolve, reject) => {

            // Se envia la solicitud HTTP a MockAPi usando el metodo GET por defecto
            fetch('https://660b0491ccda4cbc75dc4478.mockapi.io/accion')
                // Operacion asincrona en la que se espera a la respuesta de MockApi, si esta es invalida se indica que no se subio el archivo
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al subir el recurso');
                    }

                    return response.json();
                })
                // Operacion asincrona en la que si la informacion se subio correctamente se devuelve a la consola y la promesa se resuelve
                .then(data => {
                    //Si se obtiene la informacion se consulta el ultimo elemento del arreglo;
                    const ultimoRegistro = data[data.length - 1];

                    //Como es un arreglo indexado se obtiene el indice en esa posicion del arreglo
                    accion = ultimoRegistro.accion;

                    //Se devuelve el valor de la promesa una vez obtenida

                    resolve(accion);
                })
                // Operacion asincrona en la que si la informacion no se obtubo de la promesa manda error
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }

    //Funcion que imita el comportamiento de las condiciones en el codigo principal
    function read(result) {
        switch (true) {
            // Cambia el tamaño del texto al 5 de bootstrap al decir "tamaño 5"
            case result.includes("Cambiar tamaño de texto"):
                if (flag != 1) {

                    edit.innerHTML = '<span class="fs-5 fw-bold fst-italic">Texto editado</span>)';
                    flag = 1;
                }
                break;

            // Abre facebook al decir "Abre Facebook"
            case result.includes("Abrir facebook"):
                if (flag != 2) {
                    window.open('https://www.facebook.com/');
                    flag = 2;
                }
                break;

            // Abre una pestaña vacia en el navegador
            case result.includes("Abre nueva pestaña"):
                if (flag != 3) {
                    window.open('');
                    flag = 3;
                }
                break;

            // Cierra la pestaña actual
            case result.includes("Cerrar pestaña actual"):
                if (flag != 4) {
                    // Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                    window.close();
                    flag = 4;
                }
                break;

            case result.includes("cerrar navegador"):
                if (flag != 5) {
                    window.open('', '_self').close();

                    flag = 5;
                }
                break;

            default:
                orderResultDiv.innerHTML = `<p>Orden desconocida, intenta de nuevo</p>`;
                break;
        }
    }
});
