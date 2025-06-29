import { FaTachometerAlt, FaBoxOpen, FaMoneyCheckAlt } from 'react-icons/fa';
import { Outlet, Link } from 'react-router';

const DashboardLayouts = () => {
  return (
    <>
      {/* Main Drawer Container (for large screens and toggling) */}
      <div className="drawer lg:drawer-open">
        {/* Hidden checkbox to toggle the main drawer */}
        <input id="main-drawer-toggle" type="checkbox" className="drawer-toggle" />

        {/* Main Content Area */}
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Nested Drawer for smaller screen sidebar toggle */}
          <div className="drawer">
            {/* Checkbox toggle for nested drawer */}
            <input id="nested-drawer-toggle" type="checkbox" className="drawer-toggle" />

            {/* Navbar and Page Content */}
            <div className="drawer-content flex flex-col">
              {/* Responsive Navbar: Visible only on small screens (lg:hidden) */}
              <nav className="navbar bg-base-300 w-full lg:hidden">
                <div className="flex-none">
                  {/* Button to open nested drawer sidebar */}
                  <label
                    htmlFor="nested-drawer-toggle"
                    aria-label="Open sidebar"
                    className="btn btn-square btn-ghost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="inline-block h-6 w-6 stroke-current"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </label>
                </div>
                {/* Navbar Title or Branding */}
                <div className="mx-2 flex-1 px-2 font-semibold text-lg">
                  Dashboard
                </div>
              </nav>

              {/* Outlet renders child routes */}
              <Outlet />
            </div>

            {/* Nested Drawer Sidebar (small screen) */}
            <div className="drawer-side">
              {/* Overlay to close sidebar when clicking outside */}
              <label
                htmlFor="nested-drawer-toggle"
                aria-label="Close sidebar"
                className="drawer-overlay"
              ></label>

              {/* Sidebar navigation menu */}
              <ul className="menu bg-base-200 min-h-full w-64 p-4 space-y-2">
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 font-medium hover:bg-base-300 rounded-md px-3 py-2"
                  >
                    <FaTachometerAlt className="text-xl" />
                    My Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    to="/my-parcels"
                    className="flex items-center gap-2 font-medium hover:bg-base-300 rounded-md px-3 py-2"
                  >
                    <FaBoxOpen className="text-xl" />
                    My Parcels
                  </Link>
                </li>

                <li>
                  <Link
                    to="/payment-history"
                    className="flex items-center gap-2 font-medium hover:bg-base-300 rounded-md px-3 py-2"
                  >
                    <FaMoneyCheckAlt className="text-xl" />
                    Payment History
                  </Link>
                </li>

              </ul>
            </div>
          </div>
        </div>

        {/* Main Drawer Sidebar (large screen) */}
        <div className="drawer-side">
          {/* Overlay for closing drawer on smaller devices */}
          <label
            htmlFor="main-drawer-toggle"
            aria-label="Close sidebar"
            className="drawer-overlay"
          ></label>

          {/* Sidebar menu */}
          <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-medium hover:bg-base-300 rounded-md px-3 py-2"
              >
                <FaTachometerAlt className="text-xl" />
                My Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/my-parcels"
                className="flex items-center gap-2 font-medium hover:bg-base-300 rounded-md px-3 py-2"
              >
                <FaBoxOpen className="text-xl" />
                My Parcels
              </Link>
            </li>

            <li>
              <Link
                to="/payment-history"
                className="flex items-center gap-2 font-medium hover:bg-base-300 rounded-md px-3 py-2"
              >
                <FaMoneyCheckAlt className="text-xl" />
                Payment History
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayouts;
