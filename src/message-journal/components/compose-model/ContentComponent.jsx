import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DisclosureManagerContext,
} from 'terra-disclosure-manager';
import { ApplicationIntlContext } from 'orion-application/lib/application-intl';
import CollapsibleMenuView from 'terra-collapsible-menu-view';
import IconEdit from 'terra-icon/lib/icon/IconEdit';

import DisclosureComponent from './DisclosureComponent';
import '../../../../index.css';
import { messageType } from '../utils/constant';

const ContentComponent = (props) => {
  const disclosureManager = useContext(DisclosureManagerContext);
  const { disclosureType } = props;
  const clickManager = (size, name) => {
    disclosureManager.disclose({
      preferredType: disclosureType,
      size,
      content: {
        key: `Content-Disclosure-${size}`,
        component: <DisclosureComponent title={name} />,
      },
    });
  };
  const renderMenu = (size) => {
    const intl = useContext(ApplicationIntlContext);
    const composeMessage = intl.formatMessage({ id: 'message-journal-engine.compose-message' });
    const composeReminder = intl.formatMessage({ id: 'message-journal-engine.compose-reminder' });

    return (
      <CollapsibleMenuView.Item
        text={<IconEdit id="edit-item" a11yLabel="edit item" />}
        key="create_button"
        id="collapsable-items"
        shouldCloseOnClick
        subMenuItems={[
          <CollapsibleMenuView.Item text={composeMessage} id="newMessage" key="message" onClick={() => clickManager(size, messageType.MESSAGE)} />,
          <CollapsibleMenuView.Item text={composeReminder} id="newReminder" key="reminder" onClick={() => clickManager(size, messageType.REMINDER)} />,
        ]}
      />
    );
  };
  return (
    <div>
      {renderMenu('default')}
      <br />
    </div>
  );
};

ContentComponent.propTypes = {
  disclosureType: PropTypes.string,
};
ContentComponent.defaultProps = {
  disclosureType: 'modal',
};

export default ContentComponent;
