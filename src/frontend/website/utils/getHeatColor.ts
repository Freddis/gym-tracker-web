const colors = [
  '#00FF00',
  '#05FA00',
  '#0AF500',
  '#10EF00',
  '#15EA00',
  '#1AE500',
  '#1FE000',
  '#24DB00',
  '#2AD500',
  '#2FD000',
  '#34CB00',
  '#39C600',
  '#3EC100',
  '#44BB00',
  '#49B600',
  '#4EB100',
  '#53AC00',
  '#58A700',
  '#5EA100',
  '#639C00',
  '#689700',
  '#6D9200',
  '#728D00',
  '#788700',
  '#7D8200',
  '#828000',
  '#877800',
  '#8D7200',
  '#926D00',
  '#976800',
  '#9C6300',
  '#A15E00',
  '#A15E00',
  '#AC5300',
  '#B14E00',
  '#B64900',
  '#BB4400',
  '#C13E00',
  '#C63900',
  '#CB3400',
  '#D02F00',
  '#D52A00',
  '#DB2400',
  '#E01F00',
  '#E51A00',
  '#EA1500',
  '#EF1000',
  '#F50A00',
  '#FA0500',
  '#FF0000',
].reverse();
function getColorIndex(value: number, minValue: number, maxValue: number) {
  if (maxValue === minValue) return 0;

  let t = (value - minValue) / (maxValue - minValue);
  t = Math.max(0, Math.min(1, t));

  return Math.round(t * (colors.length - 1));
}

export function getHeatColor(value: number, minValue: number, maxValue: number) {
  const index = getColorIndex(value, minValue, maxValue);
  return colors[index];
}
