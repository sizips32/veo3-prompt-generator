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
      <label htmlFor={id} className="block text-sm font-medium text-indigo-300 mb-1">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out text-gray-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-gray-700 text-gray-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;