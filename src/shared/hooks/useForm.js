import PropTypes from 'prop-types';
import { useState } from 'react';

const useForm = ({ initialState, onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    setState(prevState => {
      const { name, value, checked, type } = target;
      const newValue = type === 'checkbox' ? checked : value;

      return { ...prevState, [name]: newValue };
    });
  };

  const handleDataChange = ({ type, data }) => {
    if (type === 'date') {
      setState(prevState => {
        return { ...prevState, transactionDate: data };
      });
    }
    if (type === 'type') {
      setState(prevState => {
        return { ...prevState, type: data };
      });
    }
    if (type === 'category') {
      setState(prevState => {
        return { ...prevState, categoryId: data };
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  return { state, setState, handleChange, handleDataChange, handleSubmit };
};

export default useForm;

useForm.propTypes = {
  initialState: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
