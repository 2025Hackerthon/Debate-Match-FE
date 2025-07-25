import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";
import { Header } from "./components/common/Header";
import { Footer } from "./components/common/Footer";
import { ScrollToTop } from "./components/common/ScrollToTop";
import {
  Landing,
  Login,
  Signup,
  Home,
  Records,
  Mypage,
  Debate,
  Result
} from "./pages/index";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <ScrollToTop />
          <Header isLoggedIn={true} username="sjy08" />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/records" element={<Records />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/debate" element={<Debate />} />
            <Route path="/result" element={<Result />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
