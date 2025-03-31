import React from 'react';
import PropTypes from 'prop-types';
import './StepProgress.scss';

const StepProgress = ({ steps, currentStep }) => {
    return (
        <div className="step-progress">
            {steps.map((_, index) => {
                const isCompleted = index < currentStep;
                const isActive = index === currentStep;
                const isLast = index === steps.length - 1;

                return (
                    <div className="step-wrapper" key={index}>
                        {!isLast && (
                            <div className={`step-line ${index < currentStep - 1 ? 'completed' : index === currentStep - 1 ? 'active' : ''}`} />
                        )}

                        <div className={`step-circle ${isCompleted ? 'completed' : isActive ? 'active' : ''}`}>
                            {isCompleted ? '✓' : index + 1}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

StepProgress.propTypes = {
    steps: PropTypes.arrayOf(PropTypes.string).isRequired,
    currentStep: PropTypes.number.isRequired,
};

export default StepProgress;
