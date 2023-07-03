import React, { useContext } from 'react';

import '../styles/common.css';

import Alert from 'terra-alert';
import { NotificationContext } from '../slide-panel/PanelContainer';


// this component is using for giving notification alert while any action is success or failure happen.
const AlertComponent = () => {
    const { alert, toggleAlert } = useContext(NotificationContext);

    return alert.isAlertOpen ? (
        <div className="alert_container">
            {
                alert.status == "success"
                    ? (<Alert id="success_alert" type="success" onDismiss={() => toggleAlert(false)}>
                        {alert.message}
                    </Alert>)
                    : alert.status == "error"
                        ? (<Alert type="error" onDismiss={() => toggleAlert(false)}>{alert.message}</Alert>)
                        : <></>
            }
        </div>
    ) : <></>
}

export default AlertComponent;