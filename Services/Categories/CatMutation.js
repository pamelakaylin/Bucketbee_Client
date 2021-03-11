import { gql } from '@apollo/client';

export const ADD_CATEGORY = gql`
  mutation addCategory($bucketId: ID!, $label: String) {
    addCategory(bucketId: $bucketId, label: $label) {
      id
      label
      places {
        id
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($bucketId: ID!, $catId: ID!) {
    deleteCategory(bucketId: $bucketId, catId: $catId) {
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
