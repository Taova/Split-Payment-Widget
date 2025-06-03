# 🛒 Merchant Integration Guide

## 📘 What is SeQura Widget?

An embeddable widget that allows merchants to display installment payment options on their websites.

---

## ✅ How to Integrate

### 1. Add to `<head>`:

```html
<link href="https://cdn.your-domain.com/sequra-widget/widget.css" rel="stylesheet" />
<script src="https://cdn.your-domain.com/sequra-widget/widget.iife.js"></script>
```

> 🛑 NOTE: CDN is not live yet — you can host `dist/widget.css` and `dist/widget.iife.js` on your own server temporarily.

---

### 2. Add a container

```html
<div id="widget"></div>
```

---

### 3. Render the widget

```html
<script>
  window.addEventListener("load", function () {
    if (window.SeQuraWidget && typeof window.SeQuraWidget.render === "function") {
      SeQuraWidget.render({
        containerId: "widget",
        price: 29999
      });
    }
  });
</script>
```

---

### 4. Update the price dynamically

```js
window.SeQuraWidget.update(45000);
```
