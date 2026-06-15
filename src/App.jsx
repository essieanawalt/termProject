import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Memory from "./pages/Memory";
import Market from "./pages/Market";
import PetalDrop from "./pages/PetalDrop";
import Playground from "./pages/Playground";
import NotFound from "./pages/NotFound";

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
        path="/petal-drop"
        element={
          <Layout>
            <PetalDrop />
          </Layout>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}
