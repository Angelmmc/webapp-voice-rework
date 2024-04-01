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
                const keyword = "tamaño 3";

                // console.log('Orden identificada:', result);
                console.log(event);

                switch (true) {
                    case result.includes("tamaño 3"):
                        orderResultDiv.innerHTML = `<p>Orden identificada: <strong>${result}</strong></p>`;
                        break;
                    case result.includes("keyword2"):
                        // Código a ejecutar si result incluye la keyword2
                        break;
                    case result.includes("keyword3"):
                        // Código a ejecutar si result incluye la keyword3
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
});
