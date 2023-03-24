import PropTypes from 'prop-types';
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import wallet from 'images/wallett.png';
import styles from './chart-diagram.module.scss';
import numeral from 'numeral';
import useMediaQuery from 'shared/hooks/useMediaQuery';


const PieChartComponent = ({ data = [], totalSum = 0, expense }) => {
  const isMobile = useMediaQuery('(min-width: 320px)');
  const isTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

 const size = {
    mobile: {
      cx: 135,
      cy: 135,
      innerR: 100,
      outerR: 140,
      width: 280,
      height: 280
    },
    tablet: {
      cx: 163,
      cy: 163,
      innerR: 110,
      outerR: 165,
      width: 336,
      height: 336
    },
    desktop: {
      cx: 140,
      cy: 140,
      innerR: 100,
      outerR: 143,
      width: 288,
      height: 288
    }
  }

const getSize = (isDesktop, isTablet) => {
  switch (true) {
    case isDesktop:
      return size.desktop;
    case isTablet:
      return size.tablet;
    default:
      return size.mobile;
  }
};
   const { cx, cy, innerR, outerR,width,height } = getSize(
    isDesktop,
    isTablet,
    isMobile
  );


  return (
   <>
      {expense === 0 ? (
        <div className={styles.box}>
        <img className={styles.img} src={wallet} alt="There is no transaction" />
        <p className={styles.descr}>There are no transactions during this period</p>
        </div>
      ) : (

      <PieChart width={width} height={height}>
        <Pie  data={data}  cx={cx} cy={cy} innerRadius={innerR} outerRadius={outerR} fill="#8884d8" dataKey="value">
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={item.color} />
          ))}

          <Label className={styles.label} fill="#000000" value={`₴${numeral(totalSum).format('0,00.00').replaceAll(",","\u00A0")}`} position="center" />

        </Pie>
        <Tooltip />
      </PieChart>

     )}
    </>
)
};

export default PieChartComponent;

PieChartComponent.propTypes = {
  data: PropTypes.array.isRequired,
  totalSum: PropTypes.number,
  expense: PropTypes.number,
}