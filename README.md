# Split Payment Widget

## Embeddable split payment widget built with React and TypeScript — simple to integrate into any merchant website.

---

## 📦 Tech Stack

- **React 18** + **TypeScript**
- **Tailwind CSS** via `@tailwindcss/vite`
- **Vite** (build & dev server)
- **Jest** + **React Testing Library** (unit & integration tests)
- **Playwright** (E2E tests)

---

## Backend Setup (Local API)

```bash
# Go to backend directory
cd api

# Install backend dependencies
npm install

# Start backend server
npm start
```

To avoid CORS issues during local development, make sure to add the following in your `api/app.js`:

```js
app.use(
  cors({
    origin: "http://localhost:5173", // This is the host where your frontend app runs (Vite default)
  }),
);
```

The API server will be running at: http://localhost:8080

---

## Frontend Setup

Once the backend is running, you can start the widget development server:

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build widget
npm run build
```

---

## 📁 Project Structure

```
src/
  components/
  containers/
  hooks/
  api/
  types/
  utils/
  main.tsx        # entry point for widget bundle
  App.tsx         # widget root (with ref forwarding)

tests/
  e2e/            # Playwright tests

index.html      # for manual testing

docs/           # Project documentation:
                # - Setup and installation
                # - Merchant integration guides
                # - Usage examples
                # - Tech stack and project structure
```

---

## 🔍 Manual Testing in `index.html`

To test the widget manually in a browser (without embedding it in another app), use the included `index.html` file.

### 🛠 Steps:

1. **Build the project** (this generates the `dist/` directory):

```bash
npm run build
```

2. **Edit `index.html`** and include the built files manually:

```html
<!-- index.html -->
<head>
  ...
  <!-- Build the project using "npm run build" -->
  <link href="./dist/widget.css" rel="stylesheet" />
  <script src="./dist/widget.iife.js"></script>
</head>
```

3. **Mount the widget by calling `SeQuraWidget.render()`** when the page loads:

```html
<script>
  window.addEventListener("load", function () {
    if (
      window.SeQuraWidget &&
      typeof window.SeQuraWidget.render === "function"
    ) {
      SeQuraWidget.render({
        containerId: "widget",
        price: 30000, // in cents
      });
    } else {
      console.warn("SeQuraWidget is not found");
    }
  });
</script>
```

4. Make sure the `<div id="widget"></div>` container is present in the `<body>` of `index.html`.

5. Ensure the script is fully loaded **before** executing `SeQuraWidget.render(...)`.

6. To update the widget dynamically with a new price, use:

```js
SeQuraWidget.update(60000); // new price in cents
```

---

## 📚 Documentation

All documentation is located in the [`docs/`](./docs) folder.

| File                                                                      | Description                                                                                                                |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [`merchant-guide.md`](./docs/merchant-guide.md)                           | General guide for merchants on how to integrate the widget                                                                 |
| [`merchant-usage-example.md`](./docs/merchant-usage-example.md)           | Code examples for widget integration (Vanilla JS, jQuery, React)                                                           |
| [`tech-overview-and-decisions.md`](./docs/tech-overview-and-decisions.md) | Overview of the tech stack + explanation of technical choices, tradeoffs, assumptions made, and next steps for improvement |
