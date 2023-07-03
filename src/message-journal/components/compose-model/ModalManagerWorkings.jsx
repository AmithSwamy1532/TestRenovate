/* eslint-disable max-classes-per-file */
import React from 'react';
import ModalManager from 'terra-modal-manager';
import ContentComponent from './contentComponent';

const ModalManagerWorkings = () => (
  <ModalManager>
    <ContentComponent disclosureType="modal" />
  </ModalManager>
);

export default ModalManagerWorkings;
/* eslint-enable max-classes-per-file */
