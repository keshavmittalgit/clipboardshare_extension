
import "./popup.css";
// import app from '../firebase/firebase'


import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 w-[100%] h-[100%]">
      <div className="bg-white w-full max-w-md p-6">
        
          <h2 className="text-base font-bold pb-4">Clip Board Share </h2>
          <h2 className="text-base font-bold pb-4">Login </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-bold text-[14px] mb-2">
              Email<span className="text-blue-700">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="border rounded-2xl px-4 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-bold mb-2 text-[14px]">
              Password*
            </label>
            <input
              id="password"
              type="password"
              className="border rounded-2xl px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-2xl w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};





export default function Popup() {
  return (
    <>
      <div className="w-[330px] h-[350px] flex justify-center">
        <LoginPage/>
      </div>
    </>
  );
}
