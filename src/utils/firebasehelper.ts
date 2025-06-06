import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db, realtime } from "../firebase";
import { get, ref, remove, set } from "firebase/database";
import { generateMD5, generateUUID } from "./helper";
import { Chats, Message, UserData } from "../stores/Store";
import { toast } from "react-toastify";

// Create (Add new document)
export const setCollectionData = async (table: string, data: object) => {
  try {
    if (!table || !data) return false;

    const docRef = await addDoc(collection(db, table), data);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};

// Read (Get a document by ID)
export const getCollectionData = async (table: string, id: string) => {
  try {
    const docRef = doc(db, table, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    return null;
  }
};

// Read (Get all documents in a collection)
export const getAllCollectionData = async (table: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, table));
    return querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  } catch (e) {
    console.error("Error getting documents: ", e);
    return [];
  }
}; // bunu kullanmadım. Gelecekte işe yarayabilir.

// Update (Edit a document by ID)
export const updateCollectionData = async (
  table: string,
  id: string,
  data: object
) => {
  try {
    const docRef = doc(db, table, id);
    await updateDoc(docRef, data);
    return true;
  } catch (e) {
    console.error("Error updating document: ", e);
    return false;
  }
}; // bunu kullanmadım. Gelecekte işe yarayabilir.

// Delete (Remove a document by ID)
export const deleteCollectionData = async (table: string, id: string) => {
  try {
    const docRef = doc(db, table, id);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error("Error deleting document: ", e);
    return false;
  }
}; // bunu kullanmadım. Gelecekte işe yarayabilir.

// realtime database w/socket

export const getRoomList = async () => {
  const result: Chats[] = [];
  const dataRef = ref(realtime, "rooms");

  try {
    const snapshot = await get(dataRef);
    const data = snapshot.val();

    if (data) {
      Object.keys(data).forEach((key) => {
        result.push(data[key]);
      });
    }
  } catch (error) {
    console.error("Error fetching room list: ", error);
  }

  return result;
};

export const getRoomData = async (roomId: string) => {
  let result: Chats = {
    messages: [],
    roomId: "",
    roomName: "",
    createAt: 0,
    userId: "",
  };
  const dataRef = ref(realtime, `rooms/${roomId}`);
  const snapshot = await get(dataRef);
  if (snapshot.exists()) {
    const data: Chats = snapshot.val();
    if (data) return data;
  } else {
    console.log("Veri bulunamadı");
  }
  return result;
};

export const createRoom = async (userId: string, message: Message) => {
  const uuid = await generateUUID(18);
  let data = {
    roomName: message.text,
    roomId: uuid,
   
    createAt: new Date().valueOf(),
    userId: userId,
    createDate: new Date().valueOf(),
    messages: [message],
  };
  set(ref(realtime, `rooms/${uuid}`), data);
  return data;
};

export const removeRoom = async (roomId: string) => {
  try {
    await remove(ref(realtime, `rooms/${roomId}`));
    return true;
  } catch (error) {
    console.error(`Oda silinirken hata oluştu:`, error);
    return false;
  }
};

export const pushMessageToFirebase = async (roomId: string, newMessage: Message) => {
  try {
    const roomData = await getRoomData(roomId);
    let messages = roomData.messages || [];
    messages.push(newMessage);
    await set(ref(realtime, `rooms/${roomId}`), {
      ...roomData,
      messages: messages,
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateUserById = async (userId: string, data: object) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No user found with this ID.");
      return false;
    }

    for (const docSnap of querySnapshot.docs) {
      await updateDoc(docSnap.ref, data);
      console.log(`Updated user document with Firestore ID: ${docSnap.id}`);
          toast.success("Kayıt Başarılı", {
                position: "top-center",
                autoClose: 3000,
                theme: "colored",
              });
    }

    return true;
  } catch (error) {
    console.error("Error updating user: ", error);
    return false;
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Belirtilen ID ile eşleşen bir kullanıcı bulunamadı.");
      return false;
    }

    for (const docSnap of querySnapshot.docs) {
      await deleteDoc(docSnap.ref);
    }
  } catch (error) {
    console.error("Error deleting user: ", error);
    return false;
  }
};

export const checkUser = async (email: string, pw: string) => {
  try {
    const hashedPw = generateMD5(pw);
    
    // Sorguyu oluştur
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      where("password", "==", hashedPw)
    );
    
    // Sorguyu çalıştır
    const querySnapshot = await getDocs(q);
    
    // Eşleşen kullanıcı var mı kontrol et
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as UserData;
      return userData;
    }
    
    return null; // Kullanıcı bulunamadı
    
  } catch (error) {
    console.error("Sorgu hatası:", error);
    throw error;
  }
};