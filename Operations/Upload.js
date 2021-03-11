const cloudName = 'pmelacodes';
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

export const uploadToCloud = async (result) => {
  let base64Img = `data:image/jpg;base64,${result.base64}`;
  const data = {
    file: base64Img,
    upload_preset: 'jrortysj',
  };

  const res = await fetch(CLOUDINARY_URL, {
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
  });

  const cloudImg = await res.json();
  return cloudImg.url;
};
