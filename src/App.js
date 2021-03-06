import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Create from "./Pages/Create";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <Router>
      <div className="container d-flex flex-column min-vh-100">
        <Header />

        <section className="py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
