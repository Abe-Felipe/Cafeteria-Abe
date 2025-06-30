import React from 'react';

const stepContainerStyle = {
  marginBottom: '2.5rem',
};

const stepItemStyle = {
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '1rem',
  transition: 'all 0.4s ease',
};

const stepNumberStyle = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#e0e0e0',
  color: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  marginRight: '15px',
  transition: 'background-color 0.4s ease',
};

const stepLabelStyle = {
  fontWeight: '500',
  transition: 'color 0.4s ease',
};

const activeNumberStyle = {
  backgroundColor: '#4E342E',
};

const activeLabelStyle = {
  color: '#4E342E',
};

const Stepper = ({ currentStep }) => {
  const steps = ['Base', 'Extras', 'Confirmar'];

  return (
    <div style={stepContainerStyle}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = currentStep >= stepNumber;
        return (
          <div key={step} style={{ ...stepItemStyle, opacity: isActive ? 1 : 0.6 }}>
            <div style={{ ...stepNumberStyle, ...(isActive && activeNumberStyle) }}>
              &#10003; 
            </div>
            <span style={{ ...stepLabelStyle, ...(isActive && activeLabelStyle) }}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;