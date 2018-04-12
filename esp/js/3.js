const five = require('johnny-five');
const board = new five.Board();

const firebase = require("firebase");

const config = {
    apiKey: "AIzaSyCK1rZPQQHGhSDFRI05979oY2mPALjV114",
    authDomain: "iot-cp-42.firebaseapp.com",
    databaseURL: "https://iot-cp-42.firebaseio.com",
    projectId: "iot-cp-42",
    storageBucket: "iot-cp-42.appspot.com",
    messagingSenderId: "860422669142"
};

firebase.initializeApp(config);

const ref = firebase.database().ref('/iot_home');

board.on('ready', function () {

    const knob = new five.Sensor({
        pin: 'A1',
        type: 'analog',
        freq: 100,
        thresholde: 10.2
    });

    const button = new five.Button(2);
    const led = new five.Led(3);

    let lamp = { /*state: false, bright: 0 */ }

    ref.once('value').then(data => {
        try {
            lamp = {
                state: data.val().state,
                bright: data.val().bright
            }
        } catch (error) {
            lamp = {
                state: false,
                bright: 10
            }
            console.log("um erro ocorreu ao inicializar o banco\numa nova instancia foi criada");
            writeData();
        }
    });

    var lampHandler = () => {
        if (lamp.state)
            led.intensity(lamp.bright)
        else
            led.off();
    }

    var writeData = () => {
        ref.set({
            "lamp": lamp
        })
    }

    var lampSwitch = () => {
        lamp.state = !lamp.state;
        writeData();
        lampHandler();
    }

    knob.on('change', function () {
        lamp.bright = five.Fn.map(this.value, 0, 1024, 10, 100);
        if (lamp.state) writeData();
    })

    ref.on('child_changed', (data) => {
        lamp.state = data.val().state;
        lamp.bright = data.val().bright;
        lampHandler();
    })

    button.on('press', lampSwitch)
})