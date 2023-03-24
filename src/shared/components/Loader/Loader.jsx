import PropTypes from 'prop-types'
import { RotatingLines } from 'react-loader-spinner';

const Loader = ({ width }) => {
  return <RotatingLines strokeColor="#24CCA7" strokeWidth="5" width={width} visible={true} />;
};

export default Loader;

Loader.propTypes = {
  width: PropTypes.string,
}