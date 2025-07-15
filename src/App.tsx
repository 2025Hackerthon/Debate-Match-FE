import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { ScrollToTop } from "./components/common/ScrollToTop";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Header isLoggedIn={false} />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
