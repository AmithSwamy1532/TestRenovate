/* eslint-disable max-classes-per-file */
import React from 'react';
import SlidePanelManager from 'terra-slide-panel-manager';
import ContentComponent from './contentComponent';

const SlidePanelManagerComponent = () => (
  <SlidePanelManager>
    <ContentComponent disclosureType="panel" />
  </SlidePanelManager>
);

export default SlidePanelManagerComponent;
/* eslint-enable max-classes-per-file */
