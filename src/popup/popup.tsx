import React, { useState, useEffect, useRef } from "react";
import "./popup.css";
// import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { auth, db } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function LoggedIn() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");

      // Send a logout message to the background script and wait for its response
      chrome.runtime.sendMessage({ type: "LOGOUT" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error(
            "Error receiving logout response:",
            chrome.runtime.lastError
          );
          return;
        }
        console.log("Received logout message from background:", response);
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const sendDataToBackground = () => {
    const data: string = inputRef.current?.value;
    if (!data) {
      console.log("input is empty");
      return;
    }
    const payload = { data };

    chrome.runtime.sendMessage({ type: "TEST_MESSAGE", payload }, (response) => {
      if (chrome.runtime.lastError) {
        console.error("Message sending failed:", chrome.runtime.lastError);
        return;
      }
      console.log("Response from background:", response);
    });
  };

  const copyTextToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard successfully');
    } catch (error) {
      console.error('Error copying text: ', error);
    }
  };

  // Handler for button click that calls the clipboard function.
  const handleCopyClick = () => {
    const textToCopy = 'Hello, world!';
    copyTextToClipboard(textToCopy);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 px-4">
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-3xl mt-2"
      >
        Logout
      </button>
      <div className="flex justify-between gap-3 w-full">
        <input
          type="text"
          ref={inputRef}
          className="bg-slate-200 p-3 w-full"
          placeholder="Enter data"
          id="datatosend"
        />
        <button
          className="bg-blue-700 text-white p-2 rounded"
          onClick={sendDataToBackground}
        >
          Send
        </button>
      </div>
      <div className="flex justify-center items-center gap-2 p-2">
        <button className="border-red-700 bg-purple-400" onClick={handleCopyClick}>
          write from clipboard
        </button>
        <button className="bg-purple-400">read from clipboard</button>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="w-full max-w-md p-4 pb-0">
      <div className="bg-black/10 backdrop-blur-[10px] rounded-xl w-full flex pl-4 items-center py-3">
        <h2 className="text-xl font-bold pr-3 flex gap-1 items-center justify-center">
          <div>
            <span>ClipShare</span>{" "}
            <span className="text-[12px] font-normal px-[2px]">for</span>{" "}
            <span className="text-[14px] font-medium">browser extension</span>
          </div>
        </h2>
      </div>
    </div>
  );
}

function LoginPage({ togglePage }: { togglePage: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      // onAuthStateChanged will handle updating the UI based on authentication
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex-row items-center justify-center w-full h-full">
      <div className="w-full max-w-md p-6 pt-1">
        <h2 className="text-lg font-bold mb-6 mt-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-[14px] mb-2">
              Email<span className="text-blue-700">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="border rounded-3xl px-4 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-[14px] mb-2">
              Password<span className="text-blue-700">*</span>
            </label>
            <div className="relative flex items-center">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className="border rounded-3xl px-3 py-2 w-full pr-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye : faEyeSlash}
                  className="text-gray-400 hover:text-gray-600"
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-3xl w-full text-[14px]"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700" onClick={togglePage}>
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SignupPage({ togglePage }: { togglePage: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function addData(payload = { data: "" }) {
    try {
      const user = auth.currentUser;
      const documentRef = doc(db, "users", user.uid);
      await setDoc(documentRef, payload);
      console.log("Data successfully stored!");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      addData();
      togglePage();
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex-row items-center justify-center w-full h-full">
      <div className="w-full max-w-md p-6 pt-1">
        <h2 className="text-lg font-bold mb-6 mt-4">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-[14px] mb-2">
              Email<span className="text-blue-700">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="border rounded-3xl px-4 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-[14px] mb-2">
              Password<span className="text-blue-700">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="border rounded-3xl px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium text-[14px] mb-2">
              Confirm Password<span className="text-blue-700">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="border rounded-3xl px-3 py-2 w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-3xl w-full text-[14px]"
          >
            Sign up
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <p>
            You have an account?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700" onClick={togglePage}>
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Popup() {
  const [showSignupPage, setShowSignupPage] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // New: loading state

  const togglePage = () => {
    setShowSignupPage((prev) => !prev);
  };

  useEffect(() => {
    const sendMessage = () => {
      chrome.runtime.sendMessage({ type: "AUTH_CHECK" }, (response) => {
        console.log("Response from background:", response);
        // Optionally update user state from background response
        setUser(response || null);
        if(response){
          setIsLoading(false);
        }
      });
    };

    sendMessage();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase auth state changed:", currentUser);
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribeAuth();
      chrome.runtime.onMessage.removeListener(sendMessage);
      console.log("Cleanup: Removed message listener");
    };
  }, []);

  return (
    <div className="w-[330px] h-[100%] justify-center flex-row">
      <Navbar />
      {isLoading ? (
        <div className="flex justify-center items-center h-full">....</div>
      ) : user ? (
        <LoggedIn />
      ) : (
        <>
          {showSignupPage ? (
            <SignupPage togglePage={togglePage} />
          ) : (
            <LoginPage togglePage={togglePage} />
          )}
        </>
      )}
    </div>
  );
}
