# AirPodsMax Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)  

**Live Demo**: [https://airpodsmax-five.vercel.app](https://airpodsmax-five.vercel.app)  

---

This is a responsive e-commerce website showcasing and selling **AirPods Max**, featuring a **3D product viewer**, **dynamic checkout flow**, and **API integrations** via serverless functions. The project was created as part of my academic coursework to demonstrate **front-end development**, **API integration**, and **backend communication using serverless architecture**.  

![Project demo](./img/demoGif.gif)  

---

## ✅ Features  

- **Responsive Design**: Fully responsive layout with a smooth checkout flow.  
- **3D Model Viewer**: Built with **Three.js**, allowing users to interact with the AirPods Max in 3D as they scroll.  
- **Checkout Process**: Includes shopping cart, dynamic validation, and credit card detection.  
- **Tooltips**: Contextual tooltips for better user guidance (e.g., CVV input).  
- **SEO Optimization**: Includes `sitemap.xml`, `robots.txt`, and meta descriptions.  
- **Accessibility**: Designed for usability across devices and screen readers.  

---

## ✅ Backend Features  

This project uses **Vercel Serverless Functions** (Node.js runtime) — implemented in the `/api` folder (no dedicated server required).  

- **Geolocation API (OpenCage)**: Retrieves location details from ZIP code.  
- **Credit Card API (Binlist.net)**: Detects card brand dynamically and displays the correct logo.  
- **Error Handling**: Includes proper handling for API failures and rate limits.  

---

## ✅ Technologies Used  

- **Frontend**: HTML, CSS, Vanilla JavaScript  
- **Backend**: Vercel Serverless Functions (Node.js runtime) — `/api` folder  
- **Libraries**:
   - [Three.js](https://threejs.org/): 3D Rendering
   - [AOS.js](https://michalsnik.github.io/aos/): Scroll animations
   - [intl-tel-input](https://intl-tel-input.com/): International telephone numbers
- **Test**: [Cypress](https://www.cypress.io/)
- **APIs**:  
  - [OpenCage Geocoding API](https://opencagedata.com/api)  
  - [Binlist Card Lookup](https://lookup.binlist.net/)  
- **Deployment**: [Vercel](https://vercel.com/)  
- **Version Control**: Git + GitHub  

---

## ✅ Running Locally  

You can run both the frontend and the backend functions locally.  

### Requirements  
- [Node.js](https://nodejs.org/)  
- [Vercel CLI](https://vercel.com/download) (`npm i -g vercel`)  

---

### Steps  
1. Clone the repository and install the dependencies:  
   ```bash
   git clone https://github.com/jpedromergulhao/airpodsmax.git
   cd airpodsmax
   npm install
   ```  

2. Create a `.env` file in the root and add:  
   ```
   OPEN_CAGE_API_KEY=Your_Api_Key
   ```  

3. Run locally:  
   ```bash
   vercel login    # Only for local simulation (does NOT deploy)
   vercel dev
   ```  

4. Access:  
   - **Frontend**: `http://localhost:3000`  
   - **API Endpoints**:  
     - `http://localhost:3000/api/geocode?zipCode=12345`  
     - `http://localhost:3000/api/cardLookup?cardNumber=411111`  

You can use `4111111111111111` as a test card number. This is a fictitious Visa card provided for testing purposes only.  

---

## ✅ Deployment  

The website and API functions are deployed on **Vercel**. Frontend and API share the same domain.  

Example production API call:  
```
https://airpodsmax-five.vercel.app/api/geocode?zipCode=12345
```  

---

## ✅ Files Overview  

## ✅ Files Overview

- `/api/geocode.js`: Fetches location data from OpenCage based on the zip code.
- `/api/cardLookup.js`: Detects credit card brand using Binlist.
- `/libraries/three`: Three.js library files.
- `/libraries/gsap.min.js`: Minified GSAP library for smooth 3D model animation.
- `/libraries/intlTelInputWithUtils.min.js`: Minified intl-tel-input library.
- `/cypress/e2e`: Contains end-to-end (E2E) tests.
- `sitemap.xml`: Helps search engines crawl the site.
- `robots.txt`: Controls indexing. Example:

   ```bash
   User-agent: *
   Disallow: /checkout.html
   Allow: /
   Sitemap: [https://airpodsmax-five.vercel.app/sitemap.xml](https://airpodsmax-five.vercel.app/sitemap.xml)
   ```  

- **Tooltip**: Provides visual guidance for CVV input.
- **3D Model (Three.js)**: A 3D model that enhances interactivity and user engagement.

---

## ✅ SEO & Crawling Optimization  
- Sitemap for structured crawling.  
- Robots.txt to manage access.  

---

## ✅ License  
This project is **academic** and intended solely for demonstrating development skills.  
Not open for contributions or forks.  
