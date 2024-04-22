import libraryAPI from "../axios/config";

export const getAuthors = async (search) => {
    try {
      const response = await libraryAPI.get("/authors", { params: { search } });
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export const getAuthor = async (id) => {
    try {
      const response = await libraryAPI.get(`/authors/${id}`)
      return response.data
    } catch (error) {
        console.log(error);
    }
}

export const newAuthor = async (name, image, description) => {
    try {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('file', image)
        formData.append('description', description)
        const response = await libraryAPI.post(`/authors`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const updateAuthor = async (id, name, description) => {
    try {
        await libraryAPI.put(`/authors/${id}`, {
            'name': name,
            'description': description,
        });
    } catch (error) {
        console.log(error);
    }
}

export const changeImage = async (id, image) => {
    try {
      const formData = new FormData();
      formData.append('file', image);
  
      const response = await libraryAPI.post(`/authors/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const deleteAuthor = async (id) => {
    try {
        const response = libraryAPI.delete(`/authors/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}