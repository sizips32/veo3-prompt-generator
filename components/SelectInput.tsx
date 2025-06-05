import React, { ChangeEvent } from 'react';
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
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-semibold text-primary mb-2 font-poppins tracking-wide transition-colors duration-200">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-800/70 glass border border-primary/30 rounded-xl shadow focus:shadow-glow focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 text-gray-100 font-inter text-base"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-800 text-gray-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
