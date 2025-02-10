import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex my-10">
      {/* Sidebar */}
      <div className="bg-gray-800 w-64 text-white p-5 py-10">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className="mb-4">
          <Link to="/dashboard/addmara" className="block px-4 py-2 hover:bg-gray-700">
              Add Marathon
            </Link>
          </li>
          <li className="mb-4">
          <Link to="/dashboard/my-list" className="block px-4 py-2 hover:bg-gray-700">
          My Marathon List </Link>       
          </li>
          <li className="mb-4">
          <Link to="/dashboard/apply-list" className="block px-4 py-2 hover:bg-gray-700">
            My Apply List         
            </Link>   
          </li>
          <li className="mb-4">
            <Link to="/dashboard/logout" className="hover:text-gray-700"><button className="btn">Logout</button></Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          
        </header>

        {/* Main content area */}
        <div className="space-y-6">
            <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
