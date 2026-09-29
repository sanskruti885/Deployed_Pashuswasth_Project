# PashuSwasth-Doot 🐄🌾

Live Demo: https://pashuswasthdooth.onrender.com/

**PashuSwasth-Doot** is a web-based livestock healthcare and management platform designed to connect farmers directly with qualified veterinary professionals and essential livestock management tools[cite: 1, 2]. The platform offers an end-to-end solution for animal healthcare, disease awareness, educational resources, livestock marketplace trading, and government insurance schemes[cite: 1, 2].

---

## 🌟 Key Features

### 🔑 Admin Portal
* **Doctor Management:** Add, update, search, filter, and remove veterinarian profiles from the platform[cite: 1, 9].
* **Feedback Management:** Review feedback, inquiries, and ratings submitted by platform users[cite: 1].

---

### 👨‍🌾 Farmer / User Module
* **Interactive Dashboard:** Quick-access hub to view listed cattle, access essential health services, and navigate tools[cite: 2, 5].
* **Find Veterinarians:** Browse and filter qualified veterinarians by specialization (e.g., General Veterinary, Livestock Specialist, Dairy Health, Bovine Reproduction, Animal Nutrition, Veterinary Surgery) with direct contact options via call or email[cite: 1, 2, 6].
* **Cattle Marketplace (Buy & Sell):**
  * Create detailed listings for cattle with images, breed, age, gender, price, location, milk yield description, and seller contact info[cite: 1, 2].
  * Search and filter listings categorized by "For Sale" and "Wanted to Buy"[cite: 1, 2].
* **Disease Information & Symptom Guide:**
  * **A-Z Disease Database:** Comprehensive reference library of common cattle diseases[cite: 2].
  * **Symptom-Based Search:** Search remedies and remedies/treatments based on specified animal symptoms[cite: 2].
* **Basic Care & Educational Resources:**
  * **Video Tutorials:** Video guides covering proper feeding, calf care, post-birth care, seasonal care, and treatment tips[cite: 2].
  * **Curated Articles:** Academic and practical articles on cattle health, nutrition, and behavior[cite: 2].
  * **Common Healthcare Practices:** Guidelines on health check-ups, vaccination schedules, parasite control, nutrition management, housing, and hoof care[cite: 2, 8].
  * **Preventive Measures & Precautions:** Detailed checklists for biosecurity, sanitation, vaccination, and calving management[cite: 2].
* **Popular Questions (FAQ):** Simple, practical answers to common farmer queries regarding cattle health and livestock management[cite: 2, 7].
* **Insurance Schemes:** Direct access to government and regional livestock insurance schemes and welfare policies[cite: 2].

---

## 🏗️ Technology Stack & Architecture

Based on the project structure:

* **Frontend:** React, TypeScript, Tailwind CSS, PostCSS
* **Backend:** Node.js / Express backend service[cite: 10]
* **Build Tools & Package Manager:** Bun / npm, Vite[cite: 10]
* **Media Management:** Cloudinary integration for cattle listing image uploads[cite: 2]

---

📁 Project Directory Structure

PashuSwasth-Doot/
├── .vscode/               # VS Code configuration settings[cite: 12]
├── backend/               # Express/Node server backend[cite: 12]
│   ├── config/            # Database and app configurations[cite: 12]
│   ├── controller/        # Request controllers and logic[cite: 12]
│   ├── middleware/        # Custom Express middlewares[cite: 12]
│   ├── model/             # Database schemas/models[cite: 12]
│   ├── routes/            # API endpoints & route handlers[cite: 12]
│   ├── uploads/           # Backend media uploads[cite: 12]
│   ├── .env               # Backend environment variables[cite: 12]
│   └── server.js          # Entry point for backend server[cite: 12]
├── dist/                  # Production build output[cite: 12]
├── node_modules/          # Node dependencies[cite: 12]
├── public/                # Static public assets[cite: 11, 12]
├── src/                   # React frontend source code[cite: 11, 12]
│   ├── components/        # Reusable UI components[cite: 11]
│   ├── contexts/          # React context providers[cite: 11]
│   ├── hooks/             # Custom React hooks[cite: 11]
│   ├── layouts/           # Page layout wrappers[cite: 11]
│   ├── lib/               # Helper utility libraries[cite: 11]
│   ├── pages/             # Page views/routes[cite: 11]
│   ├── utils/             # Helper functions and constants[cite: 11]
│   ├── .env.local         # Frontend local environment variables[cite: 11]
│   ├── App.css            # Main application CSS[cite: 11]
│   ├── App.jsx / App.tsx  # Main React App component[cite: 11]
│   ├── index.css          # Global styles[cite: 11]
│   ├── main.jsx / main.tsx# Application DOM entry point[cite: 11]
│   └── vite-env.d.ts      # Vite TypeScript type declarations[cite: 11]
├── uploads/               # Shared media upload storage[cite: 11, 12]
├── .gitignore             # Git ignored files configuration[cite: 12]
├── bun.lockb              # Bun lockfile[cite: 12]
├── components.json        # UI Component configuration[cite: 12]
├── eslint.config.js       # ESLint configuration[cite: 10]
├── package.json           # Project metadata and dependencies[cite: 10]
├── package-lock.json      # npm lockfile[cite: 10]
├── postcss.config.js      # PostCSS configuration[cite: 10]
├── tailwind.config.js     # Tailwind CSS configuration[cite: 10]
└── tsconfig.json          # TypeScript compilation configuration[cite: 10]