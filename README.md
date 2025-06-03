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

## 🛠 How to Integrate the Widget (for Merchants)

To embed the SeQura installment widget into your website, follow these steps:

### 1. Include the widget script and styles

Add the following **inside the `<head>` tag** of your HTML page:

```html
<!-- TODO: Replace with actual CDN URL when available -->
<link href="https://cdn.your-domain.com/sequra-widget/widget.css" rel="stylesheet" />
<script src="https://cdn.your-domain.com/sequra-widget/widget.iife.js"></script>
```

> 🛑 NOTE: CDN is not live yet — you can host `dist/widget.css` and `dist/widget.iife.js` on your own server temporarily.

---

### 2. Add the widget container

Place an empty `<div>` where you want the widget to be rendered.
This `id` must match the `containerId` you pass into the render call.

```html
<div id="widget"></div>
```

---

### 3. ✅ Render the widget after script is loaded

Call `SeQuraWidget.render()` once the script is ready:

```html
<script>
  window.addEventListener("load", function () {
    if (
      window.SeQuraWidget &&
      typeof window.SeQuraWidget.render === "function"
    ) {
      window.SeQuraWidget.render({
        containerId: "widget", // ID of your placeholder div
        price: 29999, // total price in cents
      });
    } else {
      console.warn("SeQuraWidget is not found");
    }
  });
</script>
```

---

### 4. 🔁 Dynamically update the price

You can update the widget by calling:

```js
window.SeQuraWidget.update(45000); // new total price in cents
```

> 💡 Look at the examples in `examples.md` file.
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
```

---
