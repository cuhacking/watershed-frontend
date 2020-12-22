import React from 'react';
import Input from './Input';

type SelectDropdownProps = {
  label: string;
  name: string;
  options: string[];
  value: string;
  onChange: (e?: React.MouseEvent) => void;
  selectClick: Function;
  padded?: boolean;
  required?: boolean;
  expand?: boolean;
  grow?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const SelectDropdown = ({
  name,
  options,
  onChange,
  selectClick,
  value,
  label,
  padded,
  required,
  expand,
}: SelectDropdownProps) => {
  return (
    <>
      <Input
        padded={padded}
        value={value}
        displayLabel
        onChange={onChange}
        name={name}
        placeHolder={label}
        list={`${label}-datalist`}
        required={required}
        expand={expand}
        grow
      />
      <datalist id={`${label}-datalist`}>
        {options.map((item, index) => (
          <option
            key={index}
            onClick={() => {
              selectClick(name, item);
            }}
            value={item}
          />
        ))}
      </datalist>
    </>
  );
};

export default SelectDropdown;
