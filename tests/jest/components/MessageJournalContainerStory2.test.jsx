import React from 'react';
import { mockIntl } from 'terra-enzyme-intl';
import { ApplicationIntlContext } from 'orion-application/lib/application-intl';
//import MessageJournalView from '../../../src/message-journal/components/MessageJournalView';
import { shallow } from 'enzyme';
import Table from '../../../src/message-journal/components/table-component/MessageComponent';
// import Notification from '../../../src/message-journal/components/common/AlertComponent'
import moxios from 'moxios'
import { getJournals, getJournalById, deleteJournalById, updateJournalItemById } from '../../../src/message-journal/components/services/index';

const setupTable = () => shallow(<Table />);
const findByTestAttrTable = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

const setupUpdateNotification = (props = {}) => {
    return shallow(<Notification {...props} />)
}
const findByTestAttrUpdateNotification = (wrapper, val) => {
    return wrapper.find(`[data-test='${val}']`);
}

// it('test for render the Notification', ()=>{
//   const wrapper = setupUpdateNotification({isAlertOpen: true});
//   const appComponent =findByTestAttrUpdateNotification(wrapper , "notification")
//   expect(appComponent.length).toBe(1)
//  // expect(messageJournalView.first().shallow()).toMatchSnapshot();
//   //expect(shallow(messageJournalView)).toMatchSnapshot();
// });

// it('test for render the success Notification', ()=>{
//   const wrapper = setupUpdateNotification({success : false});
//   const appComponent =findByTestAttrUpdateNotification(wrapper , "notification-success")
//   expect(appComponent.text()).toBe('')
//  // expect(messageJournalView.first().shallow()).toMatchSnapshot();
//   //expect(shallow(messageJournalView)).toMatchSnapshot();
// });

it('my first test in jest for table container', () => {
    const wrapper = setupTable();
    const appComponent = findByTestAttrTable(wrapper, "table-app")
    expect(appComponent.length).toBe(1)
    // expect(messageJournalView.first().shallow()).toMatchSnapshot();
    //expect(shallow(messageJournalView)).toMatchSnapshot();
});

it('my first test in jest for table row', () => {
    const wrapper = setupTable();
    const appComponent = findByTestAttrTable(wrapper, "table")
    expect(appComponent.length).toBe(1)
    // expect(messageJournalView.first().shallow()).toMatchSnapshot();
    //expect(shallow(messageJournalView)).toMatchSnapshot();
});

describe('getDatas for table APi', () => {
    beforeEach(() => {
        moxios.install();
    });
    afterEach(() => {
        moxios.uninstall();
    })
    test('getDataById', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    recipients_display: "tes",
                    subject: "item1",
                    message: "Rechecking\n",
                    patient_id: 1,
                    created_date: "2022-08-12T05:43:28.722Z",
                    senders_display: "PHY 1",
                    message_type: "message",
                    id: 5
                }
            })

        });
        return getJournalById(5)
            .then((res) => {
                expect(res.data.message).toBe('Rechecking\n')
            })

    });

    test('getData for messageType', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: [{
                    recipients_display: "tes",
                    subject: "item1",
                    message: "Rechecking\n",
                    patient_id: 1,
                    created_date: "2022-08-12T05:43:28.722Z",
                    senders_display: "PHY 1",
                    message_type: "message",
                    id: 5
                }, {
                    subject: "Anil compo",
                    created_date: "2022-08-12T06:28:06.729Z",
                    senders_display: "PHY 1",
                    recipients_display: "1234",
                    message: "Testing the component update.",
                    message_type: "message",
                    patient_id: 1,
                    id: 9
                  }
                ]
            })

        });
        return getJournals()
            .then((res) => {
                expect(res.data[0].message).toBe('Rechecking\n')
                expect(res.data[1].message_type).toBe('message')
            })

    })

    test('deleteJournalById', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                statusText: "OK"
            })
        });
        return deleteJournalById(14)
            .then((res) => {
                expect(res.statusText).toBe('OK')
            })

    });

    test('updateJournalItemById', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: {
                    created_date: "2022-08-12T06:28:06.729Z",
                    id: 9,
                    message: "Testing the component.",
                    message_type: "message",
                    patient_id: 1,
                    recipients_display: "1234",
                    senders_display: "PHY 1",
                    subject: "Anil compo"
                }
            })

        });
        return updateJournalItemById(9)
            .then((res) => {
                expect(res.data.message).toBe('Testing the component.')
            })

    });


})