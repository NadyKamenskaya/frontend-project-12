import axios from 'axios';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import Channels from './Channels.jsx';
import Channel from './Channel.jsx';
import Messages from './Messages.jsx';
import routes from '../routes.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      const { channels, messages } = res.data;
      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };

    fetchData();
  });

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 flex-md-row bg-white">
        <div className="col-4 col-md-2 border-end px-0 flex-column h-100 d-flex bg-light">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button className="p-0 text-primary" variant="group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" style={{ '--darkreader-inline-fill': 'currentColor' }} data-darkreader-inline-fill="">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <Channels />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <Channel />
            <div className="chat-messages overflow-auto px-5" id="messages-box">
              <Messages />
            </div>
            <div className="mt-auto px-5 py-3">
              <Form className="py-1 border rounded-2" noValidate>
                <Form.Group className="input-group has-validation">
                  <Form.Control 
                    className="border-0 p-0 ps-2"
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    value=""
                  />
                  <Button variant="group-vertical" type="submit" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" style={{ '--darkreader-inline-fill': 'currentColor' }} data-darkreader-inline-fill="">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
