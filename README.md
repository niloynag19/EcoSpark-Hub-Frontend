# 🌱 EcoSpark Hub — Frontend

### *Empowering Sustainable Innovation through Community-Driven Ideas*

Welcome to the frontend repository of **EcoSpark Hub**, a premium web application designed to connect sustainability enthusiasts with actionable eco-friendly innovations. Built with cutting-edge technologies, this platform offers a seamless, high-performance, and visually stunning experience for users to share, discover, and monetize green ideas.

---

## 🚀 Key Features

- **✨ Immersive UI/UX**: Cinematic animations and smooth scrolling powered by **GSAP**, **Framer Motion**, and **Lenis**, creating a premium "app-like" feel.
- **📊 Dynamic Dashboards**: 
  - **User Dashboard**: Track submitted ideas, engagement metrics, and monetization status.
  - **Admin Panel**: Robust moderation tools, user management, and platform-wide analytics using **Recharts**.
- **💡 Idea Ecosystem**: A centralized hub for submitting, browsing, and discussing sustainability solutions with nested commenting and real-time voting.
- **💳 Premium Monetization**: Secure integration with **Stripe** for purchasing exclusive, high-impact green blueprints.
- **🤖 AI Chatbot Assistant**: An integrated AI companion to guide users through the platform and provide sustainability insights.
- **📱 Fully Responsive**: A mobile-first approach ensuring a perfect experience across desktops, tablets, and smartphones.
- **🌓 Adaptive Theme**: Intelligent light and dark mode support using **Next-Themes**.

---

## 🛠 Tech Stack

The EcoSpark Hub frontend leverages the latest industry standards for performance and developer experience:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (Modern, utility-first CSS)
- **Components**: [Base UI](https://base-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State/API**: [Axios](https://axios-http.com/) & React Context API
- **Animations**: [GSAP](https://greensock.com/gsap/), [Framer Motion](https://framer.com/motion/), [Lenis](https://lenis.darkroom.engineering/)
- **Data Visualization**: [Recharts](https://recharts.org/)
- **Payments**: [Stripe React SDK](https://stripe.com/docs/stripe-js/react)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)

---

## 📂 Directory Structure

```bash
client/
├── src/
│   ├── app/            # Next.js App Router (Pages & Layouts)
│   ├── components/     # Reusable UI components (Dashboard, Layout, Shared)
│   ├── context/        # Global state management (Auth, Theme)
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API interaction logic (Axios instances)
│   ├── styles/         # Global CSS and Tailwind configurations
│   ├── types/          # TypeScript interfaces and types
│   └── utils/          # Helper functions and constants
├── public/             # Static assets (Images, SVGs, Fonts)
└── .env.local          # Environment variables
```

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/niloynag19/EcoSpark-Hub-Frontend.git
   cd EcoSpark-Hub-Frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root of the `client` directory and add:
   ```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to find and fix problems in the codebase.

---

## 🎨 Design Philosophy

EcoSpark Hub follows a **Premium Green** aesthetic. The design focuses on:
- **Clarity**: High contrast and clean typography (Inter/Geist).
- **Eco-Centricity**: A palette of deep forest greens, vibrant teals, and soft whites.
- **Motion**: Subtle micro-interactions that guide the user's attention without being distracting.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for a Greener Future by <b>Team EcoSpark</b>
</p>
