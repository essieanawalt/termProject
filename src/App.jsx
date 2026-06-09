import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Contact from "./pages/Contact";
import Memory from "./pages/Memory";
import Market from "./pages/Market";
import Playground from "./pages/Playground";

// to add a new page: import it, add a Route, and create the .jsx file in pages/
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/work"
        element={
          <Layout>
            <Work />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/playground"
        element={
          <Layout>
            <Playground />
          </Layout>
        }
      />
      <Route
        path="/memory"
        element={
          <Layout>
            <Memory />
          </Layout>
        }
      />
      <Route
        path="/market"
        element={
          <Layout>
            <Market />
          </Layout>
        }
      />
    </Routes>
  );
}
