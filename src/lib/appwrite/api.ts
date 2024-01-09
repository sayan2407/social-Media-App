import { INewUser } from "@/types";
import { ID, account, appWriteConfig, avatars, databases } from "./config";
import { Url } from "url";
import { Query } from "appwrite";

export const createUser = async (user:INewUser) => {

    try{

        const newUser = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )

        if (!newUser) throw new Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newAccount = await saveUserToDb({
            accountId: newUser.$id,
            Name: newUser.name,
            imageUrl: avatarUrl,
            Username: user.username,
            Email: user.email
        });

        return newAccount;

    } catch(error) {
        console.log(error);
        return error;        
    }

}

export const saveUserToDb = async (user:{
    accountId: string,
    Name: string,
    imageUrl: Url,
    Username: string,
    Email: string
}) => {

    try {
        const saveNewAccount = await databases.createDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            ID.unique(),
            user
        );

        return saveNewAccount;
    } catch(error) {
        console.log(error);
        
    }
}

export const signInAccount = async (user : {
    email : string,
    password: string
}) => {
    try {
        console.log('signin-user', user);
        
        const session = await account.createEmailSession(
            user.email,
            user.password
        );

        return session;
    } catch (error) {
        console.log(error);
        
    }

}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if ( !currentAccount ) throw Error;


        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        );

        if (!currentUser) throw Error;


        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        
    }
}

export const signOutAccount = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;

    } catch(error) {
        console.log("Logout Failed ", error);
        return false;        
    }
}