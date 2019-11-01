import keycode from 'keycode';

export default class Input {
  constructor() {
    this.keys = new Map();

    this.start();
  }

  start = () => {
    window.addEventListener('keydown', e => {
      const key = keycode(e);

      console.log(key);

      this.keys.set(key, true);
    });

    window.addEventListener('keyup', e => {
      const key = keycode(e);

      this.keys.set(key, false);
    });

    const funGamePad = (e) => {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index, e.gamepad.id,
        e.gamepad.buttons.length, e.gamepad.axes.length
      );
    };

    window.addEventListener("gamepadconnected", funGamePad, false);
    window.addEventListener("gamepaddisconnected", funGamePad, false);
  };

  hasDown = key => {
    const lowerCaseKey = key.toLowerCase();

    const value = this.keys.get(lowerCaseKey);

    return Boolean(value);
  };

  get hasDownGlobal() {
    let status = false;

    this.keys.forEach(item => {
      if (item) {
        status = true;
      }
    });

    return status;
  }

  update() {
    const gamePads = navigator.getGamepads();

    if (gamePads[0]) {
      const gamePad = gamePads[0];
      const id = gamePad.id;
      const axes = gamePad.axes.map(axe => axe.toFixed(2));
      const buttons = gamePad.buttons.map((button, index) => ({
        name: `button_${index}`,
        pressed: button.pressed,
        touched: button.touched,
        value: button.value
      }));

      // button_0 - button x
      // button_7 - right stick
      // button_15 - right
      // button_14 - left
      // button_14 - left

      buttons.forEach(button => {
        const {
          name,
          pressed
        } = button;

        this.keys.set(name, pressed);
      });

      // document.getElementById('gamePadInfoId').innerText = id;
      // document.getElementById('gamePadInfoAxes').innerText = axes;
      // document.getElementById('gamePadInfoButtons').innerText = JSON.stringify(buttons);
    }
  }
}
