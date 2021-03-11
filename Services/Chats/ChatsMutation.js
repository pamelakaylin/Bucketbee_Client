import { gql } from '@apollo/client';

export const CREATE_CHAT = gql`
  mutation createChat($input: ChatInput) {
    createChat(input: $input) {
      id
      name
      admin
      members {
        id
        firstName
        lastName
        username
        birthday
        createdAt
      }
      messages {
        id
        description
        author
        content
        timeslots
        photo
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const POST_MESSAGE_TO_CHAT = gql`
  mutation postMessageToChat($chatId: ID!, $input: MessageInput) {
    postMessageToChat(chatId: $chatId, input: $input) {
      id
      name
      admin
      members {
        id
        firstName
        lastName
        username
        birthday
        createdAt
      }
      messages {
        id
        description
        author
        content
        timeslots
        photo
        createdAt
      }
      createdAt
      updatedAt
    }
  }
`;
