import { gql } from '@apollo/client';

export const ADD_PLACE = gql`
  mutation addPlace($catId: ID!, $input: PlaceInput!) {
    addPlace(catId: $catId, input: $input) {
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

export const DELETE_PLACE = gql`
  mutation deletePlace($bucketId: ID!, $catId: ID!, $placeId: ID!) {
    deletePlace(bucketId: $bucketId, catId: $catId, placeId: $placeId) {
      id
    }
  }
`;

export const EDIT_PLACE_NOTES = gql`
  mutation editPlaceNotes(
    $bucketId: ID!
    $catId: ID!
    $placeId: ID!
    $notes: String
  ) {
    editPlaceNotes(
      bucketId: $bucketId
      catId: $catId
      placeId: $placeId
      newNote: $notes
    ) {
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
