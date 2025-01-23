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
