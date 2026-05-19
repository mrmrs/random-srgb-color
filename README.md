# random-srgb-color 

Generate a random sRGB CSS `color()` string.

## Installation

```bash
npm install --save random-srgb-color
```

## Usage

```javascript
var randomSRGBColor = require('random-srgb-color')

randomSRGBColor() // => color(srgb 0.74 0.21 0.45)
randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1); // => color(srgb 0.10 0.88 0.42 / 0.62)
randomSRGBColor(0, 100, 0, 100, 0, 100); // => color(srgb 73% 58% 24%)
randomSRGBColor(0, 100, 0, 100, 0, 100, 0, 100); // => color(srgb 34% 58% 73% / 50%)
randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1, true); // => { red: 0.85, green: 0.37, blue: 0.63, alpha: 0.92 }
```

or

```javascript
import randomSRGBColor from 'random-srgb-color'

randomSRGBColor() // => color(srgb 0.74 0.21 0.45)
randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1); // => color(srgb 0.10 0.88 0.42 / 0.62)
randomSRGBColor(0, 100, 0, 100, 0, 100); // => color(srgb 73% 58% 24%)
randomSRGBColor(0, 100, 0, 100, 0, 100, 0, 100); // => color(srgb 34% 58% 73% / 50%)
randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1, true); // => { red: 0.85, green: 0.37, blue: 0.63, alpha: 0.92 }
```

## API

```javascript
randomSRGBColor(minRed, maxRed, minGreen, maxGreen, minBlue, maxBlue, minAlpha, maxAlpha, useObjectExport)
```

All arguments are optional min/max pairs. Red, green, and blue default to `0..1`. Alpha is included only when `minAlpha` or `maxAlpha` is supplied.

Ranges at or below `1` are emitted as number channels, such as `0.42`. Ranges above `1` are emitted as percentage channels, so pass `0..100` to produce values like `42%`. Integer percentage ranges emit whole percentages; decimal percentage ranges preserve two decimals.

When `useObjectExport` is `true`, channels come back as raw numbers (not formatted strings), and `alpha` is omitted from the object when no alpha range was supplied.

Every supplied range value must be a finite number, and every minimum must be less than or equal to its maximum. Alpha ranges must stay between `0` and `100`, allowing either `0..1` number alpha or `0..100` percentage alpha. Invalid ranges throw `TypeError` or `RangeError`.

## Acknowledgements

Inspired by [random-hex-color by John Otander](http://github.com/johno/random-hex-color) which is repackaged from a [post by Paul Irish](http://www.paulirish.com/2009/random-hex-color-code-snippets/).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted for generative doings by Adam Morse ([@mrmrs_](https://twitter.com/mrmrs_)).

***
