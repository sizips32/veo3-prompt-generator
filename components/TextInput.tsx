import React, { ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  isTextArea?: boolean;
  rows?: number;
}

const TextInput = ({ label, id, name, value, onChange, placeholder, isTextArea = false, rows = 3 }: TextInputProps): JSX.Element => {
  const commonClasses = "w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out placeholder-gray-400 text-gray-100";
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-indigo-300 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={commonClasses}
        />
      ) : (
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default TextInput;