import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
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
      <Route
        path="*"
        element={
          <Layout>
            <article>
              <h1>page not found</h1>
              <p>This page doesn't exist.</p>
            </article>
          </Layout>
        }
      />
    </Routes>
  );
}
