import React from 'react';

const DirectionDetail = ({ direction, onClose }) => {
  const directionLegs = direction.data ? direction.data[0].legs : [];
  const directionMode = direction.mode ? direction.mode : '';

  if (!directionLegs || !directionLegs[0]) return <div />;

  const { startAddress, endAddress } = directionLegs[0];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        background: 'rgba(0,0,0,.6)',
        height: '300px',
        color: 'white',
        overflow: 'auto',
        padding: '1.5rem'
      }}
    >
      <button
        type="button"
        onClick={onClose}
        style={{ position: 'absolute', top: '5px', right: '5px' }}
      >
        X
      </button>
      <h4 className="title is-4" style={{ color: 'white' }}>
        {directionLegs[0].startAddress} -> {directionLegs[0].endAddress} ({
          directionMode
        })
        <div className="subtitle" style={{ color: 'white' }}>
          Duration: {directionLegs[0].duration.text}, Distance:{' '}
          {directionLegs[0].distance.text}
        </div>
      </h4>
      <ol>
        {directionLegs[0].steps.map((step, i) => (
          <li key={i} style={{ marginLeft: '16px' }}>
            <div dangerouslySetInnerHTML={{ __html: step.htmlInstructions }} />
          </li>
        ))}
      </ol>
      <a
        target="_blank"
        href={`https://www.google.com/maps/dir/${startAddress}/${endAddress}`}
        className="button"
      >
        Google Directions
      </a>
    </div>
  );
};

export default DirectionDetail;
