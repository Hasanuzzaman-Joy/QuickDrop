import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg p-10 text-center max-w-md w-full">
        <div className="text-red-500 text-6xl mb-4 flex justify-center">
          <FaBan />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Oops! You don’t have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded font-medium transition duration-200"
        >
          Back to Home
        </Link>
      </div>
      <p className="text-gray-400 text-sm mt-6">
        QuickDrop © {new Date().getFullYear()} — All rights reserved.
      </p>
    </div>
  );
};

export default Forbidden;
