document.addEventListener('DOMContentLoaded', function () {
    //Definicion de elementos a modificar en el programa
    const startRecognitionBtn = document.getElementById('startRecognition');
    const orderResultDiv = document.getElementById('orderResult');

    const controlTexto = document.getElementById("controlTexto");

    //Metodo asincrono para escuchar el reconocimiento de texto

    startRecognitionBtn.addEventListener('click', function () {
        // Comprobar si el navegador soporta reconocimiento de voz
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'es-ES'; // Establecer el idioma a español

            // Configurar evento de resultado
            recognition.onresult = function (event) {
                const result = event.results[0][0].transcript;

                console.log('Orden identificada:', result);

                switch (true) {
                    //Cambia el tamaño del texto al 5 de bootstrap al decir "tamaño 5"
                    case result.includes("tamaño 5"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        controlTexto.innerHTML = '<span class="fs-5 fw-bold fst-italic">Texto Modificable</span>';
                        //Metodo que inserta la acción realizada y fecha en MockApi
                        insertarJson("Cambiar tamaño de texto");
                        break;

                    //Abre facebook al decir "Abre Facebook"
                    case result.includes("Abre Facebook"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        insertarJson("Abrir facebook");
                        window.open('https://www.facebook.com/');
                        break;

                    //Abre una pestaña vacia en el navegador
                    case result.includes("Abre nueva pestaña"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        insertarJson("Abrir pestaña en blanco");
                        window.open('');
                        break;

                    //Cierra la pestaña actual
                    case result.includes("Cerrar pestaña actual"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        //Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
                        insertarJson("Cerrar pestaña actual").then(() => {
                            window.close();
                        })
                            .catch(error => {
                                console.error('Error al insertar JSON:', error);
                            });
                        break;

                    case result.includes("cerrar navegador"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        //Operacion asincrona para insertar en Json ya que si no la ventana se cierra antes de insertar la informacion Json
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

            };

            // Iniciar reconocimiento
            recognition.start();
        } else {
            alert('El reconocimiento de voz no es soportado por este navegador.');
        }
    });

    //Funcion para guarda ordenes o acciones realizadas de acuerdo a la accion definida en el parametro

    function insertarJson(accion) {
        //La funcion trabaja con promesas para asegurar que los datos se inserten antes de que se realice la acción ya que si no
        //al cerrar una ventana esto ocurrira antes de que se envien los datos a MockApi
        return new Promise((resolve, reject) => {
            //Definicion de la fecha actual formateandola al formato local de la PC
            const fechaHoraActual = new Date();
            const fechaHoraFormateada = fechaHoraActual.toLocaleString();

            //Se crea un objeto que almacena la fecha obtenida y la accion del parametro
            const recurso = {
                id: 1,
                accion: accion,
                fecha: fechaHoraFormateada
            };

            // Se confierte el objeto a JSON
            const recursoJSON = JSON.stringify(recurso);

            // Se envia la solicitud HTTP a MockAPi usando el metodo POST, cabecera que indica que es Json y el cuerpo del json del objeto
            fetch('https://660b0491ccda4cbc75dc4478.mockapi.io/accion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: recursoJSON
            })
            //Operacion asincrona en la que se espera a la respuesta de MockApi, si esta es invalida se indica que no se subio el archivo
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al subir el recurso');
                    }
                    return response.json();
                })
                //Operacion asincrona en la que si la informacion se subio correctamente se devuelve a la consola y la promesa se resuelve
                .then(data => {
                    console.log('Recurso subido exitosamente:', data);
                    resolve(data);
                })
                //Operacion asincrona en la que si la informacion no subio correctamente se devuelve un error en la consola y se rechaza la promesa
                .catch(error => {
                    console.error('Error:', error);
                    reject(error);
                });
        });
    }
});


/*
Set interval 

problema: el set interval tiene una duracion fija de reiniciar una funcion, como hacer que la duracion se adapte hasta que se termine de decirl la orden
usar recognition.continue para que este a la escucha como alexa
*/