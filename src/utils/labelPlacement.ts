export interface LabelPosition {
  x: number;
  y: number;
  textAnchor: 'start' | 'end';
}

export const getLabelPosition = (
  angle: number,
  circleX: number,
  circleY: number,
  smallCircleRadius: number
): LabelPosition => {
  const isRightSide = (angle >= 270 && angle < 360) || (angle >= 0 && angle < 90);
  
  const labelOffset = smallCircleRadius + 40;
  
  if (isRightSide) {
    return {
      x: circleX + labelOffset,
      y: circleY,
      textAnchor: 'start' as const,
    };
  } else {
    return {
      x: circleX - labelOffset,
      y: circleY,
      textAnchor: 'end' as const,
    };
  }
};

