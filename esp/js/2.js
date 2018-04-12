const five =  require('johnny-five');
const board = new five.Board();

board.on('ready', () => {

	const knob = new five.Sensor({
		pin:'A1',
		type:'analog',
		freq: 100,
		thresholde: 5.7
	})

	const btn = new five.Button(2);
	const led = new five.Led(3);
	const lamp = { state: false, bright: 0 };

	const lampHandler = function() {
		if(lamp.state)
			led.intensity(lamp.bright);
		else 
			led.off();
	}

	const lampSwitch = () => {
		lamp.state = !lamp.state;
		lampHandler();
	}

	knob.on('change', function() {
		lamp.bright = five.Fn.map(this.value, 0, 1024, 10, 100);
		lampHandler();
	})

	btn.on('press', lampSwitch)
})
