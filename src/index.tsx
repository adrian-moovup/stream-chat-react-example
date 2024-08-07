import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import { getChannelListOptions } from './channelListOptions';
import { ThemeContextProvider } from './context';
import { UserResponse } from 'stream-chat';
import { StreamChatGenerics } from './types';


const urlParams = new URLSearchParams(window.location.search);
const apiKey = process.env.REACT_APP_STREAM_KEY || '8br4watad788';
const user = process.env.REACT_APP_USER_ID || 'leia_organa';
const userToken = process.env.REACT_APP_USER_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVpYV9vcmdhbmEifQ.IzwBuaYwX5dRvnDDnJN2AyW3wwfYwgQm3w-1RD4BLPU';
const targetOrigin = (process.env.REACT_APP_TARGET_ORIGIN as string);
const jobId = urlParams.get('job_id')

const userToConnect: UserResponse<StreamChatGenerics> = {
  id: user!,
  name: user!,
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
    <ThemeContextProvider targetOrigin={targetOrigin}>
      <App
        apiKey={apiKey!}
        userToConnect={userToConnect}
        userToken={userToken}
        targetOrigin={targetOrigin!}
        channelListOptions={{
          options: {},
          filters: {
            type: 'messaging',
            // has_unread: true,
          },
          sort: {
            last_message_at: -1,
            updated_at: -1,
          }
        }}
      />
    </ThemeContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
