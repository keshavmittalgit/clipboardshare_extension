import React from 'react';
import { createRoot } from 'react-dom/client'; // Relative path, correct
import Popup from './popup';
import '../tailwind.css';

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup/>);
