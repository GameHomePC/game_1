const canvas = document.querySelector('#root');
const socket = io('ws://192.168.10.62:4000');

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Не включаем аудио опцией `{ audio: true }` поскольку сейчас мы работаем только с изображениями
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => {
            console.log(stream);
            console.log(canvas);
        });
}
