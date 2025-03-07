console.log("Background script running...");


import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";


let currentAuthState:boolean = false;

onAuthStateChanged(auth, (user) => {
  currentAuthState = !!user;
});

setTimeout(() => {
  console.log("Current auth state:", currentAuthState);
}, 2000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "AUTH_CHECK") {
      console.log(currentAuthState);
      sendResponse(currentAuthState);
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "LOGOUT") {
    console.log("Background script received logout request from:", sender);
    
    // Perform any logout cleanup or state update if needed
    currentAuthState = null; // For example, clear any stored auth state

    // Send a response back to the sender confirming logout was processed
    sendResponse({ status: "Logout successful" });
    
    // Return true if you plan to respond asynchronously (not required in this example)
    return false;
  }
  
  // Handle other message types if needed
});



async function updateData(payload) {
  try {
    // 'payload' follows the structure:
    // { [uid]: { data: data } }
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
// background.js



// async function ensureOffscreenDocument() {
//   const exists = await chrome.offscreen.hasDocument();
//   if (!exists) {
//     await chrome.offscreen.createDocument({
//       url: chrome.runtime.getURL('offscreen.html'),
//       reasons: [chrome.offscreen.Reason.CLIPBOARD],
//       justification: 'Write text to the clipboard.'
//     });
//   }
// }

// export async function copyTextToClipboard(text: string) {
//   await ensureOffscreenDocument();
//   chrome.runtime.sendMessage({ action: 'copyToClipboard', text }, (response) => {
//     if (response?.status === 'success') {
//       console.log('Text copied to clipboard!');
//     } else {
//       console.error('Clipboard copy failed:', response?.error);
//     }
//   });
// }


  // copyTextToClipboard("data from background scipt....")





