import React, { useState } from 'react';
import { UserFormData, IDType, AppStep } from './types';
import StepIndicator from './components/StepIndicator';
import PersonalInfoForm from './components/PersonalInfoForm';
import PhoneVerificationForm from './components/PhoneVerificationForm';
import SuccessView from './components/SuccessView';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.PersonalInfo);
  const [formData, setFormData] = useState<UserFormData>({
    fullName: '',
    idType: IDType.IdentityCard,
    idNumber: '',
    birthday: '',
    gender: '',
    phoneNumber: '',
    verificationCode: '',
  });

  const updateFormData = (data: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-900 font-sans pb-12">
      {/* Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                    V
                </div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">实名认证系统</h1>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl px-4 mt-6">
        
        {/* Progress Indicator */}
        <div className="mb-8">
            <StepIndicator currentStep={currentStep} />
        </div>

        {/* Dynamic Step Content */}
        <div className="transition-all duration-500 ease-in-out">
          {currentStep === AppStep.PersonalInfo && (
            <PersonalInfoForm
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
            />
          )}

          {currentStep === AppStep.PhoneVerification && (
            <PhoneVerificationForm
              formData={formData}
              updateFormData={updateFormData}
              onBack={handlePrevStep}
              onComplete={handleNextStep}
            />
          )}

          {currentStep === AppStep.Success && (
            <SuccessView formData={formData} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Secure Verify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
