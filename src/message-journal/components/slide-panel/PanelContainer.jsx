import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Base from 'terra-base';
import panelStyles from '../styles/panelContainer.module.css';
import SlidePanelManagerComponent from './SlidePanelManagerComponent';
import { getJournals, getPatient } from '../services/index';
import { notificationStatus } from '../utils/constant';

import OverlayContainer from 'terra-overlay/lib/OverlayContainer';
import LoadingOverlay from 'terra-overlay/lib/LoadingOverlay';

import '../styles/common.css';

const cx = classNames.bind(panelStyles);

// This value could be sent from the server as well
const locale = (navigator.languages && navigator.languages[0])
  || navigator.language
  || navigator.userLanguage
  || 'en';

// Context for journal items and operation into it.
export const JournalContext = React.createContext({});

// Context for notification handling for any task.
export const NotificationContext = React.createContext({});

export const LoaderContext = React.createContext({});

// component to initialize the application initialize the 
const PanelContainer = () => {
  const [journals, setJournals] = useState();
  const [patient, setPatient] = useState();
  const [tableJournals, setTableJournals] = useState({});
  const [alert, setAlert] = useState({ isAlertOpen: false, status: notificationStatus.DEFAULT, message: "" });
  const [loader, setLoader] = useState({ show: false, isRelativeToContainer: true });

  //This method is used to reformat the data structure by grouping based on message type and subject as per table view requirement.
  const changeRequiredStructure = (array) => {
    const groupByMessageType = array?.reduce((result, obj) => {
      (result[obj.message_type] = result[obj.message_type] || []).push(obj);
      return result;
    }, {});
    const messages = groupByMessageType.message;
    const updatedMessagess = messages?.reduce((result, obj) => {
      (result[obj.subject] = result[obj.subject] || []).push(obj);
      return result;
    }, {});

    groupByMessageType.message = updatedMessagess;

    const reminders = groupByMessageType.reminder;

    const updatedReminders = reminders?.reduce((result, obj) => {
      (result[obj.subject] = result[obj.subject] || []).push(obj);
      return result;
    }, {});
    groupByMessageType.reminder = updatedReminders;

    return groupByMessageType;
  };

  // This method is used to convert iso date to format require for comparison
  const normalDate = (isoDate) => {
    const getdate = new Date(isoDate);
    const year = getdate.getFullYear();
    let month = getdate.getMonth() + 1;
    let dt = getdate.getDate();

    if (dt < 10) {
      dt = `0${dt}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }

    const convertDate = `${year}-${month}-${dt}`;
    return convertDate;
  };

  //This method is used to delete the journal item from state of journal to rerender the changes(after api call).
  const deleteJournal = (journalId) => {
    const jour = [...journals];
    const result = jour.filter(journal => journal.id !== journalId);
    const requiredData = changeRequiredStructure(result);
    setJournals([...result]);
    setTableJournals(requiredData);
  };

  //This method is used to filter the data based on given date.
  const filterData = (date) => {
    const filteredJournal = journals.filter(journal => normalDate(journal.created_date) === date);
    const requiredData = changeRequiredStructure(filteredJournal);
    setTableJournals(requiredData);
  }

  //This method is used to add new journal item into state of journal to rerender the changes(after api call)
  const addJournal = (values) => {
    const jour = [...journals];
    jour.push(values);
    setJournals([...jour]);
    const requiredData = changeRequiredStructure(jour);
    setTableJournals(requiredData);
  };

  //This method is used to update the journal item from state of journal to rerender the changes(after api call)
  const updateJournal = (values, journalId) => {
    const jour = [...journals];
    const updatedJournals = jour.map(journal => {
      if (journal.id === journalId) {
        return {
          ...journal, subject: values.subject, created_date: values.created_date, senders_display: values.senders_display, recipients_display: values.recipients_display, message: values.message,
        };
      }

      return journal;
    });
    const requiredData = changeRequiredStructure(updatedJournals);
    setJournals([...updatedJournals]);
    setTableJournals(requiredData);
  };

  // This method is used to control the notification show and hide after operation OfflineAudioCompletionEvent.
  const toggleAlert = (alertFlag, statusFlag = notificationStatus.DEFAULT, message = "") => {
    setAlert({ isAlertOpen: alertFlag, status: statusFlag, message });
    if (alertFlag) {
      setTimeout(() => {
        setAlert({ isAlertOpen: false, status: statusFlag, message });
      }, 5000);
    }
  }

  useEffect(() => {
    getJournals().then(res => {
      console.log(res,"resGet");
      const requiredData = changeRequiredStructure(res.data);
      setTableJournals(requiredData);
      setJournals(res.data);
    }
    );
    getPatient(1).then(res => setPatient(res.data));
  }, []);

  const handleTriggerFullScreenOverlay = (loaderFlag) => {
    console.log("loader: ", loaderFlag)
    setLoader({ show: loaderFlag, isRelativeToContainer: true });
  }

  const addLoadingOverlay = () => {
    console.log(loader);
    return (
      <LoadingOverlay isOpen={loader.show} isAnimated isRelativeToContainer={loader.isRelativeToContainer} zIndex="6000" />
    );
  }

  return (
    <Base locale={locale}>
      <LoaderContext.Provider value={{
        loader,
        handleTriggerFullScreenOverlay
      }}>
        <NotificationContext.Provider value={
          {
            alert,
            toggleAlert
          }
        }>
          <JournalContext.Provider value={
            {
              journals,
              tableJournals,
              deleteJournal,
              updateJournal,
              addJournal,
              filterData,
              patient
            }
          }
          >
            <OverlayContainer overlay={addLoadingOverlay()}>
              <div className={cx('pnl-container')}><SlidePanelManagerComponent /></div>
            </OverlayContainer>
          </JournalContext.Provider>
        </NotificationContext.Provider>
      </LoaderContext.Provider>
    </Base>
  );
};

export default PanelContainer;
