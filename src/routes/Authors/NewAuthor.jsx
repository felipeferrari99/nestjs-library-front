import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FloatingLabel } from 'flowbite-react';
import Button from '../../components/Button';
import { toast } from 'react-toastify';
import { newAuthor } from '../../requests/authors';

const NewAuthor = () => {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem('token');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          if (decodedToken.type != 'admin') {
            navigate('/authors');
          }
        } else {
          navigate('/authors');
        }
    };
    getToken();
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await newAuthor(name, description)
      toast.success('Author created successfully!');
      navigate('/authors');
    } catch (error) {
      toast.error(`Error during author creation: ${error.response.data.message}`);
    }
  };  

  return (
    <div className="p-10 max-w-md mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-6">New Author</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <FloatingLabel variant="filled" label="Author Name" name="name" type="text" id="name" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="mb-5">
          <FloatingLabel variant="filled" label="Description" name="description" type="text" id="description" onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <Button children="Create Author" />
      </form>
    </div>
  )
};

export default NewAuthor;