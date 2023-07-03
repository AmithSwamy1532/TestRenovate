import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import ContentContainer from 'terra-content-container';
import { Form, Field } from 'react-final-form';
import InputField from 'terra-form-input/lib/InputField';
import Button from 'terra-button';
import TextareaField from 'terra-form-textarea/lib/TextareaField';
import {
  DisclosureManagerHeaderAdapter, DisclosureManagerContext,
} from 'terra-disclosure-manager';
import CellGrid, {
  Cell,
} from 'terra-cell-grid';
import Spacer from 'terra-spacer';
import PatientBanner from './PatientBanner';
import '../../../../index.css';
import ContentFooter from './ContentFooter';
import { addJournal } from '../services/index';
import { JournalContext, LoaderContext, NotificationContext } from '../slide-panel/PanelContainer';
import { notificationStatus } from '../utils/constant';

const renderForm = ({ handleSubmit }) => (
  <form
    noValidate
    onSubmit={handleSubmit}
  >
    <Field
      name="recipients_display"
    >
      {({ input, meta }) => (
        <InputField
          data-test-id="recipients_display"
          id="recipients_display"
          inputId="recipients_display"
          label="To"
          help="Note: separate with semicolon to add multiple recipients."
          error={meta.error}
          isInvalid={meta.submitFailed && !meta.valid}
          required
          inputAttrs={input}
          onChange={(e) => { input.onChange(e.target.value); }}
          value={input.value}
        />
      )}
    </Field>

    <Field
      name="subject"
    >
      {({ input }) => (
        <InputField
          data-test-id="subject"
          inputId="subject"
          label="Subject"
          
          inputAttrs={input}
          value={input.value}
          onChange={(e) => { input.onChange(e.target.value); }}
        />
      )}
    </Field>

    <Field
      name="message"
    >
      {({ input, meta }) => (
        <TextareaField
          inputId="message"
          label="Message"
          error={meta.error}
          isInvalid={meta.submitFailed && !meta.valid}
          inputAttrs={input}
          onChange={(e) => { input.onChange(e.target.value); }}
          value={input.value}
          size="large"
          required
        />
      )}
    </Field>
    <CellGrid>
      <Cell key="cell-1" width={{ scalar: 9 }} />
      <Cell key="cell-2" width={{ scalar: 1 }}><Button text="Send" variant="emphasis" className="customButton" type={Button.Opts.Types.SUBMIT} /></Cell>
      <Cell key="cell-3" width={{ scalar: 1 }}><ContentFooter value="Cancle" /></Cell>
    </CellGrid>
  </form>
);

const DisclosureComponent = ({ title }) => {
  const journalContext = useContext(JournalContext);
  const disclosureManager = useContext(DisclosureManagerContext);
  const { toggleAlert } = useContext(NotificationContext);
  const { handleTriggerFullScreenOverlay } = useContext(LoaderContext);
  const [name] = useState(title);

  const submitForm = async (values) => {
    handleTriggerFullScreenOverlay(true);
    values.patient_id = 1;
    values.created_date = new Date().toISOString();
    values.senders_display = 'PHY 1';
    values.message_type = name.toLowerCase();
    addJournal(values)
      .then(res => {
        journalContext.addJournal(res.data);
        console.log(res.data);
        disclosureManager.dismiss();
        handleTriggerFullScreenOverlay(false);
        toggleAlert(true, notificationStatus.SUCCESS, `Items with subject ${res.data.subject} created successfully.`);
      }).catch(error => {
        disclosureManager.dismiss();
        handleTriggerFullScreenOverlay(false);
        toggleAlert(true, notificationStatus.ERROR, `Oops! Something went wrong, ${error.message}`);
      });
  };

  return (
    <ContentContainer fill>
      <DisclosureManagerHeaderAdapter
        title={<b>{(name)?.charAt(0).toUpperCase() + (name)?.slice(1)}</b>}
      />
      <div className="formContainer">
        <PatientBanner/>
        <Spacer marginBottom="small">

          <Form
            onSubmit={submitForm}
            render={renderForm}
            validate={(values) => {
              const errors = {};

              if (!values.message) {
                errors.message = 'Message is required';
              } else if (values.message && values.message.split(' ').length > 10) {
                errors.message = 'Please discribe in less than 10 words. ';
              }
              if (!values.recipients_display) {
                errors.recipients_display = 'To Address is required';
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
  title: PropTypes.string,
};

export default DisclosureComponent;
