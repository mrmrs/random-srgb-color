'use strict';

module.exports = function randomSRGBColor(
  minRed = 0, maxRed = 1,
  minGreen = 0, maxGreen = 1,
  minBlue = 0, maxBlue = 1,
  minAlpha, maxAlpha,
  useObjectExport = false
) {
  const includeAlpha = minAlpha !== undefined || maxAlpha !== undefined;
  const alphaLow = minAlpha ?? 0;
  const alphaHigh = maxAlpha ?? 1;

  validateRange('red', minRed, maxRed);
  validateRange('green', minGreen, maxGreen);
  validateRange('blue', minBlue, maxBlue);
  if (includeAlpha) validateRange('alpha', alphaLow, alphaHigh);

  const red = randomChannelNumber(minRed, maxRed);
  const green = randomChannelNumber(minGreen, maxGreen);
  const blue = randomChannelNumber(minBlue, maxBlue);
  const alpha = includeAlpha ? randomChannelNumber(alphaLow, alphaHigh) : null;

  if (useObjectExport) {
    const result = { red, green, blue };
    if (includeAlpha) result.alpha = alpha;
    return result;
  }

  const r = formatChannel(red, minRed, maxRed);
  const g = formatChannel(green, minGreen, maxGreen);
  const b = formatChannel(blue, minBlue, maxBlue);

  if (!includeAlpha) {
    return `color(srgb ${r} ${g} ${b})`;
  }

  const a = formatChannel(alpha, alphaLow, alphaHigh);
  return `color(srgb ${r} ${g} ${b} / ${a})`;
};

function randomChannelNumber(min, max) {
  if ((min > 1 || max > 1) && Number.isInteger(min) && Number.isInteger(max)) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const minBucket = Math.round(min * 100);
  const maxBucket = Math.round(max * 100);
  const bucket = Math.floor(Math.random() * (maxBucket - minBucket + 1)) + minBucket;
  return bucket / 100;
}

function formatChannel(value, min, max) {
  if (min > 1 || max > 1) {
    if (Number.isInteger(min) && Number.isInteger(max)) {
      return `${value}%`;
    }
    return `${value.toFixed(2)}%`;
  }

  return value.toFixed(2);
}

function validateRange(channel, min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError(`${channel} range must use finite numbers`);
  }
  if (min > max) {
    throw new RangeError(`${channel} minimum must be less than or equal to maximum`);
  }
}
