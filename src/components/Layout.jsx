import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="page-layout">
        <Aside />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
