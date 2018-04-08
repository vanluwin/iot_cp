$(document).ready(() => {
    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyCK1rZPQQHGhSDFRI05979oY2mPALjV114",
        authDomain: "iot-cp-42.firebaseapp.com",
        databaseURL: "https://iot-cp-42.firebaseio.com",
        projectId: "iot-cp-42",
        storageBucket: "iot-cp-42.appspot.com",
        messagingSenderId: "860422669142"
    };
    firebase.initializeApp(config);
    
    const db = firebase.database(), led = db.ref('led');

    let led_state = null;
    // Escuta por modanças no led 
    led.on('value', data => {
        led_state = data.val();
    });

    $('#btn').click(() => {
        toggleIcon(led_state);
        led.set(!led_state);
    });

});

function toggleIcon(led_state) {
    if(led_state) {
        // Referencia ao icone na DOM
        $('#led').html('flash_off').css('color', '#77797c');
        return !led_state;
    }else {
        $('#led').html('flash_on').css('color', '#fcac00');
        return !led_state;
    } 
}