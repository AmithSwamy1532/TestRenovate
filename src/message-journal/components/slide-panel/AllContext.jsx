import React from 'react';
import { JournalContext } from './PanelContainer';

export const useJournal = () => {
    const context = React.useContext(JournalContext);

    if (!context) {
        throw new Error("useJournal must be used within JournalProvider");
    }

    return context;
}

