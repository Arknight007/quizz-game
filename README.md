# Quizz - The Smartest Quiz Companion

[![Vercel Deployment](https://vercelbadge.vercel.app/api/Arknight007/quezz)](https://quezz.vercel.app)
![MIT License](https://img.shields.io/github/license/Arknight007/quezz)
![Next.js](https://img.shields.io/badge/Built%20with-Next.js-000?logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Styled%20with-Tailwind%20CSS-38BDF8?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-3178C6?logo=typescript&logoColor=white)

**Quezz** is a sleek, interactive quiz app built with the latest web technologies—**Next.js 14+ App Router**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**—powered by the Open Trivia DB API.

Test your knowledge, challenge your friends, and enjoy a buttery-smooth quiz experience—whether you're online or offline.

---

## ✨ Features

- 🚀 **Blazing-fast & Modern**: Built with Next.js 14+ App Router & TypeScript  
- 🎨 **Beautiful UI**: Tailwind CSS + shadcn/ui components with polished styling  
- 🎞️ **Framer Motion Animations**: Smooth transitions & engaging micro-interactions  
- 🧩 **Dynamic Quizzes**: Pulls questions in real-time from [Open Trivia DB](https://opentdb.com/)  
- ⚙️ **Fallback/Offline Mode**: Works even when the API fails (offline-first experience)  
- ♿ **Accessible by Design**: Keyboard navigation, focus rings, screen-reader friendly  
- 🧠 **Categories, Difficulty, Types**: Customize your quiz just the way you like it  
- 📊 **Scoreboard**: See how you did after each round  

---

## 📸 Preview

> _Add screenshots or a GIF here to showcase UI (e.g., `/public/screenshots/homepage.png`)_

---

## 🛠️ Tech Stack

| Tech              | Role                      |
|-------------------|---------------------------|
| **Next.js 14+**   | App Router, SSR/SSG/ISR   |
| **TypeScript**    | Type safety & dev UX      |
| **Tailwind CSS**  | Utility-first styling     |
| **shadcn/ui**     | Accessible UI components  |
| **Framer Motion** | Animations & transitions  |
| **Open Trivia API** | Live question fetching  |

---

## 🧱 Architecture (PlantUML Diagram)

> System architecture of Quezz — including API integration, fallback handling, and component structure.

```mermaid
flowchart TD
  User[User]
  Browser[Browser]
  App[Nextjs App Router]
  UI[UI Components]
  Motion[Framer Motion]
  Logic[Quiz Logic State]
  API[Open Trivia API]
  Fallback[Local JSON Fallback]

  User --> Browser
  Browser --> App
  App --> UI
  App --> Motion
  App --> Logic
  Logic --> API
  Logic --> Fallback
  UI --> Logic
  Logic --> UI

```

> _Generated with [mermaid](https://plantuml.com/), 

---

## 🚧 Installation & Development

```bash
git clone https://github.com/Arknight007/quezz.git
cd quezz
pnpm install  # or npm / yarn
pnpm dev      # run locally
```

Open `http://localhost:3000` to start using the app.

---

## 🧪 Want to Test It?

Try the [Live Demo](https://quezz.vercel.app) or run locally using the steps above.

Customize quiz settings and hit "Start Quiz" to experience the magic.

---

## 📁 Folder Structure

```
quezz/
├── app/               # Next.js App Router pages/layouts
├── components/        # Reusable UI components (Buttons, Card, Timer, etc.)
├── lib/               # Utility functions (e.g., shuffle, fetch logic)
├── public/            # Static assets (images, fallback.json, diagrams)
├── styles/            # Global styles (tailwind.config, etc.)
├── types/             # TypeScript interfaces/types
└── ...
```

---

## 🌐 API Reference

All questions are fetched from [Open Trivia DB](https://opentdb.com/api_config.php). You can filter by:

- **Category** (e.g., Science, History, Tech)  
- **Difficulty** (`easy`, `medium`, `hard`)  
- **Type** (`multiple`, `boolean`)  

---

## 📡 Offline Mode Logic

If the API is unavailable, a fallback set of questions is used from a local JSON file (`/lib/data/fallback.json`) ensuring the quiz experience remains uninterrupted.

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to:

- Add more question sources (e.g., custom APIs)  
- Improve animations or accessibility  
- Add new game modes (timed quiz, multiplayer, etc.)  

...just fork the repo and go wild! 😄

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

> _“Knowledge is power. But a good quiz makes it fun!”_
