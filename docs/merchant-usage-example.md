# 📦 Integration Examples: SeQuraWidget

These examples show how to initialize the SeQura widget across different technology stacks.

## 📄 Head Requirements (all stacks)

Add the following to your `<head>`:

```html
<!-- TODO: Replace with real CDN path when available -->
<link
  href="https://cdn.your-domain.com/sequra-widget/widget.css"
  rel="stylesheet"
/>
<script src="https://cdn.your-domain.com/sequra-widget/widget.iife.js"></script>
```

## ⚙️ `render()` Parameters

| Option        | Description                                      |
| ------------- | ------------------------------------------------ |
| `containerId` | ID of the element where widget should render     |
| `price`       | Total amount in **cents** (e.g. 299.99€ = 29999) |

---

## 🔁 Updating price dynamically

> 💡 Once the widget is rendered, update the amount like this:

```js
window.SeQuraWidget.update(45000); // 450.00€ in cents
```

---

## 🧱 Examples

### 1. Vanilla JavaScript

```html
<div id="widget"></div>

<script>
  window.addEventListener("load", function () {
    if (
      window.SeQuraWidget &&
      typeof window.SeQuraWidget.render === "function"
    ) {
      window.SeQuraWidget.render({
        containerId: "widget",
        price: 29999, // cents
      });
    }
  });
</script>
```

---

### 2. jQuery

```html
<div id="widget"></div>

<script>
  $(document).ready(function () {
    if (
      window.SeQuraWidget &&
      typeof window.SeQuraWidget.render === "function"
    ) {
      window.SeQuraWidget.render({
        containerId: "widget",
        price: 29999,
      });
    }
  });
</script>
```

---

### 3. React (with useEffect)

```jsx
import { useEffect } from "react";

function PaymentWidget() {
  useEffect(() => {
    if (
      window.SeQuraWidget &&
      typeof window.SeQuraWidget.render === "function"
    ) {
      window.SeQuraWidget.render({
        containerId: "widget",
        price: 29999,
      });
    }
  }, []);

  return <div id="widget" />;
}

export default PaymentWidget;
```

> ⚠️ Make sure `widget.iife.js` is loaded before this component mounts.
