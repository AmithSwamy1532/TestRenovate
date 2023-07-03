import React, { Fragment, useContext, useState } from 'react';

import Toolbar from 'terra-toolbar';

import ButtonGroup from 'terra-button-group';
import Button from 'terra-button';

import IconExpandMore from 'terra-icon/lib/icon/IconExpandMore';
import IconExpandLess from 'terra-icon/lib/icon/IconExpandLess';
import IconTrash from 'terra-icon/lib/icon/IconTrash';
import IconCompose from 'terra-icon/lib/icon/IconCompose';
import NotificationDialog from 'terra-notification-dialog';
import { DisclosureManagerContext } from 'terra-disclosure-manager';
import { LoaderContext } from './PanelContainer';

// This Component is used for control button like swapping up-down, edit and delete etc.
const ToolbarComponent = (props) => {
  const disclosureManager = useContext(DisclosureManagerContext);
  const { handleTriggerFullScreenOverlay } = useContext(LoaderContext);
  const [isOpen, setIsOpen] = useState(false);

  //To close delete confirmation model.
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  //To open delete confirmation model.
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  //Internal method to call delete method in props
  const deleteData = () => {
    disclosureManager.dismiss();
    handleCloseModal();
    handleTriggerFullScreenOverlay(true);
    props.deleteJournal();
  };

  return (
    <Fragment>
      {isOpen && (
        <NotificationDialog
          variant="hazard-medium"
          dialogTitle="To remove data"
          startMessage="The data will be deleted Permanently."
          endMessage="Are you sure, you want to proceed?"
          acceptAction={{
            text: 'Delete',
            onClick: deleteData,
          }}
          rejectAction={{
            text: 'Cancel',
            onClick: handleCloseModal,
          }}
          buttonOrder="acceptFirst"
        />
      )}
      <Toolbar>
        <ButtonGroup style={{ position: 'relative', float: 'left' }}>
          <Button isDisabled={!props.isFormFieldDisabled} text="ExpandLess" key="ExpandLess" isIconOnly icon={<IconExpandLess />} style={{ marginRight: '0.5rem' }} onClick={props.swapPrevious} />
          <Button isDisabled={!props.isFormFieldDisabled} text="ExpandMore" key="ExpandMore" isIconOnly icon={<IconExpandMore />} onClick={props.swapNext} />
        </ButtonGroup>
        <ButtonGroup style={{ position: 'absolute', right: '10px', top: '6px' }}>
          <Button isDisabled={!props.isFormFieldDisabled} text="Trash" key="Trash" isIconOnly icon={<IconTrash />} style={{ marginRight: '0.5rem' }} onClick={handleOpenModal} />
          <Button text="Compose" key="Compose" isIconOnly icon={<IconCompose />} onClick={() => props.toggleEditMode(!props.isFormFieldDisabled)} />
        </ButtonGroup>
      </Toolbar>
    </Fragment>
  );
};

export default ToolbarComponent;
