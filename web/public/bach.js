const init = function() {
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
    
    const db = firebase.database();
    const led = db.ref('/iot_home/lamp/state');
    
    let led_state = null;

    led.once('value', data => {
        led_state = data.val();
    });

    // Escuta por modanças no led 
    led.on('value', data => {
        led_state = data.val();
        toggleIcon(led_state);
    });

    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
        led.set(!led_state);
    });

    pot_ref = db.ref('/iot_home/lamp/bright');
    pot_txt = document.getElementById('pot_value');
    
    pot_ref.on('value', data => {
        pot_txt.innerText = data.val();
    });

}();

function toggleIcon(led_state) {
    // Referencia ao icone na DOM
    let led = document.getElementById('led');
    
    if(led_state) {
        led.style = 'color: #fcac00;'
        led.innerText = 'flash_on';
        //$('#led').html('flash_off').css('color', '#77797c');
    }else {
        led.style = 'color: #77797c;'
        led.innerText = 'flash_off';
        //$('#led').html('flash_on').css('color', '#fcac00');
    } 
    
}

