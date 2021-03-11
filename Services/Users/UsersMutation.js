import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation registerUser($input: UserInput!) {
    registerUser(input: $input) {
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

export const LOGIN_USER = gql`
  mutation loginUser($input: UserInput!) {
    loginUser(input: $input) {
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

export const ADD_INFO_TO_USER = gql`
  mutation addInfoToUser(
    $userId: ID!
    $location: String
    $vibe: String
    $emojis: String
  ) {
    addInfoToUser(
      userId: $userId
      location: $location
      vibe: $vibe
      emojis: $emojis
    ) {
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

export const ADD_PROFILE_PIC_TO_USER = gql`
  mutation addProfilePicToUser($userId: ID!, $profile_pic: String) {
    addProfilePicToUser(userId: $userId, profile_pic: $profile_pic) {
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

export const ADD_FRIEND_TO_USER = gql`
  mutation addFriendToUser($userId: ID!, $friendId: ID!) {
    addFriendToUser(userId: $userId, friendId: $friendId) {
      id
      firstName
      lastName
      username
      email
      friends {
        id
        firstName
        lastName
        birthday
      }
    }
  }
`;
