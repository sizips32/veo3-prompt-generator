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
  const commonClasses = "w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 placeholder-gray-400 text-gray-100 font-inter text-base";
  return (
    <div className={`mb-6 ${className}`}>
      <label htmlFor={id} className="block text-sm font-semibold text-primary mb-2 font-poppins tracking-wide transition-colors duration-200">
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
