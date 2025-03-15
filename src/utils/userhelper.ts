import { getAllCollectionData, setCollectionData } from "./firebasehelper";
import { generateMD5, generateUUID } from "./helper";

export const handleSignUp = async (email: string, password: string) => {
  try {
    let userId = generateUUID();
    const result = await setCollectionData("users", {
      email: email,
      password: generateMD5(password),
      id: userId,
    });
    if (result) {
      let allUsers = await getAllCollectionData("users");
      let currentUser = allUsers.find((userx) => userx.email === email);
      if (currentUser) {
        return {
         data: currentUser
        };
      } else {
        return false;
      }
    }
  } catch (error) {
    return false;
  }
};