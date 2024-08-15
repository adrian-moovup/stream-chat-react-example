import type { MouseEventHandler } from 'react';
import { ChannelList, ChannelListProps } from 'stream-chat-react';

import { MessagingChannelListHeader, MessagingChannelPreview } from '../index';
import { useThemeContext } from '../../context';
import { StreamChatGenerics } from '../../types';

type MessagingSidebarProps = {
  channelListOptions: {
    filters: ChannelListProps<StreamChatGenerics>['filters'];
    sort: ChannelListProps<StreamChatGenerics>['sort'];
    options: ChannelListProps<StreamChatGenerics>['options'];
  };
  onClick: MouseEventHandler;
  onCreateChannel: () => void;
  onPreviewSelect: MouseEventHandler;
};

const MessagingSidebar = ({
  channelListOptions,
  onClick,
  // onCreateChannel,
  onPreviewSelect,
}: MessagingSidebarProps) => {
  const { themeClassName } = useThemeContext();

  return (
    <div
      className={`str-chat messaging__sidebar ${themeClassName}`}
      id='mobile-channel-list'
      onClick={onClick}
    >
      {/*<MessagingChannelListHeader onCreateChannel={onCreateChannel} />*/}
      <MessagingChannelListHeader />
      <ChannelList
        {...channelListOptions}
        Preview={(props) => {
          const channelJobId = props.channel.data?.daywork_id
          const hasUnreadCount =   props.unread
          const filterJobId = channelListOptions.filters?.daywork_id
          const hasUnread = channelListOptions.filters?.has_unread
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
