import React, { useContext } from 'react';
import ActionFooter from 'terra-action-footer';
import Button from 'terra-button';
import Spacer from 'terra-spacer';
import { DisclosureManagerContext } from 'terra-disclosure-manager';

//This component is using for form footer control to cancel or submit form to update.
const ActionFooterComponent = (props) => {
  const disclosureManager = useContext(DisclosureManagerContext);
  return (
    <ActionFooter
      start=""
      end={(
        <React.Fragment>
          <Spacer isInlineBlock marginRight="medium">
            <Button isDisabled={props.isFormFieldDisabled} text="Save" variant={Button.Opts.Variants.EMPHASIS} type={Button.Opts.Types.SUBMIT} />
          </Spacer>
          <Button
            text="Cancel"
            onClick={() => {
              disclosureManager.dismiss();
            }}
          />
        </React.Fragment>
      )}
    />
  );
};

export default ActionFooterComponent;
