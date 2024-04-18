document.addEventListener('DOMContentLoaded', function () {
    // Definicion de elementos a modificar en el programa
    var orden = document.getElementById("orden");
    var edit = document.getElementById("editable");

    // Cambiar el contenido HTML del div utilizando innerHTML
   
    function main(){
    getJson()
        .then(data => {
            console.log(data);
             orden.innerHTML = data;
             read(data);
            
        })
        .catch(error => {
            console.error('Error al obtener o procesar los datos:', error);
        });

    }

    //setInterval(main, 10000);


    // Funcion para guarda ordenes o acciones realizadas de acuerdo a la accion definida en el parametro
    function getJson() {
        // La funcion trabaja con promesas para asegurar que los datos se inserten antes de que se realice la acción ya que si no
        // al cerrar una ventana esto ocurrira antes de que se envien los datos a MockApi
        return new Promise((resolve, reject) => {
            // Definicion de la fecha actual formateandola al formato local de la PC

            // Se crea un objeto que almacena la fecha obtenida y la accion del parametro

            // Se envia la solicitud HTTP a MockAPi usando el metodo POST, cabecera que indica que es Json y el cuerpo del json del objeto
            fetch('https://660b0491ccda4cbc75dc4478.mockapi.io/accion')
                // Operacion asincrona en la que se espera a la respuesta de MockApi, si esta es invalida se indica que no se subio el archivo
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al subir el recurso');
                    }

                    return response.json();
                    let dataArray
                })
                // Operacion asincrona en la que si la informacion se subio correctamente se devuelve a la consola y la promesa se resuelve
                .then(data => {
                    console.log('Recurso subido exitosamente:', data);
                    const ultimoRegistro = data[data.length - 1];

                    hola =ultimoRegistro.accion;

                    // Verificar si el último registro contiene el parámetro de texto deseado
                        
                    resolve(hola);
                    return hola
                })
                // Operacion asincrona en la que si la informacion no subio correctamente se devuelve un error en la consola y se rechaza la promesa
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }

    function read(result){
        switch (true) {
            // Cambia el tamaño del texto al 5 de bootstrap al decir "tamaño 5"
            case result.includes("Cambiar tamaño de texto"):
                edit.innerHTML= '<span class="fs-5 fw-bold fst-italic">Beto mi patrón</span>';
                break;

            // Abre facebook al decir "Abre Facebook"
            case result.includes("Abrir facebook"):
                window.open('https://www.facebook.com/');
                break;

            // Abre una pestaña vacia en el navegador
            case result.includes("Abre nueva pestaña"):
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                insertarJson("Abrir pestaña en blanco");
                window.open('');
                break;

            // Cierra la pestaña actual
            case result.includes("Cerrar pestaña actual"):
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                // Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                insertarJson("Cerrar pestaña actual").then(() => {
                    window.close();
                })
                .catch(error => {
                    console.error('Error al insertar JSON:', error);
                });
                break;

            case result.includes("cerrar navegador"):
                orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                // Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                insertarJson('Cerrar navegador')
                .then(() => {
                    window.open('', '_self').close();
                })
                .catch(error => {
                    console.error('Error al insertar JSON:', error);
                });
                break;

            default:
                orderResultDiv.innerHTML = `<p>Orden desconocida, intenta de nuevo</p>`;
                break;
        }
    }
});
