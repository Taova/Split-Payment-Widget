# Tech Overview and Architectural Decisions

## Objective
The goal is to build an embeddable installment payment widget for merchants

I selected the **Imperative Widget API + CDN** approach for its flexibility, speed of integration, and minimal requirements on the merchant’s tech stack.

---

## 📦 Current Solution: Imperative Widget API + CDN

### 🛠 Example Integration:
```html
<script src="https://cdn.sequra.com/widget.js"></script>
<script>
  seQuraWidget.init({ selector: '#installments', price: 399.99 });
  // Update dynamically later:
  seQuraWidget.update({ price: 499.99 });
</script>
```

### 🧩 Implementation:
- Built with **React** and `ReactDOM.createRoot()`
- Global object `seQuraWidget` exposes `init()` and `update()`
- Supports dynamic updates via JavaScript
- Distributable via CDN (and optionally via NPM in the future)

### ✅ Pros:
- **Framework-agnostic**: works in React, Vue, Angular, or plain HTML
- **Easy to integrate**: just drop a script and call `init()`
- **Dynamic**: update price with `update()` without full reload
- **Zero build integration required**

### ❗ Cons:
- No native **style encapsulation** (styles may leak or clash)
- No **Shadow DOM** (see recommendations below)

---

## 🔁 Alternative Approaches Considered

### 1. Web Component (Custom Element)
```html
<installment-widget price="399.99"></installment-widget>
```
**Pros:**
- Works with **any framework or stack**
- Can be distributed via **CDN or NPM**
- **Shadow DOM** provides style encapsulation

**Cons:**
- More complex architecture
- Higher entry barrier (especially for teams unfamiliar with Web Components or Shadow DOM)
- Limited support for React-specific features (hooks, context)

> Web Components would be a great option, but given complexity, learning curve, and current React-based focus, I opted for a more maintainable solution.

---

### 2. IFrame Widget
```html
<iframe src="https://cdn.sequra.com/widget.html?price=39999"></iframe>
```
**Pros:**
- Full **style and logic isolation**
- Works on any page regardless of tech stack
- Extremely secure and robust

**Cons:**
- Requires **postMessage** for communication
- More difficult to make responsive
- Less flexible in terms of styling and DOM integration
- Cannot seamlessly interact with merchant's app state

---

## 🛠 Technical Highlights

- Developed in **React** & **Typescript**
- **Tailwind CSS v4** for utility-first styling
- **@headlessui/react** used for interactive components like `Dialog` and `Listbox`

---

## 🔍 Why I Chose This Approach

- ⚙️ Must be embeddable in **any kind of website**, regardless of tech stack
- 🧩 Easy to integrate: just drop a script
- ⏱ Rapid implementation and maintenance
- 👩‍💻 Lower learning curve for devs unfamiliar with Web Components or Shadow DOM

---

## 🚧 Potential Improvements

- **Encapsulation:** Current approach lacks true style isolation. Consider wrapping the widget in **Shadow DOM** via `react-shadow` or similar solution.
- **CSS Purge:** Tailwind should be configured to purge unused styles for smaller bundle sizes.
- **Minimize Dependencies:** For further optimization, remove `@headlessui/react` and use pure Tailwind where possible.

---

## ✅ Conclusion

Using the Imperative Widget API + CDN proved to be the most practical and scalable approach for this project. It offers an ideal balance of flexibility, speed, and ease of integration — without locking us into any one tech stack.

