import React, { useState, useEffect } from 'react';
import { UserFormData } from '../types';

interface PhoneVerificationFormProps {
  formData: UserFormData;
  updateFormData: (data: Partial<UserFormData>) => void;
  onBack: () => void;
  onComplete: () => void;
}

const PhoneVerificationForm: React.FC<PhoneVerificationFormProps> = ({
  formData,
  updateFormData,
  onBack,
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    let timer: number;
    if (countdown > 0) {
      timer = window.setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = () => {
    // Basic phone validation
    if (!formData.phoneNumber || !/^\d{11}$/.test(formData.phoneNumber)) {
      setPhoneError('请输入有效的11位手机号码');
      return;
    }
    setPhoneError('');

    setIsSending(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsSending(false);
      setCountdown(60);
      // In a real app, you would trigger the SMS backend service here
      alert('模拟短信验证码已发送，测试验证码为: 123456');
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.phoneNumber) {
      setPhoneError('请输入手机号码');
      return;
    }

    if (!formData.verificationCode) {
      setError('请输入验证码');
      return;
    }

    // Simulate validation
    if (formData.verificationCode === '123456') {
      onComplete();
    } else {
      setError('验证码错误，请重新输入');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full max-w-lg mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">手机号验证</h2>
      <p className="text-gray-500 text-sm text-center mb-6">
        为了保障您的账户安全，我们需要验证您的手机号码
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            手机号码
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none ${
              phoneError ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="请输入11位手机号"
            maxLength={11}
          />
          {phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
        </div>

        {/* Verification Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            验证码
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={formData.verificationCode}
              onChange={(e) => updateFormData({ verificationCode: e.target.value })}
              className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none ${
                error ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="6位数字验证码"
              maxLength={6}
            />
            <button
              type="button"
              onClick={handleSendCode}
              disabled={countdown > 0 || isSending}
              className={`w-32 flex-shrink-0 font-medium text-sm rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                countdown > 0 || isSending
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                  : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'
              }`}
            >
              {isSending ? '发送中...' : countdown > 0 ? `${countdown}s 后重试` : '获取验证码'}
            </button>
          </div>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        <div className="pt-6 flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="w-1/3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            上一步
          </button>
          <button
            type="submit"
            className="w-2/3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            提交保存
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhoneVerificationForm;
