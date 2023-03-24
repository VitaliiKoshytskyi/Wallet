import styles from './loader-page.module.scss';
import useMediaQuery from 'shared/hooks/useMediaQuery';
import Loader from 'shared/components/Loader/Loader';

const LoaderPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <Loader width={isMobile ? '96' : '150'} />
      </div>
    </div>
  );
};

export default LoaderPage;
