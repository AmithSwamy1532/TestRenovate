import React from 'react';
import OrionRequestorMockProvider from 'orion-application/lib/orion-requestor/OrionRequestorMockProvider';

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved, import/extensions
import MessageJournalContainer from 'message-journal-js/lib/message-journal/components/MessageJournalContainer';

export default () => (
  <OrionRequestorMockProvider
    mock={(instance) => {
      instance.onGet().reply(200, {
        data: 'Example Data.',
      });
    }}
  >
    <MessageJournalContainer />
  </OrionRequestorMockProvider>
);
