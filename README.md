# Next.js Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js, TypeScript, and Shadcn UI. This project provides a comprehensive overview of key business metrics, user engagement, and campaign performance, featuring real-time data simulation and flexible data export options.

## Key Features

- **Interactive Dashboard**: A central hub for visualizing essential metrics like revenue, user counts, and conversion rates.
- **Real-Time Data Simulation**: The dashboard simulates live data updates for all key metrics, providing a dynamic and engaging user experience. This is achieved through a polling mechanism that periodically fetches and displays new, randomly generated data.
- **Data Export**: Easily export data tables to both PDF and CSV formats. The application ensures consistent data formatting across all export types.
- **Responsive Design**: The UI is fully responsive and adapts seamlessly to various screen sizes, from mobile devices to desktops.
- **Component-Based Architecture**: Built with reusable React components and styled with the highly customizable Shadcn UI library.

## Project Structure

The project follows a standard Next.js structure, with the most important files located in the `src` directory:

```
/src
├── app/                # Main application pages and routing
│   └── page.tsx        # The primary dashboard page component
├── components/         # Reusable React components
│   ├── charts/         # Chart components (e.g., revenue, users)
│   ├── ui/             # UI components from Shadcn UI
│   ├── data-export.tsx # Logic for PDF and CSV exports
│   └── ...             # Other shared components
├── lib/                # Utility functions and shared logic
│   ├── data.ts         # Static data used to initialize the dashboard
│   ├── real-time-service.ts # Simulates real-time data updates
│   └── utils.ts        # Utility functions (e.g., cn for classnames)
└── ...
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory:**
   ```bash
   cd analytics
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Data Export**: [jsPDF](https://github.com/parallax/jsPDF) & [react-csv](https://github.com/react-csv/react-csv)
