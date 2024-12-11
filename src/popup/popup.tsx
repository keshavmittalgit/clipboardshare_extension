import React from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css'; // Relative path, correct



const test = (
  <div>
    <h1>Hello World how are yoiur adf bro </h1>
  </div>
);

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(test);
