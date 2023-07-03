import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { DisclosureManagerContext } from 'terra-disclosure-manager';
import ContentContainer from 'terra-content-container';
import DisclosureComponent from './DisclosureComponent';
import AlertComponent from '../common/AlertComponent';
import MessageComponent from '../table-component/MessageComponent';
import TableContainer from '../table-component/TableContainer';

//This component to use to enclose the discloser component and also the table view to initialize it.
const ContentComponent = (props) => {
  const { disclosureType } = props;
  const disclosureManager = useContext(DisclosureManagerContext);

  //This method is used to open the slide panel on click the respective row.
  const openSlidePanel = (journalId) => {
    const size = 'default';
    disclosureManager.disclose({
      preferredType: disclosureType,
      size,
      content: {
        key: `Content-Disclosure-${size}`,
        component: <DisclosureComponent journalId={journalId} disclosureType={disclosureType} />,
      },
    });
  };

  return (
    <ContentContainer>
      <div>
        <AlertComponent />
        <TableContainer>
          <MessageComponent openSlidePanel={openSlidePanel} />
        </TableContainer>
      </div>
    </ContentContainer>
  );
};

ContentComponent.propTypes = {
  disclosureType: PropTypes.string,
};

export default ContentComponent;
