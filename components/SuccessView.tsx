import React from 'react';
import { UserFormData, ID_TYPE_LABELS, Gender } from '../types';

interface SuccessViewProps {
  formData: UserFormData;
}

const SuccessView: React.FC<SuccessViewProps> = ({ formData }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg mx-auto text-center animate-fade-in-up">
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
        <svg
          className="h-10 w-10 text-green-600"
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
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-2">保存成功</h2>
      <p className="text-gray-500 mb-8">
        您的个人信息已成功验证并保存。
      </p>

      <div className="bg-gray-50 rounded-lg p-6 text-left border border-gray-100">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          提交信息摘要
        </h3>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">姓名</dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium">{formData.fullName}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">性别</dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium">
                {formData.gender === Gender.Male ? '男' : '女'}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">证件类型</dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium">
              {ID_TYPE_LABELS[formData.idType]}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">证件号码</dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium font-mono">
              {formData.idNumber}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">手机号码</dt>
            <dd className="mt-1 text-sm text-gray-900 font-medium font-mono">
              {formData.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8">
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  );
};

export default SuccessView;
