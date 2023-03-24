import PropTypes from 'prop-types';
import Select from 'react-select';
import { useState } from 'react';
import DropdownIndicator from '../DropdownIndicator/DropdownIndicator';

const Dropdown = ({ options = [], onChange }) => {
  const [value, setValue] = useState(null);

  return (
    <Select
      options={options}
      components={{ DropdownIndicator }}
      value={value}
      placeholder="Select a category"
      onChange={value => {
        setValue(value);
        onChange({ type: 'category', data: value.value });
      }}
      styles={{
        placeholder: baseStyles => ({
          ...baseStyles,
          fontFamily: 'CirceRegular',
          color: '#BDBDBD',
          fontSize: '18px',
          lineHeight: 'calc(27 / 18)',
        }),
        control: baseStyles => ({
          ...baseStyles,
          width: '100%',
          height: '32px',
          border: 'none',
          borderBottom: '1px solid #E0E0E0',
          cursor: 'pointer',
          backgroundColor: 'transparent',
          '&:hover': null,
          boxShadow: 'none',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          transform: state.isFocused ? 'rotate(180deg)' : '',
          transition: 'transform 400ms',
        }),
        singleValue: baseStyles => ({
          ...baseStyles,
          fontFamily: 'CirceRegular',
          color: '#000000',
          fontSize: '18px',
          lineHeight: 'calc(27 / 18)',
        }),
        menu: base => ({
          ...base,
          margin: 0,
          width: '100%',
          padding: '12px 0',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(25px)',
          borderRadius: '20px',
          overflow: 'hidden',
        }),
        option: (_, state) => ({
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingLeft: '20px',
          fontFamily: 'CirceRegular',
          fontSize: '18px',
          lineHeight: 'calc(27 / 18)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          ':hover': {
            backgroundColor: state.isSelected ? '' : 'white',
            color: '#FF6596',
          },
          color: state.isSelected ? '#FF6596' : '#000000',
        }),
        menuList: base => ({
          ...base,
          '::-webkit-scrollbar': {
            width: '0px',
            height: '0px',
          },
        }),
      }}
    />
  );
};

export default Dropdown;

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Приклад використання
// const [value, setValue] = useState({ label: 'One', value: 'one' });

// <Dropdown
//   options={[
//     { label: 'One', value: 'one' },
//     { label: 'Two', value: 'two' },
//     { label: 'Three', value: 'three' },
//   ]}
//   value={value}
//   onChange={setValue}
// />;
