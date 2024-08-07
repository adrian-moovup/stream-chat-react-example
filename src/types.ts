import type { LiteralStringForUnion } from 'stream-chat';

export type AttachmentType = {};
export type ChannelType = {};
export type CommandType = LiteralStringForUnion;
export type EventType = {};
export type MessageType = {
  dialog_type?: string,
  dialog_id?: string,
  action?: string,
};
export type ReactionType = {};
export type UserType = { image?: string };

export type StreamChatGenerics = {
  attachmentType: AttachmentType;
  channelType: ChannelType;
  commandType: CommandType;
  eventType: EventType;
  messageType: MessageType;
  reactionType: ReactionType;
  userType: UserType;
  pollOptionType: Record<string, unknown>;
  pollType: Record<string, unknown>;
};
