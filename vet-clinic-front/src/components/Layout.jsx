import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet /> {/* Aqui entram as páginas */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
