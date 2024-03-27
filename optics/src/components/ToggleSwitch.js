import React, { useState } from 'react';
import '../css/ToggleSwitch.scss';

const ToggleSwitch = () => {
  const [selectedState, setSelectedState] = useState('AWS');

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  return (
    <fieldset>
      <div>
        <label className={selectedState === 'AWS' ? 'selected' : ''}>
          AWS
          <input
            name="state"
            type="radio"
            value="AWS"
            checked={selectedState === 'AWS'}
            onChange={() => handleStateChange('AWS')}
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
        <label className={selectedState === 'Azure' ? 'warning' : ''}>
          Azure
          <input
            name="state"
            type="radio"
            value="Azure"
            checked={selectedState === 'Azure'}
            onChange={() => handleStateChange('Azure')}
          />
        </label>
      </div>
    </fieldset>
  );
};

export default ToggleSwitch;
