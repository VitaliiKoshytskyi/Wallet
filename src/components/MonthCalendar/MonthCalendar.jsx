import PropTypes from 'prop-types';
import DropdownCalendar from 'shared/components/DropdownCalendar/DropdownCalendar';
import { options } from './options';

export const month = new Date().getMonth();
const monthName = options[month].label;
const initialValue = { label: monthName, value: month + 1 };

const MonthCalendar = ({ onChange }) => {
  const handleChange = value => {
    onChange(value);
  };

  return <DropdownCalendar options={options} startValue={initialValue} onChange={handleChange} />;
};

export default MonthCalendar;

MonthCalendar.propTypes = {
  onChange: PropTypes.func.isRequired,
};
