import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ApplicationIntlContext } from 'orion-application/lib/application-intl';
import ContentContainer from 'terra-content-container';
import Header from 'terra-action-header';
import Spacer from 'terra-spacer';
import StatusView from 'terra-status-view';

// const propTypes = {
//   /**
//    * Example data.
//    */
//   exampleData: PropTypes.string,
// };

const MessageJournalView = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState(false);
  debugger
  // const intl = React.useContext(ApplicationIntlContext);
  // const headerTitle = intl.formatMessage({ id: 'message-journal-engine.message-journal' });

  return (
<>
    <ContentContainer header={<Header title={headerTitle} />}>
      <Spacer paddingTop="large+1" paddingBottom="large+1" paddingLeft="large+1" paddingRight="large+1">
        {exampleData}
        {!exampleData && (
          <StatusView
            variant="no-data"
            isGlyphHidden
            message={intl.formatMessage({ id: 'message-journal-engine.no-message-journal' })}
          />
        )}
      </Spacer>
      <h1 id="title">hello</h1>
    </ContentContainer>

    <div data-test="component-app">
      <h1 id="dii" data-test="counter-display" >hello</h1> 
      <span data-test="count">{count}</span>
    

      {/* Notes: 
      - using ternary on the error state to determine whether or not to hide 
      - the 'error' and 'hidden' classes are defined in App.css
      */}
      <div data-test="error-message" className={`error ${error ? '' : 'hidden'}`}>
        The counter cannot go below 0
      </div>
      <button
        data-test="inc-button"
        onClick={() =>{
          if (error) { setError(false); }
           setCount(count + 1)
        }}
      >
        incremet Count
      </button>

      <button
        data-test="decrement-button"
        onClick={() => {
          if (count > 0) {
            setCount(count - 1)
          } else {
            setError(true);
          }
        }
        }
      >
        Decrement counter
      </button>
    </div>
    </>
  );
};

// MessageJournalView.propTypes = propTypes;

export default MessageJournalView;
