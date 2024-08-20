import React from 'react';
import {logChatPromiseExecution} from 'stream-chat';
import {MessageInput, MessageList, Thread, useChannelActionContext, Window,} from 'stream-chat-react';
import {encodeToMp3} from 'stream-chat-react/mp3-encoder';

import {MessagingChannelHeader} from '../../components';
import type {StreamChatGenerics} from '../../types';

export type ChannelInnerProps = {
  theme: string;
};

const ChannelInner = (props: ChannelInnerProps) => {
  const { theme } = props;

  const { sendMessage } = useChannelActionContext<StreamChatGenerics>();
  const actions = ['delete', 'edit', 'flag', 'markUnread', 'mute', 'react', 'reply'];

  return (
    <>
      <Window>
        <MessagingChannelHeader theme={theme}  />
        <MessageList messageActions={actions} />
        <MessageInput
            focus
            audioRecordingConfig={{ transcoderConfig: { encoder: encodeToMp3 } }} audioRecordingEnabled asyncMessagesMultiSendEnabled />
      </Window>
      <Thread />
    </>
  );
};

export default ChannelInner;
