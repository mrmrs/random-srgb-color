# random-srgb-color 

Generate a random srgb color.

## Installation

```bash
npm install --save random-srgb-color
```

## Usage

```javascript
var randomSRGBColor = require('random-srgb-color')


randomSRGBColor() // => color(srgb .74 .21 .45)
randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1); // => color(srgb .10 .88 .42 / .62)
randomSRGBColor(0, 100, 0, 100, 0, 100); // => color(srgb 73% 58% 24%)
randomSRGBColor(0, 100, 0, 100, 0, 100, 0, 100); // => color(srgb 34% 58% 73% / 50%)
```

or

```javascript
import randomSRGBColor from 'random-srgb-color'

randomSRGBColor() // => color(srgb .74 .21 .45)
randomSRGBColor(0, 1, 0, 1, 0, 1, 0, 1); // => color(srgb .10 .88 .42 / .62)
randomSRGBColor(0, 100, 0, 100, 0, 100); // => color(srgb 73% 58% 24%)
randomSRGBColor(0, 100, 0, 100, 0, 100, 0, 100); // => color(srgb 34% 58% 73% / 50%)
```

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

