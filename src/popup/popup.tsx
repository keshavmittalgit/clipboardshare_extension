import React, { useState, useEffect } from "react";``
import "./popup.css";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { auth } from "../firebase/firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  onAuthStateChanged,
  signOut // Added: signOut for logout functionality
} from "firebase/auth";

function LogedIn(){
  // Added: Logout functionality
  const handleLogout = async () => { // New: Function to handle user logout
    try {
      await signOut(auth); // Changed: auth.signOut() to signOut(auth)
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return(
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">Welcome!</h1>
      <button
        onClick={handleLogout} // New: Logout button handler
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-3xl"
      >
        Logout
      </button>
    </div>
  );
}


function Navbar() {
  return (
    <div className=" w-full max-w-md p-4 pb-0">
      <div className="bg-black/10 backdrop-blur-[10px] rounded-xl w-[100%] flex pl-4 items-center py-3 ">
        <h2 className="text-xl font-bold pr-3  flex gap-1 items-center justify-center">
          <img src="./logo.svg" alt="" className="pr-[4px]" />
          <div>
            <span className="">ClipShare</span>{" "}
            <span className="text-[12px] font-normal px-[2px] ">for{"  "}</span>
            {"  "}
            <span className="text-[14px] font-medium">browers extension</span>
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

  const handleSubmit = async (e: React.FormEvent) => { // Changed: Made handleSubmit async
    e.preventDefault();
    setError(null); // Added: Reset error message before attempting login
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // New: Firebase login
      console.log("User logged in:", userCredential.user);
      // Authentication state is handled by onAuthStateChanged in Popup component
    } catch (error: any) { // Changed: Added type for error
      console.error("Login error:", error);
      setError(error.message); // New: Set error message to display to user
    }
  };
  

  

  return (
    <div className="flex-row items-center justify-center w-[100%] h-[100%]  ">
      <div className="w-full max-w-md p-6 pt-1">
        <h2 className="text-lg font-bold mb-6 mt-4">Login </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-[14px] mb-2"
            >
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
            <label
              htmlFor="password"
              className="block font-medium text-[14px] mb-2"
            >
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
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} className="text-gray-400 hover:text-gray-600" />
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
  const [confirmPassword, setConfirmPassword] = useState(""); // Added: confirmPassword state
  const [error, setError] = useState<string | null>(null); // Added: State for error messages

  // Updated handleSubmit to use Firebase's createUserWithEmailAndPassword
  const handleSubmit = async (e: React.FormEvent) => { // Changed: Made handleSubmit async
    e.preventDefault();
    setError(null); // Added: Reset error message

    if (password !== confirmPassword) { // New: Password confirmation check
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password); // New: Firebase signup
      console.log("User signed up:", userCredential.user);
      togglePage(); // New: Redirect to login after successful signup
    } catch (error: any) { // Changed: Added type for error
      console.error("Signup error:", error);
      setError(error.message); // New: Set error message to display to user
    }
  };

  return (
    <div className="flex-row items-center justify-center w-[100%] h-[100%]">
      <div className="w-full max-w-md p-6 pt-1">
        <h2 className="text-lg font-bold mb-6 mt-4">Sign up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-medium text-[14px] mb-2"
            >
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
            <label
              htmlFor="password"
              className="block font-medium text-[14px] mb-2"
            >
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
            <label
              htmlFor="confirmPassword"
              className="block font-medium text-[14px] mb-2"
            >
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

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* New: Display error message */}

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
};

export default function Popup() {
  const [showSignupPage, setShowSignupPage] = useState(false); // State to toggle between LoginPage and SignupPage
  const [user, setUser] = useState<any>(null); // Added: State to hold the authenticated user

  const togglePage = () => {
    setShowSignupPage((prev) => !prev); // Toggle the state
  };

  // Added: Listen for authentication state changes
  useEffect(() => { // New: useEffect to handle auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { // New: Firebase auth listener
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe(); // New: Cleanup function
  }, []);

  return (
    <div className="w-[330px] h-[100%] justify-center flex-row">
      <Navbar />
      {user ? ( // New: Conditional rendering based on user authentication
        <LogedIn />
      ) : (
        <AnimatePresence mode="wait">
          {showSignupPage ? (
            <motion.div
              key="signup"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              <SignupPage togglePage={togglePage} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.05 }}
            >
              <LoginPage togglePage={togglePage} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
