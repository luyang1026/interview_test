import React, { useState } from 'react';
import { UserFormData, IDType, Gender, ID_TYPE_LABELS } from '../types';

interface PersonalInfoFormProps {
  formData: UserFormData;
  updateFormData: (data: Partial<UserFormData>) => void;
  onNext: () => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  updateFormData,
  onNext,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = '请输入姓名';
    if (!formData.idNumber.trim()) newErrors.idNumber = '请输入证件号码';
    if (!formData.birthday) newErrors.birthday = '请选择出生日期';
    if (!formData.gender) newErrors.gender = '请选择性别';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 md:p-8 w-full max-w-lg mx-auto animate-fade-in-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">填写个人信息</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            姓名
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none ${
              errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="请输入您的真实姓名"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>

        {/* ID Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            证件类型
          </label>
          <div className="relative">
            <select
              value={formData.idType}
              onChange={(e) => updateFormData({ idType: e.target.value as IDType })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white transition-colors outline-none"
            >
              {Object.entries(ID_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ID Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            证件号码
          </label>
          <input
            type="text"
            value={formData.idNumber}
            onChange={(e) => updateFormData({ idNumber: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none ${
              errors.idNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="请输入证件号码"
          />
          {errors.idNumber && <p className="mt-1 text-xs text-red-500">{errors.idNumber}</p>}
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            出生日期
          </label>
          <input
            type="date"
            value={formData.birthday}
            onChange={(e) => updateFormData({ birthday: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none ${
              errors.birthday ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.birthday && <p className="mt-1 text-xs text-red-500">{errors.birthday}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            性别
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.Male}
                checked={formData.gender === Gender.Male}
                onChange={() => updateFormData({ gender: Gender.Male })}
                className="text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-gray-700">男</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={Gender.Female}
                checked={formData.gender === Gender.Female}
                onChange={() => updateFormData({ gender: Gender.Female })}
                className="text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <span className="text-gray-700">女</span>
            </label>
          </div>
          {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-transform transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            下一步
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
