console.log('Background script running...');


import {ref, set } from "firebase/database";
import { db } from "../firebase/firebaseConfig";


// function sendUid2Data() {
//   // Create a reference to 'uid2' at the root node
//   const uid2Ref = ref(db, 'uid2');
  
//   // Data to send
//   const data = {
//     data: 'hogyabro'
//   };
  
//   // Set data at 'uid2' path using the Modular SDK's set function
//   set(uid2Ref, data)
//     .then(() => {
//       console.log('Data saved successfully!');
//     })
//     .catch((error) => {
//       console.log('Error saving data:', error);
//     });
// }

// sendUid2Data()

// chrome.runtime.onMessage.addListener(
//   (
//     message: { type: string; payload: any },
//     sender: chrome.runtime.MessageSender,
//     sendResponse: (response?: any) => void
//   ) => {
//     console.log('Message received in background:', message);
    
//     if (message.type === 'SEND_DATA') {
//       // Existing SEND_DATA handling...
//     } else if (message.type === 'TEST_MESSAGE') {
//       const data = message.payload;


//       console.log('Received TEST_MESSAGE:', message.payload);
     
//       sendResponse({ status: 'Test message received' });
//     }
//   }
// );



