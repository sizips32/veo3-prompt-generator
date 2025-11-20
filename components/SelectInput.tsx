import { ChangeEvent } from 'react';
import { SelectOption } from '../types';

interface SelectInputProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

const SelectInput = ({ label, id, name, value, onChange, options }: SelectInputProps): JSX.Element => {
  return (
    <div className="mb-6 group">
      <label htmlFor={id} className="block text-sm font-medium text-gray-400 mb-2 ml-1 group-focus-within:text-accent transition-colors duration-300">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-4 bg-surface/50 glass-input rounded-xl text-gray-100 font-inter text-base appearance-none cursor-pointer focus:outline-none transition-all duration-300"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-bg-tertiary text-gray-100">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400 group-focus-within:text-accent transition-colors duration-300">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectInput;
