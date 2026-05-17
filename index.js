'use strict';

module.exports = function randomSRGBColor(minRed = 0, maxRed = 1, minGreen = 0, maxGreen = 1, minBlue = 0, maxBlue = 1, minAlpha = 0, maxAlpha = 1) {
  const includeAlpha = arguments.length > 6;

  const red = randomValue('red', minRed, maxRed);
  const green = randomValue('green', minGreen, maxGreen);
  const blue = randomValue('blue', minBlue, maxBlue);
  const alpha = includeAlpha ? randomValue('alpha', minAlpha, maxAlpha) : '';

  return `color(srgb ${red} ${green} ${blue}${includeAlpha ? ` / ${alpha}` : ''})`;
};

function randomValue(channel, min, max) {
  validateRange(channel, min, max);

  if (isPercentageRange(min, max)) {
    return `${randomPercentage(min, max)}%`;
  }

  return randomBetween(min, max).toFixed(2);
}

function randomPercentage(min, max) {
  if (Number.isInteger(min) && Number.isInteger(max)) {
    return Math.floor(randomBetween(min, max + 1));
  }

  return randomBetween(min, max).toFixed(2);
}

function validateRange(channel, min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError(`${channel} range must use finite numbers`);
  }

  if (min > max) {
    throw new RangeError(`${channel} minimum must be less than or equal to maximum`);
  }
}

function isPercentageRange(min, max) {
  return min > 1 || max > 1;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
