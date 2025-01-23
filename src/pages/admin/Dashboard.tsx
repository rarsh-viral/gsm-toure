
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Products Card */}
            <Link
              to="/admin/products"
              className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Products</h3>
              <p className="mt-2 text-sm text-gray-500">
                Manage your product catalog, add new items, update prices and stock.
              </p>
            </Link>

            {/* Categories Card */}
            <Link
              to="/admin/categories"
              className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              <p className="mt-2 text-sm text-gray-500">
                Organize your products into categories and subcategories.
              </p>
            </Link>

            {/* Orders Card 
            <Link
              to="/admin/orders"
              className="block p-6 bg-white border rounded-lg shadow hover:bg-gray-50"
            >
              <h3 className="text-lg font-medium text-gray-900">Orders</h3>
              <p className="mt-2 text-sm text-gray-500">
                View and manage customer orders, track shipments.
              </p>
            </Link>
            */}
        
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

