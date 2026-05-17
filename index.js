'use strict';

module.exports = function randomSRGBColor(
  minRed = 0, maxRed = 1,
  minGreen = 0, maxGreen = 1,
  minBlue = 0, maxBlue = 1,
  minAlpha, maxAlpha
) {
  const includeAlpha = minAlpha !== undefined || maxAlpha !== undefined;
  const alphaLow = minAlpha ?? 0;
  const alphaHigh = maxAlpha ?? 1;

  validateRange('red', minRed, maxRed);
  validateRange('green', minGreen, maxGreen);
  validateRange('blue', minBlue, maxBlue);
  if (includeAlpha) validateRange('alpha', alphaLow, alphaHigh);

  const red = randomChannel(minRed, maxRed);
  const green = randomChannel(minGreen, maxGreen);
  const blue = randomChannel(minBlue, maxBlue);

  if (!includeAlpha) {
    return `color(srgb ${red} ${green} ${blue})`;
  }

  const alpha = randomChannel(alphaLow, alphaHigh);
  return `color(srgb ${red} ${green} ${blue} / ${alpha})`;
};

function randomChannel(min, max) {
  if (min > 1 || max > 1) {
    if (Number.isInteger(min) && Number.isInteger(max)) {
      return `${randomIntegerInclusive(min, max)}%`;
    }
    return `${randomTwoDecimalInclusive(min, max)}%`;
  }
  return randomTwoDecimalInclusive(min, max);
}

function randomIntegerInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTwoDecimalInclusive(min, max) {
  const minBucket = Math.round(min * 100);
  const maxBucket = Math.round(max * 100);
  const bucket = Math.floor(Math.random() * (maxBucket - minBucket + 1)) + minBucket;
  return (bucket / 100).toFixed(2);
}

function validateRange(channel, min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError(`${channel} range must use finite numbers`);
  }
  if (min > max) {
    throw new RangeError(`${channel} minimum must be less than or equal to maximum`);
  }
}
