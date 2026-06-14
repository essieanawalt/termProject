import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <div className="page-layout">
        <Aside />
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </>
  );
}
