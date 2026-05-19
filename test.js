const test = require('ava').default;
const randomSRGBColor = require('./');

test('returns a valid sRGB color with two-decimal channels and no alpha', (t) => {
  for (let i = 0; i < 10; i++) {
    const color = randomSRGBColor();

    t.regex(color, /^color\(srgb (?:0\.\d{2}|1\.00) (?:0\.\d{2}|1\.00) (?:0\.\d{2}|1\.00)\)$/);
  }
});

test.serial('omits alpha when no alpha range is supplied', (t) => {
  withRandomValues([0.1, 0.2, 0.3], () => {
    t.is(randomSRGBColor(), 'color(srgb 0.10 0.20 0.30)');
  });

  withRandomValues([0.1, 0.2, 0.3, 0.4], () => {
    t.is(randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1), 'color(srgb 0.10 0.20 0.30 / 0.40)');
  });
});

test('treats undefined alpha arguments as omission', (t) => {
  const result = randomSRGBColor(0, 1, 0, 1, 0, 1, undefined, undefined);
  t.notRegex(result, / \/ /);
});

test('includes alpha when only one alpha argument is supplied', (t) => {
  t.regex(randomSRGBColor(0, 1, 0, 1, 0, 1, 0.5), / \/ /);
  t.regex(randomSRGBColor(0, 1, 0, 1, 0, 1, undefined, 0.5), / \/ /);
});

test('returns numeric channels when useObjectExport is true', (t) => {
  const color = randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1, true);

  t.is(typeof color, 'object');
  t.is(typeof color.red, 'number');
  t.is(typeof color.green, 'number');
  t.is(typeof color.blue, 'number');
  t.is(typeof color.alpha, 'number');
  t.true(color.red >= 0 && color.red <= 1);
  t.true(color.green >= 0 && color.green <= 1);
  t.true(color.blue >= 0 && color.blue <= 1);
  t.true(color.alpha >= 0 && color.alpha <= 1);
});

test('omits alpha from object output when not requested', (t) => {
  const color = randomSRGBColor(0, 1, 0, 1, 0, 1, undefined, undefined, true);
  t.false('alpha' in color);
});

test.serial('keeps percentage values within the requested range', (t) => {
  withRandomValues([0.73, 0.58, 0.24, 0.5], () => {
    t.is(randomSRGBColor(0, 100, 0, 100, 0, 100, 0, 100), 'color(srgb 73% 58% 24% / 50%)');
  });

  withRandomValues([0.5, 0.5, 0.5], () => {
    t.is(randomSRGBColor(1.5, 1.5, 2.25, 2.25, 10.5, 10.5), 'color(srgb 1.50% 2.25% 10.50%)');
  });
});

test.serial('decimal output never exceeds the requested max', (t) => {
  withRandomValues([0.9999999, 0.9999999, 0.9999999], () => {
    const color = randomSRGBColor(0, 0.5, 0, 0.5, 0, 0.5);
    t.is(color, 'color(srgb 0.50 0.50 0.50)');
  });
});

test.serial('integer percentage range can reach its inclusive maximum', (t) => {
  withRandomValues([0.9999999, 0.9999999, 0.9999999], () => {
    t.is(randomSRGBColor(0, 100, 0, 100, 0, 100), 'color(srgb 100% 100% 100%)');
  });
});

test('emits mixed units when channels use different range styles', (t) => {
  const color = randomSRGBColor(0, 1, 0, 100, 0, 1);
  t.regex(color, /^color\(srgb (?:0\.\d{2}|1\.00) \d{1,3}% (?:0\.\d{2}|1\.00)\)$/);
});

test.serial('validates ranges before generating any random values', (t) => {
  const originalRandom = Math.random;
  let calls = 0;
  Math.random = () => {
    calls++;
    return 0.5;
  };

  try {
    t.throws(() => randomSRGBColor(0, 1, 0, 1, 1, 0), {
      instanceOf: RangeError,
      message: 'blue minimum must be less than or equal to maximum'
    });
  } finally {
    Math.random = originalRandom;
  }

  t.is(calls, 0);
});

test('validates range values', (t) => {
  t.throws(() => randomSRGBColor(Number.NaN), {
    instanceOf: TypeError,
    message: 'red range must use finite numbers'
  });

  t.throws(() => randomSRGBColor(1, 0), {
    instanceOf: RangeError,
    message: 'red minimum must be less than or equal to maximum'
  });

  t.throws(() => randomSRGBColor(0, 1, 0, 1, 0, 1, 2, 1), {
    instanceOf: RangeError,
    message: 'alpha minimum must be less than or equal to maximum'
  });

  t.throws(() => randomSRGBColor(0, 1, 0, 1, 0, 1, -0.1, 1), {
    instanceOf: RangeError,
    message: 'alpha range must be between 0 and 100'
  });

  t.throws(() => randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 100.1), {
    instanceOf: RangeError,
    message: 'alpha range must be between 0 and 100'
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
