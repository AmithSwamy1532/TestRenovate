import React from 'react';
import ApplicationBase from 'orion-application/lib/application-base';
import { ApplicationSessionProvider } from 'orion-application/lib/application-session';
import ApplicationNavigation from 'orion-application/lib/application-navigation';
import MessageJournalContainer from './MessageJournalContainer';

const MessageJournalApplication = () => (
  <ApplicationBase
    applicationName="MessageJournal"
    applicationVersion="0.0.0"
    applicationAboutPageUrl="https://github.cerner.com/AS075468/message-journal-js.git"
    applicationHelpPageUrl="https://github.cerner.com/AS075468/message-journal-js.git"
    renderSessionProvider={children => (
      <ApplicationSessionProvider>
        {children}
      </ApplicationSessionProvider>
    )}
  >
    <ApplicationNavigation>
      <MessageJournalContainer />
    </ApplicationNavigation>
  </ApplicationBase>
);

export default MessageJournalApplication;
