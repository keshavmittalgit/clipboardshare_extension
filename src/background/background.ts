chrome.runtime.onMessage.addListener(
  (
    message: { type: string; payload: any },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log('Message received in background:', message);
    
    if (message.type === 'SEND_DATA') {
      // Existing SEND_DATA handling...
    } else if (message.type === 'TEST_MESSAGE') {
      console.log('Received TEST_MESSAGE:', message.payload);
      sendResponse({ status: 'Test message received' });
    }
  }
);