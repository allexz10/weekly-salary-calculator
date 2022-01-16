/* eslint-disable no-restricted-globals */

import React, { useState, useRef } from 'react';
import './Dropdown.scss';

type Props = {
  value: string;
  option: string[];
  label: string;
  onChange: (value: string) => void;
};

const Dropdown: React.FC<Props> = ({
  value, option, label, onChange,
}) => {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  return (
    <div className="dropdown" onMouseLeave={() => setOpen(false)}>
      <div className="button__wrapper">
        <img className="dropdown__user" src="employee.png" alt="userimage" />
        <button
          className="dropdown__button"
          ref={button}
          onClick={() => setOpen(!open)}
        >
          {value}
        </button>
        <span className="dropdown__label">{label}</span>
      </div>

      <div className={open ? 'dropdown__list active' : 'dropdown__list'}>
        {option.map((item) => (
          <div
            className="dropdown__list--item"
            key={Math.random()}
            onClick={() => {
              onChange(item);
              setOpen(!open);
              button.current?.focus();
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
