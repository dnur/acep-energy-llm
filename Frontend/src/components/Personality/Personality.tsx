import React, { useState } from 'react';

const icons = [
  {
    id: 1,
    name: "Insightful",
    path: "./images/icons/insightful.jpeg"
  },
  {
    id: 2,
    name: "Direct",
    path: "./images/icons/direct.png"
  },
  {
    id: 3,
    name: "Investigative",
    path: "./images/icons/investigative.png"
  },
  {
    id: 4,
    name: "Organized",
    path: "./images/icons/organized.png"
  },
  {
    id: 5,
    name: "Analytical",
    path: "./images/icons/analytical.png"
  },
  {
    id: 6,
    name: "Creative",
    path: "./images/icons/creative.png"
  },
  {
    id: 7,
    name: "Data-Driven",
    path: "./images/icons/data-driven.png"
  },
  {
    id: 8,
    name: "Collaborative",
    path: "./images/icons/collaborative.png"
  },
  {
    id: 9,
    name: "Systematic",
    path: "./images/systematic.png"
  }
];

const Personality: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);

  const handleClick = (id: number) => {
    setSelectedIcon(id);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {icons.map(icon => (
          <div
            key={icon.id}
            onClick={() => handleClick(icon.id)}
            style={{ cursor: 'pointer', textAlign: 'center' }}
          >
            <img src={icon.path} alt={icon.name} style={{ width: '50px', height: '50px' }} />
            <div>{icon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Personality;