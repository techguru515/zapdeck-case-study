import React, { useState } from 'react';
import CircleDiagram from '../components/CircleDiagram';
import { circles } from '../utils/circles';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [selectedCircleIndex, setSelectedCircleIndex] = useState(0);

  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <h1>Circle Diagram Layout - Case Study</h1>
        <p>Zapdeck Circle Diagram Implementation</p>
      </header>
      
      <div className="controls">
        <label htmlFor="circle-select">Select Circle Set: </label>
        <select
          id="circle-select"
          value={selectedCircleIndex}
          onChange={(e) => setSelectedCircleIndex(Number(e.target.value))}
        >
          {circles.map((circleSet, index) => (
            <option key={index} value={index}>
              {circleSet.name} ({circleSet.items.length} circles)
            </option>
          ))}
        </select>
      </div>
      
      <div className="diagram-container">
        <CircleDiagram items={circles[selectedCircleIndex].items} />
      </div>
      
      <div className="info">
        <h2>Current Circle Set: {circles[selectedCircleIndex].name}</h2>
        <p>Number of circles: {circles[selectedCircleIndex].items.length}</p>
        <ul>
          {circles[selectedCircleIndex].items.map((item, index) => (
            <li key={item.id}>
              Circle {index + 1}: {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

