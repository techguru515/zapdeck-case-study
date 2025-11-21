export interface CirclePosition {
  x: number;
  y: number;
  angle: number;
  number: number;
}

export interface CircleItem {
  id: number;
  label: string;
}

export const calculatePositions = (
  items: CircleItem[],
  centerX: number,
  centerY: number,
  largeCircleRadius: number
): CirclePosition[] => {
  const numItems = items.length;
  if (numItems === 0) return [];
  
  const positions: CirclePosition[] = [];
  const angleStep = (2 * Math.PI) / numItems; 
  
  const startAngle = -Math.PI / 2;
  
  for (let i = 0; i < numItems; i++) {
    const angle = startAngle + (i * angleStep);
    
    const x = centerX + largeCircleRadius * Math.cos(angle);
    const y = centerY + largeCircleRadius * Math.sin(angle);
    
    const angleDegrees = (angle * 180 / Math.PI + 360) % 360;
    
    positions.push({
      x,
      y,
      angle: angleDegrees,
      number: i + 1,
    });
  }
  
  return positions;
};

export const getLabelPosition = (
  angle: number,
  circleX: number,
  circleY: number,
  smallCircleRadius: number
) => {
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

