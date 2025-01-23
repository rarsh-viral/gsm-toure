

i want to create components to display products that the admin add due to there categories which are repair accessaries and phones and there will be a component that will display all the products, the component will be named shop 


import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, ComputerDesktopIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1550439062-609e1531270e"
            alt="Tech background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            GSM Toure Tech Company
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Your one-stop destination for premium mobile phones, accessories, and professional repair services.
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Services
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your mobile devices
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Mobile Phones */}
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                    alt="Mobile Phones"
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div className="flex items-end p-4">
                    <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <PhoneIcon className="h-6 w-6 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          Latest Phones
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Browse our collection of premium smartphones
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessories */}
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1491933382434-500287f9b54b"
                    alt="Accessories"
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div className="flex items-end p-4">
                    <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <ComputerDesktopIcon className="h-6 w-6 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          Accessories
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Find the perfect accessories for your devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repair Services */}
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
                    alt="Repair Services"
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div className="flex items-end p-4">
                    <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <WrenchScrewdriverIcon className="h-6 w-6 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          Repair Services
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Professional repair services for all devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;




import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { ChangeEventHandler } from 'react';
const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    images: [] as string[],
  });

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)'); // Adjust this query based on your schema
  
      if (error) {
        throw error;
      }
  
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      toast.error(`Error loading products: ${(error as Error).message}`);
    }
  };
  
{/*
  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*');
    
    if (error) {
      toast.error('Error loading products');
      return;
    }
    
    setProducts(data);
  };*/}

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Form validation
    if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
      toast.error('Please fill in all required fields');
      return;
    }
  
    try {
      const { error } = await supabase.from('products').insert([
        {
          name: newProduct.name,
          description: newProduct.description,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10),
          category_id: newProduct.category_id,
          images: newProduct.images,
        },
      ]);
  
      if (error) {
        throw error;
      }
  
      toast.success('Product added successfully');
      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        images: [],
      });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(`Error: ${(error as Error).message}`);
    }
  };
  
{/*
  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('products')
      .insert([{
        name: newProduct.name, 
        description: newProduct.description, 
        price: parseFloat(newProduct.price), 
        stock: parseInt(newProduct.stock), 
        category_id: newProduct.category_id, 
        images: newProduct.images
      }]);

    if (error) {
      toast.error('Error adding product');
      return;
    }

    toast.success('Product added successfully');
    setIsAddingProduct(false);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      images: []
    });
    fetchProducts();
  };*/}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
{/*
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload.js', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setNewProduct(prevState => ({
          ...prevState,
          images: [...prevState.images, result.url]
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    }
  };*/}
  


const handleImageUpload = async (file: File) => {
  try {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Unsupported file type. Please upload a JPEG, PNG, or GIF image.');
    }

    // Attempt to upload the file
    const filePath = `products/${file.name}`;
    const { data, error } = await supabase.storage
      .from('products-images')
      .upload(filePath, file);

    if (error) {
      throw new Error(`Supabase Storage Error: ${error.message}`);
    }

    console.log('Image uploaded successfully:', data);
    return data;
  } catch (error: any) {
    console.error('Error uploading image:', error.message || error);
    return null;
  }
};

