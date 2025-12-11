import React from 'react';
import { AppStep } from '../types';

interface StepIndicatorProps {
  currentStep: AppStep;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: '个人信息' },
    { number: 2, label: '手机验证' },
    { number: 3, label: '完成' },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center w-full">
        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const isCompleted = step.number < currentStep;

          return (
            <React.Fragment key={step.number}>
              {/* Line connecting steps */}
              {index > 0 && (
                <div
                  className={`flex-auto border-t-2 transition-colors duration-300 mx-4 ${
                    isCompleted ? 'border-blue-600' : 'border-gray-300'
                  }`}
                />
              )}

              <div className="relative flex flex-col items-center group">
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : isCompleted
                      ? 'border-blue-600 bg-white text-blue-600'
                      : 'border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                <div
                  className={`absolute top-full mt-2 w-14 text-center text-xs font-medium ${
                    isActive || isCompleted ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {step.label}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
