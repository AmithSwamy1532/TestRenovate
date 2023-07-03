import React, { useEffect, useState, useContext } from 'react';
// import ApplicationLoadingOverlay from 'orion-application/lib/application-loading-overlay';
// import { ApplicationIntlContext } from 'orion-application/lib/application-intl';
import { ApplicationIntlContext } from 'orion-application/lib/application-intl';
import { JournalContext } from '../slide-panel/PanelContainer';
import 'bootstrap/dist/css/bootstrap.css';
import ListItems from './ListItems';
import CellGrid from 'terra-cell-grid/lib/CellGrid';
import { Cell } from 'terra-cell-grid';
import styles from './container.module.css';
import classNames from 'classnames/bind';
import ModalManagerWorkings from '../compose-model/ModalManagerWorkings';

const MessageComponent = (props) => {
  const data = useContext(JournalContext);
  const [journals, setJournals] = useState(data.tableJournals);

  const cx = classNames.bind(styles);

  useEffect(() => {
    setJournals(data.tableJournals);
  }, [data.tableJournals]);

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    console.log(data.tableJournals);
    data.filterData(dateValue);
  };

  // const content = '';

  // if ((messages.length > 0 || reminders.length > 0) && isLoading) {

  // }

  // if (messages.length == 0 && reminders.length == 0 && isLoading) {
  //   content = <p>Found no messages</p>;
  // }

  // if (!isLoading) {
  //   content = <ApplicationLoadingOverlay isOpen backgroundStyle="clear" />;
  // }

  return (
    <>

      <CellGrid>
        <Cell key="cell-1" width={{ scalar: 3 }} ><input type="date" onChange={handleDateChange} id="date" /></Cell>
        <Cell key="cell-2" width={{ scalar: 4 }}> <h2 className={cx('center_align')} id="title">Inbox</h2></Cell>
        <Cell key="cell-2" width={{ scalar: 2 }}> </Cell>
        <Cell key="cell-3" width={{ scalar: 1 }} className={cx('right_align')}>   <ModalManagerWorkings /></Cell>
      </CellGrid>
      {
        (typeof journals.message !== 'undefined' || typeof journals.reminder !== 'undefined') && (
          <table className="table table-condensed" id="table-container" data-test="table-app">
            <thead id="table" data-test="table">
              <tr>
                <th key="Date">Date</th>
                <th key="Subject">Subject</th>
                <th key="To">To</th>
                <th key="From">From</th>
                <th key="Type">Type</th>
                <th key="Due">Due</th>
              </tr>
            </thead>

            {
              journals ? Object.keys(journals).map((keyName) => (
                <tbody key={Math.random()} id="table-body">
                  <ListItems key={keyName} title={keyName} messages={journals[keyName]} openSlidePanel={props.openSlidePanel} />
                </tbody>
              )) : <></>
            }

          </table>
        )
      }
      {(typeof journals.message === 'undefined' && typeof journals.reminder === 'undefined')
        && (
          <div className="alert alert-danger">
            <strong>Oops!</strong>
            No Messages and Reminders are there.
          </div>
        )}
    </>
  );
};

export default MessageComponent;
