// Imports for S3 Need to be added on your own

export const streamToString = async (stream) => {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let result = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result += decoder.decode(value, { stream: true });
    }

    result += decoder.decode();
    return result;
};

export const streamToBlob = (stream) => {
    return new Promise((resolve, reject) => {
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('error', reject);
      stream.on('end', () => resolve(new Blob(chunks)));
    });
};

export const fetchProfile = async (profile) => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/profile.json`,
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const bodyContents = await streamToString(data.Body);
        return JSON.parse(bodyContents);
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export const fetchInitialPosts = async () => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: 'posts.json',
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const jsonData = await streamToString(data.Body);
        const shuffledVideos = JSON.parse(jsonData).sort(() => 0.5 - Math.random());
        return JSON.parse(shuffledVideos);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};

export const fetchUploads = async (profile) => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/uploads.json`,
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const bodyContents = await streamToString(data.Body);
        return JSON.parse(bodyContents);
    } catch (error) {
        console.error('Error fetching uploads:', error);
    }
};

export const fetchFavs = async (profile) => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/favorites.json`,
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const bodyContents = await streamToString(data.Body);
        return JSON.parse(bodyContents);
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
};

export const fetchShared = async (profile) => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/reposts.json`,
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const bodyContents = await streamToString(data.Body);
        return JSON.parse(bodyContents);
    } catch (error) {
        console.error('Error fetching reposts:', error);
    }
};

export const fetchPhoto = async (profile) => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/pic.png`,
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const bodyContents = await streamToBlob(data.Body);
        return URL.createObjectURL(bodyContents);
    } catch (error) {
        console.error('Error fetching profile picture:', error);
    }
};

export const fetchThumbnails = async (profile) => {
    try {
        const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/Thumbnails/`,
        };
        const command = new GetObjectCommand(params);
        const data = await s3Client.send(command);
        const bodyContents = await streamToBlob(data.Body);
        return URL.createObjectURL(bodyContents);
    } catch (error) {
        console.error('Error fetching thumbnails:', error);
    }
};

export const handleProfileUpdate = async (profile) => {
    try {
        const command = new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${profile.Uname}/profile.json`,
        Body: JSON.stringify(profile),
        ContentType: 'application/json'
        });
        await s3Client.send(command);
        alert('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Profile update failed, please try again.');
    }
};

export const fetchSettings = async (profile) => {
    try {
      const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile}/settings.json`,
      };
      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command);
      return JSON.parse(data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
};

export const handleSaveChanges = async (profile) => {
    try {
      await s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${profile}/profile.json`,
        Body: JSON.stringify(user),
        ContentType: 'application/json'
      }));

      await s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${profile}/settings.json`,
        Body: JSON.stringify(savedSettings),
        ContentType: 'application/json'
      }));
      
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
};

export const fetchConversations = async (profile) => {
    try {
      const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile}/ConvoList.json`,
      };
      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command);
      const jsonData = await streamToString(data.Body);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

export const fetchMessages = async (profile, friend) => {
    try {
      const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile}/Messages/${friend}.json`,
      };
      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command);
      const jsonData = await streamToString(data.Body);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
};

export const fetchFriends = async (profile) => {
    try {
      const params = {
        Bucket: 'rifraf.site',
        Key: `users/${profile}/friends.json`,
      };
      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command);
      const jsonData = await streamToString(data.Body);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
};

export const sendMessage = async (profile, message, messages) => {
  try {
    const newMessage = { From: profile, Message: message };
    const updatedMessages = [...messages, newMessage];
    await Promise.all([
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${profile}/Messages/${friend}.json`,
        Body: JSON.stringify(updatedMessages),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${friend}/Messages/${profile}.json`,
        Body: JSON.stringify(updatedMessages),
        ContentType: 'application/json'
      }))
    ]);
    return JSON.parse(updatedMessages);
  } catch (error) {
    console.error('Error sending message:', error);
    alert('Message failed to send. Please try again.');
  }
};
