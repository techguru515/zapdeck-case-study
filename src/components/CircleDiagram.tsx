import React from 'react';
import { calculatePositions, CircleItem } from '../utils/geometry';
import { getLabelPosition } from '../utils/labelPlacement';

interface CircleDiagramProps {
  items: CircleItem[];
}

const CircleDiagram: React.FC<CircleDiagramProps> = ({ items }) => {
  const CANVAS_WIDTH = 1920;
  const CANVAS_HEIGHT = 1080;
  const CENTER_X = CANVAS_WIDTH / 2;
  const CENTER_Y = CANVAS_HEIGHT / 2;
  
  const LARGE_CIRCLE_RADIUS = 350;
  
  const SMALL_CIRCLE_RADIUS = LARGE_CIRCLE_RADIUS / 4;
  
  const positions = calculatePositions(items, CENTER_X, CENTER_Y, LARGE_CIRCLE_RADIUS);
  
  return (
    <svg
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      style={{ border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}
    >
      <circle
        cx={CENTER_X}
        cy={CENTER_Y}
        r={LARGE_CIRCLE_RADIUS}
        fill="none"
        stroke="#333"
        strokeWidth="6"
      />
      
      {positions.map((pos, index) => {
        const item = items[index];
        const labelPos = getLabelPosition(pos.angle, pos.x, pos.y, SMALL_CIRCLE_RADIUS);
        
        return (
          <g key={pos.number}>
            <circle
              cx={pos.x}
              cy={pos.y}
              r={SMALL_CIRCLE_RADIUS}
              fill="#4587ddff"
              stroke="#4587ddff"
              strokeWidth="6"
            />
            
            <text
              x={pos.x}
              y={pos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="48"
              fontWeight="bold"
              fill="#fff"
            >
              {pos.number}
            </text>
            
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor={labelPos.textAnchor}
              dominantBaseline="central"
              fontSize="36"
              fill="#333"
            >
              {item.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default CircleDiagram;

