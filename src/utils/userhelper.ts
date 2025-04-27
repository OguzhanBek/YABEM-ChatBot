import { getAllCollectionData, setCollectionData } from "./firebasehelper";
import { generateMD5, generateOTP, generateUUID } from "./helper";

export const handleSignUp = async (email: string, password: string ) => {
  try {
    const OTP = generateOTP();
    let userId = generateUUID();
    const result = await setCollectionData("users", {
      email: email,
      password: generateMD5(password),
      id: userId,
      otp:OTP,
      active:false
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