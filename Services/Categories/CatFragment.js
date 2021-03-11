import { gql } from '@apollo/client';

export const CAT_ARRAY_FRAGMENT = gql`
  fragment CategoryArray on Bucket {
    categories {
      id
      label
      places {
        id
      }
    }
  }
`;
