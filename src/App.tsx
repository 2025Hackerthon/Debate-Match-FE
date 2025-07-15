import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { LandingPage } from "./pages/Landing";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header isLoggedIn={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
