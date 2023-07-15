import React from "react";

import AppProviders from "./components/AppProviders";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppProviders>
      <AppLayout />
    </AppProviders>
  );
}

export default App;
