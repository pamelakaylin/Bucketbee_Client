import { gql } from '@apollo/client';

export const GET_CHATS = gql`
  query getChats($userId: ID!) {
    getChats(userId: $userId) {
      id
      name
      admin
      members {
        id
        firstName
        lastName
        username
        email
        birthday
        createdAt
        location
        vibe
        emojis
        profile_pic
      }
      messages {
        id
        description
        author
        content
        createdAt
      }
      updatedAt
    }
  }
`;

export const GET_CHAT_BY_ID = gql`
  query getChatById($chatId: ID!) {
    getChatById(chatId: $chatId) {
      id
      name
      admin
      members {
        id
        firstName
        lastName
        username
        email
        birthday
        createdAt
        location
        vibe
        emojis
        profile_pic
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
