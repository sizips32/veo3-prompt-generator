import * as React from 'react';
import { ChangeEvent } from 'react';
// @ts-ignore - JSX 타입 정의를 위해 필요

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  isTextArea?: boolean;
  rows?: number;
  className?: string;
}

const TextInput = ({ label, id, name, value, onChange, placeholder, isTextArea = false, rows = 3, className = '' }: TextInputProps): React.ReactElement => {
  const commonClasses = "w-full p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base placeholder-gray-500 focus:outline-none transition-all duration-300";

  return (
    <div className={`mb-6 group ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2 ml-1 group-focus-within:text-primary transition-colors duration-300">
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
          className={commonClasses + ' resize-none'}
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
