import React, { useState } from 'react';
import type { ChannelFilters, ChannelOptions, ChannelSort } from 'stream-chat';
import {
  Channel,
  Chat,
  DefaultStreamChatGenerics,
  MessageSimple,
  StreamMessage, useChannelActionContext,
  useMessageContext
} from 'stream-chat-react';
import { EmojiPicker } from 'stream-chat-react/emojis';

import data from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';

import 'stream-chat-react/dist/css/v2/index.css';
import './styles/index.css';

import {
  ChannelInner,
  CreateChannel,
  MessagingSidebar,
  MessagingThreadHeader,
  SendButton,
} from './components';

import { GiphyContextProvider, useThemeContext } from './context';

import { useConnectUser, useChecklist, useMobileView, useUpdateAppHeightOnResize } from './hooks';

import type { StreamChatGenerics } from './types';
import { SendIcon } from './assets';

init({ data });

type AppProps = {
  apiKey: string;
  userToConnect: { id: string; name?: string; image?: string };
  userToken: string | undefined;
  targetOrigin: string;
  channelListOptions: {
    options: ChannelOptions;
    filters: ChannelFilters;
    sort: ChannelSort;
  };
};

const WrappedEmojiPicker = () => {
  const { theme } = useThemeContext();

  return <EmojiPicker pickerProps={{ theme }} />;
};

const CustomMessage = () => {
  const { message} = useMessageContext<StreamChatGenerics>();
  const { sendMessage, editMessage, updateMessage } = useChannelActionContext()
  const messageId = message.id;
  if (message && message.dialog_type === 'accept_reject') {
    return<MessageSimple renderText={() => {
      return (<>
        <p>Do you want to accept or reject this action? </p>
        <p>ID: {message.dialog_id}</p>
        {message.action && <p>Action: {message.action.toUpperCase()}</p>}
        {!message.action && <div>
          <button onClick={async () => {
            console.log(await editMessage({
              id: messageId,
              text: message.text,
              dialog_type: 'accept_reject',
              dialog_id: message.dialog_id,
              action: 'accepted'
            }))
            console.log(await sendMessage({
              text: `Accepted ${message.dialog_id}`,
            }, {
              'dialog_id': message.dialog_id,
            }))
          }}>Accept</button>&nbsp;
          <button onClick={async () => {
            console.log(await editMessage({
              id: messageId,
              text: message.text,
              dialog_type: 'accept_reject',
              dialog_id: message.dialog_id,
              action: 'rejected'
            }))
            console.log(await sendMessage({
              text: `Rejected ${message.dialog_id}`,
            }, {
              'dialog_id': message.dialog_id,
            }))
          }}>Reject</button>
        </div>}
      </>)
    }}/>
  }
  return <MessageSimple />
}

const CustomSendButton = () => {
  const { sendMessage } = useChannelActionContext()
  const sendCustomMessage = () => {
    sendMessage({
      text: 'Do you want to accept or reject this action?',
    }, {
      'dialog_type': 'accept_reject',
      'dialog_id': Math.random().toString().slice(2),
    })
  }
  return (
    <button
      className='str-chat__send-button'
      onClick={sendCustomMessage}
      type='button'
    >
      <SendIcon/>
    </button>
  )
};

const App = (props: AppProps) => {
  const { apiKey, userToConnect, userToken, targetOrigin, channelListOptions } = props;
  const [isCreating, setIsCreating] = useState(false);

  const chatClient = useConnectUser<StreamChatGenerics>(apiKey, userToConnect, userToken);
  const toggleMobile = useMobileView();
  const { themeClassName } = useThemeContext();

  useChecklist(chatClient, targetOrigin);
  useUpdateAppHeightOnResize();

  if (!chatClient) {
    return null; // render nothing until connection to the backend is established
  }

  return (
    <Chat client={chatClient} theme={`messaging ${themeClassName}`}>
      <MessagingSidebar
        channelListOptions={channelListOptions}
        onClick={toggleMobile}
        onCreateChannel={() => setIsCreating(!isCreating)}
        onPreviewSelect={() => setIsCreating(false)}
      />
      <Channel
        Message={CustomMessage}
        maxNumberOfFiles={10}
        multipleUploads={true}
        SendButton={props => <><SendButton {...props } /><CustomSendButton /></>}
        ThreadHeader={MessagingThreadHeader}
        TypingIndicator={() => null}
        EmojiPicker={WrappedEmojiPicker}
        emojiSearchIndex={SearchIndex}
        enrichURLForPreview
      >
        {isCreating && (
          <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
        )}
        <GiphyContextProvider>
          <ChannelInner theme={themeClassName} toggleMobile={toggleMobile} />
        </GiphyContextProvider>
      </Channel>
    </Chat>
  );
};

export default App;
