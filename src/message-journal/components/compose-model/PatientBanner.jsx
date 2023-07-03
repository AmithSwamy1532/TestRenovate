import React, { useEffect, useState,useContext } from 'react';
import DemographicsBanner from 'terra-demographics-banner';
import { injectIntl } from 'react-intl';
import { JournalContext } from '../slide-panel/PanelContainer';
const PatientBanner = () => {
  const journalContext = useContext(JournalContext);

  const [patientDetails, setPatientDetails] = useState({});
    
  useEffect(() => {
    setPatientDetails(journalContext.patient)
  }, []);

  return (
    <>
      {patientDetails
    && (
    <DemographicsBanner
      applicationContent={patientDetails.applicationContent}
      age={patientDetails.age}
      dateOfBirth={patientDetails.dateOfBirth}
      gender={patientDetails.gender}
      gestationalAge={patientDetails.gestationalAge}
      identifiers={patientDetails.identifiers}
      personName={patientDetails.personName}
      postMenstrualAge={patientDetails.postMenstrualAge}
      preferredFirstName={patientDetails.preferredFirstName}
    />
    )}
    {!patientDetails && <div>Unable to fetch patient details here.</div>}
    </>
  );
};
export default injectIntl(PatientBanner);
