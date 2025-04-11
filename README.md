# AirPodsMax Website

This is a responsive e-commerce website showcasing and selling AirPods Max, featuring a 3D model viewer and an optimized user experience across different devices. The project was created to demonstrate my front-end development skills and knowledge.

![Home Screen](./Screenshot.png);

## Features

- **Responsive Design**: Fully responsive pages, especially the checkout page, optimized for both mobile and desktop devices.
  
- **3D Model Viewer**: An interactive 3D model of the AirPods Max built using Three.js, allowing users to rotate and explore different views of the product.
  
- **Checkout Process**: A secure and user-friendly checkout process with dynamic access control, ensuring that users can only access the checkout page if they have a product in their cart.
  
- **SEO Optimization**: The website includes a sitemap.xml and robots.txt to help search engines crawl and index the site more effectively.

- **Tooltips**: Added helpful tooltips to clarify form fields, such as the CVV input field, for a smoother user experience.

- **Meta Descriptions**: Enhanced SEO by adding meta descriptions to key pages, helping search engines understand the content and improving search rankings.

- **Accessibility**: Focused on making the website easily navigable and accessible to all users.

## Backend Features

- **Geolocation API (OpenCage)**: Integrated OpenCage API to retrieve location details based on user input, providing a better user experience during address input.

- **Data Processing**: The backend processes location data efficiently, ensuring relevant and structured responses for frontend integration.

- **Security & Error Handling**: Implemented proper error handling to manage API responses, including rate limits and invalid queries.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript (Pure JavaScript for all functionalities)
  
- **Backend**: Node.js (Express API to handle geolocation requests)

- **3D Rendering**: Three.js (used for the interactive 3D model of AirPods Max)
  
- **SEO**: Sitemap.xml, robots.txt, and meta tags to improve search engine optimization

- **Build & Deployment**: Deployed via Vercel, with version control managed on GitHub

- **Version Control**: Git

## Installation

To run this project locally, clone the repository and open the project directory:

1. Clone the repository:
   ```bash
   git clone https://github.com/jpedromergulhao/airpodsmax.git
   cd airpodsmax

2. Install dependencies (for backend functionality):
npm install

3. Start the development server:
npm run dev

4. Open index.html in your browser to view the website.

## Deployment

The website is deployed on Vercel.

## Files Overview

### Backend (/api/geolocation.js)
Handles API requests to fetch geolocation data from OpenCage. It validates input, structures responses, and prevents unnecessary API calls.

### sitemap.xml
The `sitemap.xml` file contains a map of all important pages on the site, allowing search engines to crawl and index the website more effectively.

### robots.txt
The `robots.txt` file is used to direct search engine crawlers on which pages should or should not be crawled. For example:

```txt
User-agent: *
Disallow: /checkout.html
Allow: /
Sitemap: https://airpodsmax.vercel.app/sitemap.xml
```

### meta tags
The <meta name="description"> tag is added to the index.html file to provide search engines with a description of the page. This helps improve SEO rankings.

### robots.txt (Access Control)
The robots.txt file also manages search engine crawling. Specifically, we disallow the checkout page from being crawled until a valid session or cart state is met.

### Tooltip
A tooltip is displayed to guide users on how to fill in the CVV field during checkout, ensuring a smoother user experience.

### 3D Model (Three.js)
The AirPods Max 3D model is interactive, allowing users to rotate and explore the product. Ongoing work is focused on improving performance and interactions with the 3D model.

## SEO & Crawling Optimization

### Sitemap
The `sitemap.xml` file is used to inform search engines about the structure of the website and assist in indexing pages efficiently.

### Robots.txt
The `robots.txt` file configures search engine bots on which pages to crawl or avoid. For example, `/checkout.html` is disallowed until certain conditions are met (such as the user having a product in their cart).

## License
This project is personal and intended solely for demonstrating my front-end development skills. It is not open for contributions or forks.
