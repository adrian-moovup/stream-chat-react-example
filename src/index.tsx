import React from 'react';
import ReactDOM from 'react-dom/client';
import * as Sentry from '@sentry/react';
import './index.css';

import App from './App';
import { getImage } from './assets';
import { getChannelListOptions } from './channelListOptions';
import { ThemeContextProvider } from './context';
import { UserResponse } from 'stream-chat';
import { StreamChatGenerics } from './types';


const urlParams = new URLSearchParams(window.location.search);
const apiKey = process.env.REACT_APP_STREAM_KEY || '8br4watad788';
const user = process.env.REACT_APP_USER_ID || 'leia_organa';
const userToken = process.env.REACT_APP_USER_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibGVpYV9vcmdhbmEifQ.IzwBuaYwX5dRvnDDnJN2AyW3wwfYwgQm3w-1RD4BLPU';
const targetOrigin = (process.env.REACT_APP_TARGET_ORIGIN as string);

const noChannelNameFilter = urlParams.get('no_channel_name_filter') || true;
const skipNameImageSet = urlParams.get('skip_name_image_set') || false;

const channelListOptions = getChannelListOptions(!!noChannelNameFilter, user);
const userToConnect: UserResponse<StreamChatGenerics> = {
  id: user!,
  name: skipNameImageSet ? undefined : user!,
  image: skipNameImageSet ? undefined : getImage(user!),
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
        channelListOptions={channelListOptions}
      />
    </ThemeContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
