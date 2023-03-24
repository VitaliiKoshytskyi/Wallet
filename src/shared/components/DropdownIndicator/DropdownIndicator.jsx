import PropTypes from 'prop-types';
import { components } from 'react-select';

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L10 10L19 1" stroke="black" />
      </svg>
    </components.DropdownIndicator>
  );
};

export default DropdownIndicator;

DropdownIndicator.propTypes = {
  props: PropTypes.object,
}