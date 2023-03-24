import PropTypes from 'prop-types';
import Select from 'react-select';
import { useState } from 'react';
import DropdownIndicator from '../DropdownIndicator/DropdownIndicator';
import useMediaQuery from 'shared/hooks/useMediaQuery';

const DropdownCalendar = ({ options = [], startValue, onChange }) => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesctop = useMediaQuery('(min-width: 1280px)');
  const [value, setValue] = useState(startValue);

  let width = '100%';
  if (isDesctop) {
    width = '182px';
  } else if (isTablet) {
    width = '160px';
  }

  return (
    <Select
      options={options}
      // maxMenuHeight={157}
      components={{ DropdownIndicator }}
      value={value}
      onChange={value => {
        setValue(value);
        onChange(value.value);
      }}
      styles={{
        control: baseStyles => ({
          ...baseStyles,
          width,
          height: '50px',
          border: '1px solid #000000',
          borderRadius: '30px',
          cursor: 'pointer',
          transition: 'background-color 400ms',
          backgroundColor: 'transparent',
          '&:hover': null,
          boxShadow: 'none',
        }),
        indicatorSeparator: () => ({
          display: 'none',
        }),
        indicatorsContainer: () => ({
          paddingRight: '10px',
        }),
        dropdownIndicator: (baseStyles, state) => ({
          ...baseStyles,
          transform: state.isFocused ? 'rotate(180deg)' : '',
          transition: 'transform 400ms',
        }),
        valueContainer: baseStyles => ({
          ...baseStyles,
          paddingLeft: '16px',
        }),
        singleValue: baseStyles => ({
          ...baseStyles,
          fontFamily: 'CirceRegular',
          fontSize: '16px',
          lineHeight: 'calc(24 / 16)',
        }),
        menu: base => ({
          ...base,
          margin: 0,
          width,
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
          fontSize: '16px',
          lineHeight: 'calc(24 / 16)',
          cursor: 'pointer',
          ':hover': {
            backgroundColor: 'white',
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

export default DropdownCalendar;

DropdownCalendar.propTypes = {
  options: PropTypes.array.isRequired,
  startValue: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

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
