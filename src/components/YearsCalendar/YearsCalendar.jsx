import PropTypes from 'prop-types';
import DropdownCalendar from 'shared/components/DropdownCalendar/DropdownCalendar';
import { options } from './options';

export const year = new Date().getFullYear();
const initialValue = { label: year, value: year };
const yearsValue = options();

const YearsCalendar = ({onChange}) => {
  const handleChange = value => {
    onChange(value);
  };

  return <DropdownCalendar options={yearsValue} startValue={initialValue} onChange={handleChange} />;
};

export default YearsCalendar;

YearsCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
}