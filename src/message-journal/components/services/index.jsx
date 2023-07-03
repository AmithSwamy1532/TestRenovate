import axios from 'axios';

// This url is for journal items to do operation like fetch, delete, update and add data.
const JOURNAL_ITEMS_URL = 'http://localhost:3000/journal_items';

// This url is for patients info.
const PATIENT_URL = 'http://localhost:3000/patients';

// This api is used to get all journal items.
export const getJournals = () => axios.get(`${JOURNAL_ITEMS_URL}`);

export const getJournalById = (id) => axios.get(`${JOURNAL_ITEMS_URL}/${id}`);

// This api is used to add new journal item.
export const addJournal = (body) => axios.post(`${JOURNAL_ITEMS_URL}`, body);

// This api is used to delete journal item by its id.
export const deleteJournalById = (id) => axios.delete(`${JOURNAL_ITEMS_URL}/${id}`);

// This api is used to update journal item by its id.
export const updateJournalItemById = (body, journalId) =>
  axios.put(`${JOURNAL_ITEMS_URL}/${journalId}`, body);

  // This api is used to get patient details by its patient id.
export const getPatient = (id) => axios.get(`${PATIENT_URL}/${id}`);
