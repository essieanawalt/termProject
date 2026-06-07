import Header from "./Header";
import Aside from "./Aside";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="page-layout">
        <main>{children}</main>
        <Aside />
      </div>
      <Footer />
    </>
  );
}
