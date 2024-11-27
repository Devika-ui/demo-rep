import React, { useState } from 'react';
import '../css/ToggleSwitch.scss';

const ToggleSwitch = () => {
  const [selectedState, setSelectedState] = useState(2);

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  return (
    <fieldset>
      <div>
        <label className={selectedState === 2 ? 'selected' : ''}>
          AWS
          <input
            name="state"
            type="radio"
            value=2
            checked={selectedState === 2}
            onChange={() => handleStateChange(2)}
          />
        </label>
        <label className={selectedState === 'Common View' ? '' : ''}>
          Common View
          <input
            name="state"
            type="radio"
            value="Common View"
            checked={selectedState === 'Common View'}
            onChange={() => handleStateChange('Common View')}
          />
        </label>
        <label className={selectedState === 1 ? 'warning' : ''}>
          Azure
          <input
            name="state"
            type="radio"
            value=1
            checked={selectedState === 1}
            onChange={() => handleStateChange(1)}
          />
        </label>
      </div>
    </fieldset>
  );
};

export default ToggleSwitch;