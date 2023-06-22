const test = require('ava');
const randomSRGBColor = require('./');

test('should return a valid sRGB color', (t) => {
  t.plan(10);

  for (let i = 0; i < 10; i++) {
    const color = randomSRGBColor();
    const regex = /^color\(srgb (?:\d+(\.\d+)?%?|\.\d+)(?: (?:\d+(\.\d+)?%?|\.\d+)){2}(?: \/ (?:\d+(\.\d+)?%?|\.\d+))?\)$/;

    t.regex(color, regex);
  }
});
