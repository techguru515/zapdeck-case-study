import { CircleItem } from './CircleUtils';

export interface CircleSet {
  name: string;
  items: CircleItem[];
}

export const circles: CircleSet[] = [
  {
    name: '2 Circles - Minimal',
    items: [
      { id: 1, label: 'First' },
      { id: 2, label: 'Second' },
    ],
  },
  {
    name: '3 Circles - Basic',
    items: [
      { id: 1, label: 'One' },
      { id: 2, label: 'Two' },
      { id: 3, label: 'Three' },
    ],
  },
  {
    name: '4 Circles - Standard',
    items: [
      { id: 1, label: 'North' },
      { id: 2, label: 'South' },
      { id: 3, label: 'East' },
      { id: 4, label: 'West' },
    ],
  },
  {
    name: '5 Circles - Short Labels',
    items: [
      { id: 1, label: 'Alpha' },
      { id: 2, label: 'Beta' },
      { id: 3, label: 'Gamma' },
      { id: 4, label: 'Delta' },
      { id: 5, label: 'Epsilon' },
    ],
  },
  {
    name: '6 Circles - Medium Labels',
    items: [
      { id: 1, label: 'Product' },
      { id: 2, label: 'Marketing' },
      { id: 3, label: 'Engineering' },
      { id: 4, label: 'Sales' },
      { id: 5, label: 'Support' },
      { id: 6, label: 'Operations' },
    ],
  },
  {
    name: '7 Circles - Mixed Labels',
    items: [
      { id: 1, label: 'A' },
      { id: 2, label: 'Very Long Label Name' },
      { id: 3, label: 'Short' },
      { id: 4, label: 'Another Extremely Long Label That Might Wrap' },
      { id: 5, label: 'Mid' },
      { id: 6, label: 'Test' },
      { id: 7, label: 'Final Item' },
    ],
  },
  {
    name: '8 Circles - Long Labels',
    items: [
      { id: 1, label: 'Customer Acquisition' },
      { id: 2, label: 'Revenue Growth' },
      { id: 3, label: 'Market Expansion' },
      { id: 4, label: 'Product Development' },
      { id: 5, label: 'Team Building' },
      { id: 6, label: 'Strategic Partnerships' },
      { id: 7, label: 'Technology Innovation' },
      { id: 8, label: 'Brand Recognition' },
    ],
  },
  {
    name: '9 Circles - Maximum',
    items: [
      { id: 1, label: 'Nine' },
      { id: 2, label: 'Planning' },
      { id: 3, label: 'Execution' },
      { id: 4, label: 'Monitoring' },
      { id: 5, label: 'Analysis' },
      { id: 6, label: 'Optimization' },
      { id: 7, label: 'Reporting' },
      { id: 8, label: 'Review' },
      { id: 9, label: 'Improvement' },
    ],
  },
];

