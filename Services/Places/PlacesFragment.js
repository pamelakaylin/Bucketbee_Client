import { gql } from '@apollo/client';

export const PLACE_ARRAY_FRAGMENT = gql`
  fragment PlaceArray on Category {
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
`;
