import { GET_CHATS } from '../Services/Chats/ChatsQuery';
import { POST_MESSAGE_TO_CHAT } from '../Services/Chats/ChatsMutation';
import { useQuery, useMutation } from '@apollo/client';

const SendBucket = (friendList, input, userId) => {
  let currentChats;
  const [postMessageToChat] = useMutation(POST_MESSAGE_TO_CHAT);
  const { loading, error, data } = useQuery(GET_CHATS, {
    variables: { userId },
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  if (data && data.getChats) {
    currentChats = data.getChats;
    friendList.forEach((id) => {
      let existingChat = currentChats.filter(
        (c) => c.members.includes(id) && c.members.length === 2,
      );
      if (existingChat.length) {
        const chatId = existingChat[0].id;
        postMessageToChat({
          variables: { chatId, input },
        });
      }
    });
  }
};

export default SendBucket;
