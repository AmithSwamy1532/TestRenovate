import React from 'react';
import { mockIntl } from 'terra-enzyme-intl';
import { ApplicationIntlContext } from 'orion-application/lib/application-intl';
import MessageJournalView from '../../../src/message-journal/components/MessageJournalView';

it('should render a MessageJournalView with no data', () => {
  jest.spyOn(React, 'useContext').mockImplementation((contextType) => {
    if (contextType === ApplicationIntlContext) {
      return mockIntl;
    }
    return undefined;
  });
  const messageJournalView = shallow(<MessageJournalView />);
  expect(messageJournalView.first().shallow()).toMatchSnapshot();
});

it('should render a MessageJournalView that has succeeded with a valid MessageJournalEngine', () => {
  jest.spyOn(React, 'useContext').mockImplementation((contextType) => {
    if (contextType === ApplicationIntlContext) {
      return mockIntl;
    }
    return undefined;
  });
  const messageJournalView = shallow(<MessageJournalView exampleData="MessageJournal" />);
  expect(messageJournalView.first().shallow()).toMatchSnapshot();
});
