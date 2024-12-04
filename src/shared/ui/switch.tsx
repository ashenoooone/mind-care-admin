import React from 'react';

export type SwitchOption = {
  label: string;
  value: string;
};

type Props = {
  options: SwitchOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export const Switch = ({
  options,
  selectedValue,
  onChange,
}: Props) => {
  return (
    <div className="flex bg-gray-100 rounded-lg shadow-sm">
      {options.map((option) => (
        <button
          key={option.value}
          className={`px-4 py-2 w-full text-sm font-medium rounded-lg transition ${
            selectedValue === option.value
              ? 'bg-white shadow text-black'
              : 'text-gray-500'
          }`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
