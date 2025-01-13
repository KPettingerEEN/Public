// Imports for S3 Need to be added on your own

export const registerUser = async (userName, profilesData, friendData, followingData, settingsData, favoritesData, repostData, uploadData) => {
  try {
    await Promise.all([
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/profile.json`,
        Body: JSON.stringify(profilesData),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/friends.json`,
        Body: JSON.stringify(friendData),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/following.json`,
        Body: JSON.stringify(followingData),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/settings.json`,
        Body: JSON.stringify(settingsData),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/favorites.json`,
        Body: JSON.stringify(favoritesData),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/reposts.json`,
        Body: JSON.stringify(repostData),
        ContentType: 'application/json'
      })), 
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/uploads.json`,
        Body: JSON.stringify(uploadData),
        ContentType: 'application/json'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/Thumbnails/`,
        ContentType: 'folder'
      })),
      s3Client.send(new PutObjectCommand({
        Bucket: 'rifraf.site',
        Key: `users/${userName}/Messages/`,
        ContentType: 'folder'
      })),
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, error };
  }
};
