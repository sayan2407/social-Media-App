import { Client, Account, Databases, Storage, Avatars} from 'appwrite';

export const appWriteConfig = {
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    url: import.meta.env.VITE_APPWRITE_PROJECT_URL,
    databaseId:  import.meta.env.VITE_DATABASE_ID,
    mediaId:  import.meta.env.VITE_MEDIA_ID,
    userCollectionId:  import.meta.env.VITE_USERS_COLLECTION_ID,
    postsCollectionId:  import.meta.env.VITE_POSTS_COLLECTION_ID,
    savesCollectionId:  import.meta.env.VITE_SAVES_COLLECTION_ID,
}



console.log('appWriteConfig ', appWriteConfig);


export const client = new Client();

client
    .setEndpoint(appWriteConfig.url)
    .setProject(appWriteConfig.projectId); // Replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export { ID } from 'appwrite';
