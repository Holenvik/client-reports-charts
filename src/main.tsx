import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./redux/store.ts";
import "./index.css";
import { Provider } from "react-redux";
import ErrorBoundary from "./components/errorBoundary/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
