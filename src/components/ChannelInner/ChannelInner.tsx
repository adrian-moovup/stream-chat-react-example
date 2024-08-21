import React from 'react';
import { MessageInput, MessageList, Thread, useChatContext, Window, } from 'stream-chat-react';
import {MessagingChannelHeader} from '../../components';

const ChannelInner = () => {
  const { theme} = useChatContext()
  const actions = ['delete', 'edit', 'flag', 'markUnread', 'mute', 'react', 'reply'];

  return (
    <>
      <Window>
        <MessagingChannelHeader theme={theme}  />
        <MessageList messageActions={actions} />
        <MessageInput focus asyncMessagesMultiSendEnabled />
      </Window>
      <Thread />
    </>
  );
};

export default ChannelInner;
