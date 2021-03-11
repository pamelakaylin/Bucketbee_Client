import { gql } from '@apollo/client';

export const GET_BUCKETS = gql`
  query getBuckets($userId: ID!) {
    getBuckets(userId: $userId) {
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

export const GET_BUCKET_BY_ID = gql`
  query getBucketById($bucketId: ID!) {
    getBucketById(bucketId: $bucketId) {
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
