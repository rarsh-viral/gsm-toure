import toast from "react-hot-toast";

const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();
        setNewProduct(prevState => ({
          ...prevState,
          images: [...(prevState.images as string[]), result.url]
        }));
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Failed to upload image');
      }
    }
  };

function setNewProduct(arg0: (prevState: any) => any) {
    throw new Error("Function not implemented.");
}
  