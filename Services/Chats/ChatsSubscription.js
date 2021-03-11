import { gql } from '@apollo/client';

export const MESSAGE_SENT_SUBSCRIPTION = gql`
  subscription messageSent($author: ID!, $chatId: ID) {
    messageSent(author: $author, chatId: $chatId) {
      id
      chatId
      description
      author
      content
      timeslots
      photo
      createdAt
    }
  }
`;
