import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


// Vendor CSS Imports (without AOS)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'glightbox/dist/css/glightbox.min.css';
//import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper-bundle.css';

// Your Custom Main CSS
import './assets/css/main.css';  // Ensure the path is correct if it's not in the `src/assets` folder

// Fonts (you can also add these in index.html, but this works in JS too)
//import './fonts';  // Define the fonts import like this if needed


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
