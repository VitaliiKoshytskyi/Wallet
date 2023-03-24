import PropTypes from 'prop-types';
import { useState } from 'react';
import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import addDays from 'date-fns/addDays';
import { toDateString } from 'shared/utils/toDateString';
import calendarIcon from 'images/svg/calendary.svg';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './calendar.module.scss';

const AddTransactionCalendar = ({ stateDate, onChange }) => {
  const [startDate, setStartDate] = useState(new Date(stateDate));

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.inputBox}>
      <img className={styles.icon} src={calendarIcon} alt="Calendar icon" />
      <button className={styles.field} type="button" onClick={onClick} ref={ref}>
        {value}
      </button>
    </div>
  ));

  return (
    <DatePicker
      showIcon
      selected={startDate}
      onChange={date => {
        setStartDate(date);
        onChange({ type: 'date', data: toDateString(date) });
      }}
      customInput={<CustomInput />}
      dateFormat="dd.MM.yyyy"
      maxDate={addDays(new Date(), 0)}
    />
  );
};

export default AddTransactionCalendar;

AddTransactionCalendar.propTypes = {
  stateDate: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
