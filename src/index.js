import React from "react";
import { createRoot } from "react-dom/client"; // <-- STEP 1: Update the import
import App from "./App";

// Find the container element in your HTML (usually index.html)
const container = document.getElementById("root");

// Ensure the container element exists
if (container) {
  // Create a root and render the application
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ); // <-- STEP 2: Use createRoot().render()
}
