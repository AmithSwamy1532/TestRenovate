import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContentContainer from 'terra-content-container';
import {
  DisclosureManagerHeaderAdapter,
  DisclosureManagerContext,
} from 'terra-disclosure-manager';

import Spacer from 'terra-spacer';

import '../styles/common.css';

import { Form, Field } from 'react-final-form';
import InputField from 'terra-form-input/lib/InputField';
import DateTimePicker from 'terra-date-time-picker';
import moment from 'moment-timezone';
import TerraField from 'terra-form-field';
import ActionFooterComponent from './ActionFooterComponent';
import { deleteJournalById, updateJournalItemById } from '../services/index';
import { JournalContext, NotificationContext } from './PanelContainer';
import ToolbarComponent from './ToolbarComponent';
import TextareaField from 'terra-form-textarea/lib/TextareaField';
import { notificationStatus } from '../utils/constant';
import { LoaderContext } from './PanelContainer';


const heading = {
  subject: 'Subject',
  from: 'From',
  to: 'To',
  sentTime: 'Time sent',
  content: 'Message Content',
};

// This component is using to display the panel and form inside it and the control to edit, delete and swapping.
const DisclosureComponent = (props) => {
  const data = useContext(JournalContext);
  const { handleTriggerFullScreenOverlay } = useContext(LoaderContext);
  const disclosureManager = useContext(DisclosureManagerContext);
  const { toggleAlert } = useContext(NotificationContext);
  const [journalId, setJournalId] = useState(props.journalId);
  const [isFormFieldDisabled, setIsFormFieldDisabled] = useState(true);
  const [journalByJournalId, setJournalByJournalId] = useState({});

  useEffect(() => {
    const jour = data.journals.find(journal => journal.id === journalId);
    setJournalByJournalId(jour);
  }, [journalId]);

  // This method is used to toggle the normal view to edit view and vice versa
  const toggleEditMode = (isDisable) => {
    setIsFormFieldDisabled(isDisable);
  };

  //This method is used to go into previous data in the list.
  const swapPrevious = () => {
    const index = data.journals.findIndex(journal => journal.id === journalId);
    if (index != -1) {
      const previous = data.journals[index == 0 ? data.journals.length - 1 : index - 1];
      setJournalId(previous.id);
    }
  };

  //This method is used to go into next data in the list.
  const swapNext = () => {
    const index = data.journals.findIndex(journal => journal.id === journalId);
    if (index != -1) {
      const next = data.journals[index == data.journals.length - 1 ? 0 : index + 1];
      setJournalId(next.id);
    }
  };

  //This method is used to delete the journal item by its id.
  const deleteJournal = () => {
    deleteJournalById(journalId)
      .then(res => {
        data.deleteJournal(journalId);
        disclosureManager.dismiss();
        handleTriggerFullScreenOverlay(false);
        toggleAlert(true, notificationStatus.SUCCESS, "Item deleted sucessfully!");
      })
      .catch(error => {
        disclosureManager.dismiss();
        handleTriggerFullScreenOverlay(false);
        toggleAlert(true, notificationStatus.ERROR, `Oops! Something went wrong, ${error.message}`);
      });
  };

  // This method is used to update journal item.
  const submitForm = (values) => {
    handleTriggerFullScreenOverlay(true);
    values.message_type = journalByJournalId.message_type;
    values.patient_id = journalByJournalId.patient_id;
    updateJournalItemById(values, journalId)
      .then(res => {
        data.updateJournal(res.data, journalId);
        disclosureManager.dismiss();
        handleTriggerFullScreenOverlay(false);
        toggleAlert(true, notificationStatus.SUCCESS, `Items with subject ${values.subject} updated successfully.`);
      })
      .catch(error => {
        disclosureManager.dismiss();
        handleTriggerFullScreenOverlay(false);
        toggleAlert(true, notificationStatus.ERROR, `Oops! Something went wrong, ${error.message}`);
      });
  };

  // This is for date validation
  const validateDate = (value) => {
    if (!value) {
      return 'Required';
    }
    // if (value.search(/[0-1][0-9]\/([0-2][0-9]|3[0-1])\/[0-9]{4}/i) <= -1) {
    //     return 'Date is Invalid';
    // }

    return undefined;
  };


  //To render a form with form fields
  const renderForm = ({ handleSubmit }) => (
    <form
      noValidate
      onSubmit={handleSubmit}
    >

      {/* Subject of the message/reminder */}
      <Field
        name="subject"
      >
        {({ input, meta }) => (
          <InputField
            data-test-id="subject"
            inputId="subject"
            label={isFormFieldDisabled ? null : heading.subject}
            maxWidth="400px"
            error={meta.error}
            isInvalid={meta.submitFailed && !meta.valid}
            required={!isFormFieldDisabled}
            inputAttrs={input}
            onChange={(e) => { input.onChange(e.target.value); }}
            value={input.value}
            disabled={isFormFieldDisabled}
          />
        )}
      </Field>

      {/* Time when the message/reminder is first time creation or time its update */}
      <Field
        name="created_date"
        validate={validateDate}
      >
        {({ input, meta }) => (
          isFormFieldDisabled ? (
            <InputField
              inputId="sent-time"
              label={isFormFieldDisabled ? '' : heading.sentTime}
              required={!isFormFieldDisabled}
              maxWidth="300px"
              value={new Date(input.value).toUTCString()}
              disabled={isFormFieldDisabled}
            />
          )
            : (
              <TerraField
                label="Sent date"
                htmlFor="defaultDateTime"
                error={meta.error}
                isInvalid={meta.submitFailed && meta.error !== undefined}
                required
              >
                <DateTimePicker
                  name="created_date"
                  id="default"
                  dateInputAttributes={{ id: 'defaultDateTime' }}
                  minDate={moment().format()}
                  value={moment(input.value).format()}
                  onChange={(event, date) => { input.onChange(date); }}
                />
              </TerraField>
            )
        )}
      </Field>

      {/* From the message/reminder is being sent */}
      <Field
        name="senders_display"
      >
        {({ input, meta }) => (
          <InputField
            data-test-id="from"
            inputId="from"
            label={heading.from}
            maxWidth="400px"
            error={meta.error}
            isInvalid={meta.submitFailed && !meta.valid}
            required={!isFormFieldDisabled}
            inputAttrs={input}
            onChange={(e) => { input.onChange(e.target.value); }}
            value={input.value}
            disabled={isFormFieldDisabled}
          />
        )}
      </Field>

      {/* To whom message/reminder is sent */}
      <Field
        name="recipients_display"
      >
        {({ input, meta }) => (
          <InputField
            data-test-id="to"
            inputId="to"
            label={heading.to}
            maxWidth="400px"
            error={meta.error}
            isInvalid={meta.submitFailed && !meta.valid}
            required={!isFormFieldDisabled}
            inputAttrs={input}
            onChange={(e) => { input.onChange(e.target.value); }}
            value={input.value}
            disabled={isFormFieldDisabled}
          />
        )}
      </Field>

      {/* Message/Reminder Content body */}
      <Field
        name="message"
      >
        {({ input, meta }) => (
          <TextareaField
            inputId="message"
            label={isFormFieldDisabled ? '' : heading.content}
            maxWidth="400px"
            error={meta.error}
            isInvalid={meta.submitFailed && !meta.valid}
            required={!isFormFieldDisabled}
            inputAttrs={input}
            onChange={(e) => { input.onChange(e.target.value); }}
            value={input.value}
            disabled={isFormFieldDisabled}
          />
        )}
      </Field>

      <ActionFooterComponent isFormFieldDisabled={isFormFieldDisabled} />

    </form>
  );

  return (
    <ContentContainer fill>
      <DisclosureManagerHeaderAdapter
        data-test-id="title"
        title={<b>{(journalByJournalId.message_type)?.charAt(0).toUpperCase() + (journalByJournalId.message_type)?.slice(1)}</b>}
      />
      <ToolbarComponent toggleEditMode={toggleEditMode} isFormFieldDisabled={isFormFieldDisabled} deleteJournal={deleteJournal} swapPrevious={swapPrevious} swapNext={swapNext} />
      <div className="formContainer">
        <Spacer marginBottom="small">
          <Form
            onSubmit={submitForm}
            render={renderForm}
            initialValues={{
              subject: journalByJournalId.subject,
              created_date: journalByJournalId.created_date,
              senders_display: journalByJournalId.senders_display,
              recipients_display: journalByJournalId.recipients_display,
              message: journalByJournalId.message,
            }}
            validate={(values) => {
              const errors = {};

              if (!values.subject) {
                errors.subject = 'Subject is Required';
              }

              if (!values.senders_display) {
                errors.senders_display = 'Sender name is Required';
              }

              if (!values.recipients_display) {
                errors.recipients_display = 'Atleast one recipient name is Required';
              }

              if (!values.message) {
                errors.message = 'Message is Required';
              } else if (values.message && values.message.split(' ').length > 160) {
                errors.message = 'Please discribe in less than 160 words. ';
              }

              return errors;
            }}
          />
        </Spacer>
      </div>
    </ContentContainer>
  );
};

DisclosureComponent.propTypes = {
  name: PropTypes.string,
  disclosureType: PropTypes.string,
};
DisclosureComponent.defaultProps = {
  name: '',
};

export default DisclosureComponent;
