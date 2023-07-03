const json = {
  "journal_items": [
    {
      "subject": "item12",
      "created_date": "2022-09-22T03:12:00+05:30",
      "senders_display": "Harsha",
      "recipients_display": "Kanha, Neha, kunal",
      "message": "Please update this message as testing phase again.",
      "message_type": "message",
      "patient_id": "12",
      "id": 1
    },

    {
      "subject": "item12",
      "created_date": "2022-09-22T03:12:00+05:30",
      "senders_display": "Harsha",
      "recipients_display": "Kanha, Neha, kunal",
      "message": "Please update this message as testing phase again.",
      "message_type": "message",
      "patient_id": "12",
      "id": 2
    },
    {
      "id": 2,
      "message_type": "message",
      "subject": "item2",
      "patient_id": "142",
      "message": "Updated First Message",
      "created_date": "2022-07-11T18:03:00+05:30",
      "senders_display": "Ram G",
      "recipients_display": "Abcd, Hfgsuh"
    },
    {
      "id": 3,
      "message_type": "message",
      "subject": "item3",
      "patient_id": "142",
      "message": "second message",
      "created_date": "2022-07-07T18:03:00+05:30",
      "senders_display": "Ram G",
      "recipients_display": "Abcd, Hfgsuh"
    },
    {
      "id": 4,
      "message_type": "reminder",
      "subject": "item4",
      "patient_id": "142",
      "message": "First Reminder",
      "created_date": "2022-03-01T18:03:00+05:30",
      "senders_display": "Ram G",
      "recipients_display": "Abcd, Hfgsuh"
    },
    {
      "id": 5,
      "message_type": "reminder",
      "subject": "item5",
      "patient_id": "142",
      "message": "Updated First Reminder",
      "created_date": "2021-07-11T18:03:00+05:30",
      "senders_display": "Ram G",
      "recipients_display": "Abcd, Hfgsuh"
    }
  ],
  "Patients": [
    {
      "id": "123"
    }
  ]
};

const changeRequiredStructure = (array) => {
  let groupByMessageType = array.reduce((result, obj) => {
    (result[obj["message_type"]] = result[obj["message_type"]] || []).push(obj);
    return result;
  }, {});

  let messages = groupByMessageType.message;

  const updatedMessagess = messages.reduce((result, obj) => {
    (result[obj["subject"]] = result[obj["subject"]] || []).push(obj);
    return result;
  }, {});
  groupByMessageType.message = updatedMessagess;

  let reminders = groupByMessageType.reminder;

  const updatedReminders = reminders.reduce((result, obj) => {
    (result[obj["subject"]] = result[obj["subject"]] || []).push(obj);
    return result;
  }, {});
  groupByMessageType.reminder = updatedReminders;

  return groupByMessageType

}



// let groupByMessageType = (array, key) => {
//   return array.reduce((result, obj) => {
//     (result[obj["message_type"]] = result[obj["message_type"]] || []).push(obj);
//     return result;
//   }, {});
// };

// const updateGroupByMessageType = groupByMessageType(json.journal_items);



// let groupBySubject = (updateGroupByMessageType) => {
//   let messages = updateGroupByMessageType.message;

//   const updatedMessagess = messages.reduce((result, obj) => {
//     (result[obj["subject"]] = result[obj["subject"]] || []).push(obj);
//     return result;
//   }, {});
//   updateGroupByMessageType.message = updatedMessagess;

//   let reminders = updateGroupByMessageType.reminder;

//   const updatedReminders = reminders.reduce((result, obj) => {
//     (result[obj["subject"]] = result[obj["subject"]] || []).push(obj);
//     return result;
//   }, {});
//   updateGroupByMessageType.reminder = updatedReminders;


//   console.log(updateGroupByMessageType);

//   return false
// }


console.log(groupBySubject(updateGroupByMessageType));


const result = {
  message: {
    item12: [{
      created_date: "2022-09-22T03:12:00+05:30",
      id: 1,
      message: "Please update this message as testing phase again.",
      message_type: "message",
      patient_id: "12",
      recipients_display: "Kanha, Neha, kunal",
      senders_display: "Harsha",
      subject: "item12"
    }, {
      created_date: "2022-09-22T03:12:00+05:30",
      id: 2,
      message: "Please update this message as testing phase again.",
      message_type: "message",
      patient_id: "12",
      recipients_display: "Kanha, Neha, kunal",
      senders_display: "Harsha",
      subject: "item12"
    }],
    item2: [{
      created_date: "2022-07-11T18:03:00+05:30",
      id: 2,
      message: "Updated First Message",
      message_type: "message",
      patient_id: "142",
      recipients_display: "Abcd, Hfgsuh",
      senders_display: "Ram G",
      subject: "item2"
    }],
    item3: [{
      created_date: "2022-07-07T18:03:00+05:30",
      id: 3,
      message: "second message",
      message_type: "message",
      patient_id: "142",
      recipients_display: "Abcd, Hfgsuh",
      senders_display: "Ram G",
      subject: "item3"
    }]
  },
  reminder: {
    item4: [{
      created_date: "2022-03-01T18:03:00+05:30",
      id: 4,
      message: "First Reminder",
      message_type: "reminder",
      patient_id: "142",
      recipients_display: "Abcd, Hfgsuh",
      senders_display: "Ram G",
      subject: "item4"
    }],
    item5: [{
      created_date: "2021-07-11T18:03:00+05:30",
      id: 5,
      message: "Updated First Reminder",
      message_type: "reminder",
      patient_id: "142",
      recipients_display: "Abcd, Hfgsuh",
      senders_display: "Ram G",
      subject: "item5"
    }]
  }
}