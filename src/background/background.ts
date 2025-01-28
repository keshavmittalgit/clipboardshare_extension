console.log("Background script running...");
// import { onAuthStateChanged } from "firebase/auth";re

import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";

async function updateData(payload) {
  try {
    // 'payload' follows the structure:
    // { [uid]: { data: data } }F
    const user = auth.currentUser;
    const documentRef = doc(db, "users", user.uid);

    // Update the document with the new payload
    await updateDoc(documentRef, payload);
    console.log("Data successfully updated!");
  } catch (error) {
    console.error("Error updating data:", error);
  }
}

chrome.runtime.onMessage.addListener(
  (
    message: { type: string; payload: any },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log("Message received in background:", message);

    if (message.type === "SEND_DATA") {
      // Existing SEND_DATA handling...
    } else if (message.type === "TEST_MESSAGE") {
      const data = message.payload;

      updateData(data);
      // alert("Data updated successfully!");

      
      console.log("Received TEST_MESSAGE:", message.payload);

      sendResponse({ status: "Test message received" });
    }
  }
);




