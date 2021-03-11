import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById($userId: ID!) {
    getUserById(userId: $userId) {
      id
      firstName
      lastName
      username
      email
      birthday
      friends {
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
      createdAt
      updatedAt
      location
      vibe
      emojis
      profile_pic
    }
  }
`;

export const GET_USER_BY_USERNAME = gql`
  query getUserByUsername($username: String!) {
    getUserByUsername(username: $username) {
      id
      firstName
      lastName
      username
      email
    }
  }
`;
