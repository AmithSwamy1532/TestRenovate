import React, { useContext } from 'react';
import Button from 'terra-button';
import '../../../../index.css';
import classNames from 'classnames/bind';
import {
  DisclosureManagerContext,
} from 'terra-disclosure-manager';
import styles from './styles/ContentFooter.module.css';

export default function ContentFooter() {
  const cx = classNames.bind(styles);

  const disclosureManager = useContext(DisclosureManagerContext);
  return (
    <div className={cx('button-css')}>
      <Button
        text="Cancel"
        className="customButton"
        onClick={() => {
          disclosureManager.dismiss();
        }}
      />
    </div>
  );
}
