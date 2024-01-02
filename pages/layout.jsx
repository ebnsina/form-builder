import Header from "@/components/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="px-4">{children}</main>
    </>
  );
}

export default Layout;
