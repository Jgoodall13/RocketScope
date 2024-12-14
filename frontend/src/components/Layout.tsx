import { Link } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4 shadow">
        <nav className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold hover:text-gray-400">
            RocketScope
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-400">
              Dashboard
            </Link>
            <Link to="/simulation" className="hover:text-gray-400">
              Simulation
            </Link>
            <Link to="/logs" className="hover:text-gray-400">
              Logs
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto py-8">{children}</main>
      <footer className="bg-gray-900 text-white text-center py-4 text-sm">
        RocketScope © 2024. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
