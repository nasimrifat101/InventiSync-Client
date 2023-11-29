const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="max-w-6xl mx-auto footer p-10 text-base-content">
        <aside>
          <p className="text-2xl font-black text-green-200">InventiSync</p>
          <p>
            InventiSync Inc.
            <br />
            Providing reliable tech since 2023
          </p>
        </aside>
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Inventory Tracking</a>
          <a className="link link-hover">Analytics</a>
          <a className="link link-hover">User Dashboard</a>
          <a className="link link-hover">Data Management</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <aside>
        <p className="text-center bg-base-200 pb-4">Copyright © 2023 - All right reserved by InventiSync Industries Ltd</p>
      </aside>
    </div>
  );
};

export default Footer;
