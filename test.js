const test = require('ava');
const randomSRGBColor = require('./');

test.serial('returns a valid sRGB color', (t) => {
  for (let i = 0; i < 10; i++) {
    const color = randomSRGBColor();

    t.regex(color, /^color\(srgb -?\d+(?:\.\d+)?%? -?\d+(?:\.\d+)?%? -?\d+(?:\.\d+)?%?(?: \/ -?\d+(?:\.\d+)?%?)?\)$/);
  }
});

test.serial('omits alpha unless an alpha range is supplied', (t) => {
  withRandomValues([0.1, 0.2, 0.3], () => {
    t.is(randomSRGBColor(), 'color(srgb 0.10 0.20 0.30)');
  });

  withRandomValues([0.1, 0.2, 0.3, 0.4], () => {
    t.is(randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1), 'color(srgb 0.10 0.20 0.30 / 0.40)');
  });
});

test.serial('keeps percentage values within the requested range', (t) => {
  withRandomValues([0.73, 0.58, 0.24, 0.5], () => {
    t.is(randomSRGBColor(0, 100, 0, 100, 0, 100, 0, 100), 'color(srgb 73% 58% 24% / 50%)');
  });

  withRandomValues([0.5, 0.5, 0.5], () => {
    t.is(randomSRGBColor(1.5, 1.5, 2.25, 2.25, 10.5, 10.5), 'color(srgb 1.50% 2.25% 10.50%)');
  });
});

test.serial('validates range values', (t) => {
  t.throws(() => randomSRGBColor(Number.NaN), {
    instanceOf: TypeError,
    message: 'red range must use finite numbers'
  });

  t.throws(() => randomSRGBColor(1, 0), {
    instanceOf: RangeError,
    message: 'red minimum must be less than or equal to maximum'
  });
});

function withRandomValues(values, run) {
  const originalRandom = Math.random;
  let index = 0;

  Math.random = () => values[index++];

  try {
    run();
  } finally {
    Math.random = originalRandom;
  }
}
