# 🏛️ Property Tax Analytics Dashboard

A modern, production-ready React dashboard for the **UPYOG Property Tax platform**, providing comprehensive analytics across 10 Indian cities with AI-powered insights.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Recharts](https://img.shields.io/badge/Recharts-2.x-orange)
![Gemini AI](https://img.shields.io/badge/Google%20Gemini-AI%20Powered-green)

## 🚀 Features

- ✅ **KPI Dashboard** — 4 key metrics (Total Properties, Approved, Rejected, Total Collection) updating in real-time with city filter
- ✅ **Tenant Filter** — Dropdown to filter by any of the 10 cities or view all cities at once
- ✅ **City Comparison Chart** — Interactive bar chart comparing total collection across all 10 cities
- ✅ **AI Chat Assistant** — Google Gemini-powered chatbot for natural language queries about property tax data
- ✅ **Responsive Design** — Fully responsive layout optimized for desktop, tablet, and mobile
- ✅ **Modern UI** — Premium gradient design with smooth animations and hover effects

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | Frontend framework |
| Recharts | Data visualization |
| Google Gemini API | AI chat assistant |
| CSS3 | Styling & animations |

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd property-tax-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Key

Create a `.env` file in the project root:

```
REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
```

> Get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 4. Start the Development Server

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📊 Data

The dashboard uses `properties.json` containing 1,000 property records across 10 Indian cities:

- Delhi, Mumbai, Pune, Bengaluru, Chennai
- Hyderabad, Ahmedabad, Kolkata, Jaipur, Lucknow

Each record includes property details, tax assessment, collection status, and registration information.

## 📸 Screenshot

![Dashboard Screenshot](screenshot.png)

## 👤 Author

**Your Name**

---

Built with ❤️ using React & Recharts
