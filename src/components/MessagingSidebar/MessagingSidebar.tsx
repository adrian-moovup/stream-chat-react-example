import type { MouseEventHandler } from 'react';
import { ChannelList, ChannelListProps, useChatContext } from 'stream-chat-react';

import { MessagingChannelListHeader, MessagingChannelPreview } from '../index';
import { StreamChatGenerics } from '../../types';

type MessagingSidebarProps = {
  channelListOptions: {
    filters: ChannelListProps<StreamChatGenerics>['filters'];
    sort: ChannelListProps<StreamChatGenerics>['sort'];
    options: ChannelListProps<StreamChatGenerics>['options'];
  };
  onCreateChannel: () => void;
  onPreviewSelect: MouseEventHandler;
};

const MessagingSidebar = ({
  channelListOptions,
  // onCreateChannel,
  onPreviewSelect,
}: MessagingSidebarProps) => {
  const { theme } = useChatContext<StreamChatGenerics>()

  return (
    <div
      className={`str-chat messaging__sidebar ${theme}`}
      id='mobile-channel-list'
    >
      {/*<MessagingChannelListHeader onCreateChannel={onCreateChannel} />*/}
      <MessagingChannelListHeader />
      <ChannelList
        {...channelListOptions}
        Preview={(props) => {
          const channelJobId = props.channel.data?.daywork_id
          const filterJobId = channelListOptions.filters?.daywork_id
          if (filterJobId && channelJobId !== filterJobId) {
            return <></>
          }
          return <MessagingChannelPreview {...props} onClick={onPreviewSelect} />
        }}
      />
    </div>
  );
};

export default MessagingSidebar;
