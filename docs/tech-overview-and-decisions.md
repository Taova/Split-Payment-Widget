# 🧠 Tech Stack & Project Structure

## 🛠 Tech Stack

- **React 18 + TypeScript** — UI framework
- **Tailwind CSS** — Utility-first styling
- **Vite** — Fast bundler and dev server
- **Jest + React Testing Library** — Unit/integration testing
- **Playwright** — End-to-end testing

---

## 🗂 Project Structure

```
src/
  components/       # Reusable UI components
  containers/       # Logic and container components
  hooks/            # Custom React hooks
  api/              # API interaction logic
  types/            # Shared TypeScript types
  utils/            # Helper functions and utilities
  main.tsx          # Entry point for the widget bundle
  App.tsx           # Root widget component (with ref forwarding)

tests/
  e2e/              # End-to-end tests (Playwright)

index.html          # Manual testing page

docs/               # Project documentation:
                    # - Setup and installation
                    # - Merchant integration guides
                    # - Usage examples
                    # - Tech stack and structure
```
