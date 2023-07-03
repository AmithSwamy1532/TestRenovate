import React from 'react';
import Card from 'terra-card/lib/Card';
import styles from './container.module.css';

const TableContainer = (props) => (
  <>
    <div>
      <Card variant="raised">
        {props.children}
      </Card>
    </div>
  </>
);

export default TableContainer;
