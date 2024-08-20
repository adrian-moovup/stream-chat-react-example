import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { UserResponse } from 'stream-chat';
import { StreamChatGenerics } from './types';



const urlParams = new URLSearchParams(window.location.search);
// For switching user easily when testing the front-end
const urlAppKey = urlParams.get('app_key')
const urlToken = urlParams.get('token')
const urlUser = urlParams.get('user')

const apiKey = urlAppKey || process.env.REACT_APP_STREAM_KEY || '8br4watad788';
const user = urlUser || process.env.REACT_APP_USER_ID || 'leia_organa';
const userToken = urlToken || process.env.REACT_APP_USER_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVpYV9vcmdhbmEifQ.IzwBuaYwX5dRvnDDnJN2AyW3wwfYwgQm3w-1RD4BLPU';
const dayWorkId = urlParams.get('daywork_id')
const hasUnread = urlParams.get('has_unread')

const userToConnect: UserResponse<StreamChatGenerics> = {
  id: user!,
  language: 'en',
  privacy_settings: {
    typing_indicators: {
      enabled: false,
    },
  },
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(
  <React.StrictMode>
      <App
        apiKey={apiKey!}
        dayWorkId={dayWorkId || undefined}
        hasUnread={hasUnread || undefined}
        userToConnect={userToConnect}
        userToken={userToken}
        channelListOptions={{
          options: {},
          filters: {
            type: 'messaging',
            daywork_id: dayWorkId || undefined,
            members: { $in: [user!] },
            has_unread: !!hasUnread || undefined,
          },
          sort: {
            last_message_at: -1,
            updated_at: -1,
          }
        }}
      />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