const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
  const file = event.target.files?.[0]; // Get the first selected file
  if (file) {
    const uploadResult = await handleImageUpload(file);
    if (uploadResult) {
      console.log('Upload completed:', uploadResult);
    }
  } else {
    console.error('No file selected');
  }
};

  
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-sm rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage your product catalog, prices, and inventory
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                onClick={() => setIsAddingProduct(true)}
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                Add Product
              </button>
            </div>
          </div>

          {/* Product Form */}
          {!newProduct.name && <p className="text-red-600 text-sm">Name is required</p>}

          {isAddingProduct && (
            <form onSubmit={handleAddProduct} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-md overflow-hidden">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="form-control block w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-md cursor-text focus:border-blue-600 focus:ring-blue-200 focus:ring-0 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="form-control block w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-md cursor-text focus:border-blue-600 focus:ring-blue-200 focus:ring-0 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <div className="mt-1 relative rounded-md overflow-hidden">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="form-control block w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-md cursor-text focus:border-blue-600 focus:ring-blue-200 focus:ring-0 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <div className="mt-1 relative rounded-md overflow-hidden">
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="form-control block w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-md cursor-text focus:border-blue-600 focus:ring-blue-200 focus:ring-0 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                  Category ID
                </label>
                <div className="mt-1 relative rounded-md overflow-hidden">
                  <input
                    id="category_id"
                    name="category_id"
                    type="text"
                    value={newProduct.category_id}
                    onChange={handleInputChange}
                    className="form-control block w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-md cursor-text focus:border-blue-600 focus:ring-blue-200 focus:ring-0 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <div className="mt-1 flex justify-between gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="form-control block w-full px-3 py-2 placeholder-gray-400 text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer focus:border-blue-600 focus:ring-blue-200 focus:ring-0 sm:text-sm"
                  />
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {newProduct.images.map((url, index) => (
                      <li key={index} className="flex items-center">
                        <img src={url} alt={`Image ${index + 1}`} className="w-10 h-10 object-cover rounded-md" />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setIsAddingProduct(false)} 
                  className="rounded-md bg-red-50 p-2 text-red-700 hover:bg-red-100 focus-visible:outline-none"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-700 focus-visible:outline-none"
                >
                  Add Product
                </button>
              </div>
            </form>
          )}
       {/* Product List */}
          <div className="mt-8 flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.categories?.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          ${product.price}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {product.stock}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => {
                              /* Handle edit */
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;








Certainly! Let's break down the steps to create the components for displaying products based on their categories in your Next.js application. We'll create components for individual categories (e.g., "repair accessories" and "phones") and a component to display all products (the "Shop" component).

1. **Create Components**:
   - First, create the necessary components. You can organize them in a folder structure like this:
     ```
     components/
     ├── ProductCard.tsx
     ├── RepairAccessoriesProducts.tsx
     ├── PhonesProducts.tsx
     ├── AllProducts.tsx
     └── Shop.tsx
     ```
   - Here's what each component will do:
     - `ProductCard.tsx`: A reusable component to display individual product details (e.g., name, price, image).
     - `RepairAccessoriesProducts.tsx`: Displays products in the "repair accessories" category.
     - `PhonesProducts.tsx`: Displays products in the "phones" category.
     - `AllProducts.tsx`: Displays all products (regardless of category).
     - `Shop.tsx`: The main component that combines the above components and handles routing.

2. **Fetching Data**:
   - Decide how you'll fetch product data. You can use Next.js's built-in data fetching methods (like `getStaticProps` or `getServerSideProps`) or an external API.
   - For simplicity, let's assume you have an array of products with properties like `name`, `price`, and `category`.

3. **ProductCard Component**:
   - Create a `ProductCard` component that receives a product object as a prop and displays its details (e.g., name, price, image).
   - You can style it using CSS or a styling library like Tailwind CSS.

4. **Category Components (Repair Accessories and Phones)**:
   - In `RepairAccessoriesProducts.tsx` and `PhonesProducts.tsx`, filter the products based on their category.
   - Map through the filtered products and render a `ProductCard` for each one.

5. **AllProducts Component**:
   - In `AllProducts.tsx`, simply map through all products and render a `ProductCard` for each.
   - This component will display all products, regardless of their category.

6. **Shop Component**:
   - In `Shop.tsx`, decide how you'll handle routing. You might have different routes like `/shop`, `/shop/repair-accessories`, and `/shop/phones`.
   - Depending on the route, render the appropriate category component (`RepairAccessoriesProducts`, `PhonesProducts`, or `AllProducts`).

7. **Styling and Layout**:
   - Style your components using CSS or a styling library.
   - Consider using a grid layout or flexbox to arrange the product cards nicely.

8. **Testing and Refining**:
   - Test your components by rendering them in your pages or other components.
   - Make sure the data is correctly passed down to the `ProductCard`.

Remember that this is a high-level overview, and you'll need to fill in the details based on your specific project structure and data. Feel free to ask if you need further guidance on any specific step! Happy coding! 🌟





My apologies for the misunderstanding! Thank you for clarifying. 
Let's create separate components—one for "repair" and another for "accessories." Here's how we can structure them:
use the given information to create the components
1. **Repair Component (`RepairProducts.tsx`)**:
   - This component will display products in the "repair" category.
   - Fetch the relevant repair products (repair data).
   - Map through the products and render a `ProductCard` component for each.

2. **Accessories Component (`AccessoriesProducts.tsx`)**:
   - Similar to the repair component, this one will display products in the "accessories" category.
   - Fetch the accessories products (accessories data).
   - Map through the products and render a `ProductCard` component for each.

3. **Shop Component (`Shop.tsx`)**:
   - This component will display all products, regardless of their category.
   - Fetch all products (once again, products data).
   - Map through all products and render a `ProductCard` component for each.

4. **ProductCard Component (`ProductCard.tsx`)**:
   - Create a reusable `ProductCard` component that receives a product object as a prop.
   - Inside this component, display details such as the product name, price, and image.
   - You can style it using CSS or a styling library.


5. **Styling and Layout**:
   - Style your components using CSS or a styling library (e.g., Tailwind CSS).
   - Consider using a grid layout or flexbox to arrange the product cards nicely.

6. **app Component (`App.tsx`)**:
   - In your main `App` component, decide how you'll handle routing.
   - You might have different routes like `/shop`, `/shop/repair`, and `/shop/accessories`.
   - Depending on the route, render the appropriate category component (`RepairProducts`, `AccessoriesProducts`, or `AllProducts`).


Remember to replace the dummy data with actual product data once you integrate your backend or API. If you have any specific questions or need further guidance, feel free to ask—I'm here to help! 😊