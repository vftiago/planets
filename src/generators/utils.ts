const boxMullerTransform = () => {
  const u1 = 1 - Math.random();
  const u2 = Math.random();

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

  return z0;
};

export const getNormallyDistributedRandomNumber = (mean: number, stddev: number) => {
  const z0 = boxMullerTransform();

  const result = z0 * stddev + mean;

  return result;
};
