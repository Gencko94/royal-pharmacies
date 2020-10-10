import React from 'react';

export default function AnimatedSlides({ data }) {
  return (
    <div className="animated__slides-container">
      {data.map((item, i) => {
        return (
          <div className="animated__slides-card" key={i}>
            <div className="imgBx">
              <img src={item} alt={item} />
            </div>
            <div className="content">
              <h1>Explore the things</h1>
              <p>Lorem Ipsum sit amet dolor, adiplscing elit sed do eiusmod</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
