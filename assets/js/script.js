document.addEventListener('DOMContentLoaded', function () {
    const startRecognitionBtn = document.getElementById('startRecognition');
    const orderResultDiv = document.getElementById('orderResult');

    const controlTexto = document.getElementById("controlTexto");



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
                        controlTexto.innerHTML = '<span class="fs-5 fw-bold fst-italic">Beto mi patrón</span>';
                        insertarJson("Cambiar tamaño de texto");

                        break;
                    //Abre facebook al decir "Abre Facebook"
                    case result.includes("Abre Facebook"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        window.open('https://www.facebook.com/');
                        break;
                    case result.includes("Abre nueva pestaña"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        window.open('');
                        break;
                    case result.includes("Cerrar pestaña actual"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        window.close();
                        break;
                    case result.includes("cerrar navegador"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        window.open('', '_self').close();
                        break;
                    case result.includes("cerrar navegador"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        window.open('', '_self').close();
                        break;
                    default:
                        // Código a ejecutar si result no incluye ninguna de las keywords
                        break;
                }

            };

            // Iniciar reconocimiento
            recognition.start();
        } else {
            alert('El reconocimiento de voz no es soportado por este navegador.');
        }
    });

    function insertarJson(accion) {
        const fechaHoraActual = new Date();
        const fechaHoraFormateada = fechaHoraActual.toLocaleString();

        const recurso = {
            id: 1,
            accion: accion,
            fecha: fechaHoraFormateada
        };

        // Paso 2: Convertir a JSON
        const recursoJSON = JSON.stringify(recurso);

        // Paso 3: Enviar la solicitud HTTP
        fetch('https://660b0491ccda4cbc75dc4478.mockapi.io/accion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: recursoJSON
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al subir el recurso');
                }
                return response.json();
            })
            .then(data => {
                console.log('Recurso subido exitosamente:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


});
