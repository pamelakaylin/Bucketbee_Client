# Bucketbee

## Lifestyle app for global citizens

Bucketbee is a mobile app designed to help frequent travellers and global citizens keep tabs on their favourite people and places. 
1. It helps users connect with close friends and family conveniently with "quick actions" such as sending out location updates.
2. Users can create buckets, in which they can categorize and customize their favorite places for future reference.  
3. Users can personalize their own places, digital postcards, and even profile style.

![buckbetbee_intro](https://user-images.githubusercontent.com/59074533/113441443-3d970280-93e6-11eb-8210-08a965fc2fd9.png)

![bucketbee demo](https://user-images.githubusercontent.com/59074533/113442905-d29afb00-93e8-11eb-8b6a-1aadc7963b67.png)

![bucketbee demo (1)](https://user-images.githubusercontent.com/59074533/113442697-71732780-93e8-11eb-9d1a-2a29d43b506b.png)

# Getting started

### The client and server for this project has been split up into two separate repos; both need to be up and running for the app to be functional. Find the server [here](https://github.com/pamelakaylin/Bucketbee_Server).

1. Clone this repo

```
git clone https://github.com/pamelakaylin/Bucketbee_Client.git 
```
2. Navigate into the root folder and install the dependencies

```
npm install
```
3. APIs

- Setup an account on Google Cloud Platform, create a new project, enable the Places API, and generate an API key.
- Create an .env file and add REACT_NATIVE_GOOGLE_API_KEY=[put_api_key_here]

4. Start the app!

```
expo start
```

5. Set up the server if you haven't already done so

- You can find instructions in the server README [here](https://github.com/pamelakaylin/Bucketbee_Server).


# App demo video

Here is the original app demo video on Youtube:
[![Screenshot 2021-04-02 at 18 10 28](https://user-images.githubusercontent.com/59074533/113443028-0ece5b80-93e9-11eb-952c-0cd890382c66.png)](https://www.youtube.com/watch?v=pKOvp1QCg0g)

# Tech Stack

### Frontend
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.io/)
- [Apollo Client with WebSocket Subscriptions](https://www.apollographql.com/docs/react/) 
- [React Spring](https://www.react-spring.io/)
- [Lottie](https://airbnb.io/lottie/#/) 

## Backend
- [GraphQL](https://graphql.org/) 
- [Apollo Server with WebSocket Subscriptions](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

## APIs
- [Google Maps](https://developers.google.com/maps)
- [Google Places](https://cloud.google.com/maps-platform/places) 


# Next Steps

- Bucketbee is fully optimized for IOS and is currently being adapted for Android
- After some finishing touches, Bucketbee will be launched via the App Store and Google Play Store 🚀


