/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import IconCaretDown from 'terra-icon/lib/icon/IconCaretDown';
import 'bootstrap/dist/css/bootstrap.css';
// import { FilterContext } from './FilterContext';

const ListItems = (props) => {
  const [messages] = useState(props.messages);
  const [statetitle] = useState(props.title);
  const [stateSubjects, setStateSubjects] = useState([]);
  const [messagecaret, setMessagecaret] = useState([]);
  const [subjectcaret, setSubjectcaret] = useState([]);
  const [msgCont, setMsgCont] = useState('');
  const [headCont] = useState('');
  const [subKeys, setSubKeys] = useState('');
  const [stateKey, setStateKey] = useState('');
  const [paginationKey, setPaginationKey] = useState(false);
  const [statepageNumbers, setStatepageNumbers] = useState([]);
  const [renderstatepageNumbers, setRenderStatepageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messagePerPage] = useState(3);
  const [statecurrentMessages, setStatecurrentMessages] = useState([]);

  useEffect(() => {
    const indexOfLastMessage = currentPage * messagePerPage;
    const indexOfFirstMessage = indexOfLastMessage - messagePerPage;
    const currentMessages = stateSubjects.slice(indexOfFirstMessage, indexOfLastMessage);
    setStatecurrentMessages(currentMessages);
  }, [stateSubjects, currentPage, messagePerPage]);

  const handleGetSubjects = (e) => {
    const getTitle = e.currentTarget.getAttribute('data-index');
    if (subjectcaret.includes(getTitle) === true) {
      const subIndex = subjectcaret.indexOf(getTitle);
      setSubjectcaret((oldKeys) => oldKeys.filter((_, index) => index !== subIndex));
      setPaginationKey(false);
    } else {
      setSubjectcaret(oldKeys => [...oldKeys, getTitle]);
      setPaginationKey(true);
    }

    setStateKey('subject');
    const stateSubs = Object.keys(messages);
    setStateSubjects(stateSubs);
  };

  const TypeSection = () => (
    <tr>
      <th
        id="baseline"
        className="bg-info"
        colSpan="6"
        data-index={statetitle}
        onClick={handleGetSubjects}
      >
        <IconCaretDown />
        {statetitle.toUpperCase()}

      </th>
    </tr>
  );

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(stateSubjects.length / messagePerPage); i++) {
      pageNumbers.push(i);
    }
    setStatepageNumbers(pageNumbers);
  }, [messagePerPage, stateSubjects]);

  useEffect(() => {
    const renderPageNumbers = statepageNumbers.map(number => {
      const activeclass = (currentPage === number) ? 'numb active' : 'numb';
      return (
        <li className={activeclass}>
          <a
            key={number}
            id={number}
            onClick={handleClick}
          >
            {number}
          </a>
        </li>
      );
    });

    setRenderStatepageNumbers(renderPageNumbers);
  }, [statepageNumbers, currentPage]);

  const Pagination = (
    <div className="pagination">
      <ul>
        {renderstatepageNumbers}
      </ul>
    </div>
  );

  const getSubjectMessages = (e) => {
    setStateKey('message');

    const getSub = e.currentTarget.parentNode.getAttribute('data-index');
    if (messagecaret.includes(getSub) === true) {
      const subIndex = messagecaret.indexOf(getSub);
      setMessagecaret((oldKeys) => oldKeys.filter((_, index) => index !== subIndex));
    } else {
      setMessagecaret(oldKeys => [...oldKeys, getSub]);
    }
    setSubKeys((oldSubs) => [...oldSubs, getSub]);
  };

  useEffect(() => {
    console.log(subjectcaret);
  }, []);

  useEffect(() => {
    if (stateKey === 'subject') {
      // eslint-disable-next-line react/prop-types
      const content = statecurrentMessages.map(key => (
        <tr>
          <th
            id="baseline"
            key={key}
            data-index={key}
            colSpan="6"
            className="alert alert-info"
          >
            <IconCaretDown onClick={getSubjectMessages} />
            {key}
          </th>
        </tr>

      ));

      setMsgCont(content);

      // setHeadCont(content);
    } else if (stateKey === 'message') {
      if (subKeys.length > 0) {
        const getSubjects = Array.from(new Set(subKeys));
        const getMessages = [];
        for (const key of getSubjects) {
          // getMessages[key] = contextMessages.filter((m) => key == m.subject);
          getMessages[key] = messages[key];
        }

        const newCont = [];
        for (const key in getMessages) {
          newCont[key] = getMessages[key].map((sm) => (
            <tr key={sm.id} onClick={() => props.openSlidePanel(sm.id)}>
              <td key="Date">{sm.created_date}</td>
              <td key="Subject">{sm.subject}</td>
              <td key="To">{sm.recipients_display}</td>
              <td key="from">{sm.senders_display}</td>
              <td key="type">{sm.message_type}</td>
              <td key="due">{sm.due}</td>
            </tr>
          ));
        }

        // console.log(newCont);

        const combinedContent = statecurrentMessages.map((sub) => (
          <>
            <tr key={sub}>
              <th
                id="baseline"
                key={sub}
                data-index={sub}
                colSpan="6"
                className="alert alert-info"
              >
                <IconCaretDown onClick={getSubjectMessages} />
                {sub}

              </th>
            </tr>
            {messagecaret.includes(sub) === true ? getSubjects.includes(sub) && newCont[sub] : ''}
            {/* {Pagination} */}
          </>
        ));

        setMsgCont(combinedContent);
      }
    }
  }, [subKeys, stateKey, headCont, messages, stateSubjects, messagecaret, statecurrentMessages]);

  return (
    <>

      {(headCont === '' && <TypeSection />)}
      {(headCont !== '' && headCont)}
      {subjectcaret.includes(statetitle) && msgCont}
      {paginationKey && Pagination}
    </>
  );
};

export default ListItems;
