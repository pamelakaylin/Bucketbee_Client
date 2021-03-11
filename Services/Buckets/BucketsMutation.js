import { gql } from '@apollo/client';

export const CREATE_BUCKET = gql`
  mutation createBucket(
    $input: BucketInput!
    $place: PlaceInput
    $userId: ID!
  ) {
    createBucket(input: $input, place: $place, userId: $userId) {
      id
      title
      notes
      date_created
      categories {
        id
        label
        places {
          id
          latitude
          longitude
          name
          rating
          user_ratings_total
          weekday_text
          open_now
          description
          formatted_address
          international_phone_number
          imgArr
          url
          review
          notes
        }
      }
    }
  }
`;

export const ADD_USER_TO_BUCKET = gql`
  mutation addUserToBucket($bucketId: ID!, $userId: ID!) {
    addUserToBucket(bucketId: $bucketId, userId: $userId) {
      id
      members {
        id
      }
    }
  }
`;

export const DELETE_BUCKET = gql`
  mutation deleteBucket($bucketId: ID!) {
    deleteBucket(bucketId: $bucketId) {
      id
    }
  }
`;

export const CHANGE_BUCKET_NAME = gql`
  mutation changeBucketName($bucketId: ID!, $title: String) {
    changeBucketName(bucketId: $bucketId, title: $title) {
      id
      title
      notes
      date_created
      categories {
        id
        label
        places {
          id
          latitude
          longitude
          name
          rating
          user_ratings_total
          weekday_text
          open_now
          description
          formatted_address
          international_phone_number
          imgArr
          url
          review
          notes
        }
      }
    }
  }
`;
