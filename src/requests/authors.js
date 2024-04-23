import libraryAPI from "../axios/config";

export const getAuthors = async (search) => {
    try {
      const response = await libraryAPI.get("/authors", { params: { search } });
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const getAuthor = async (id) => {
    try {
      const response = await libraryAPI.get(`/authors/${id}`)
      return response.data
    } catch (error) {
      throw error;
    }
}

export const newAuthor = async (name, description) => {
    try {
        const response = await libraryAPI.post(`/authors`, 
        {
          name, 
          description
        }
        );
        return response.data
    } catch (error) {
      throw error;
    }
}

export const updateAuthor = async (id, name, description) => {
    try {
        await libraryAPI.patch(`/authors/${id}`, {
            'name': name,
            'description': description,
        });
    } catch (error) {
      throw error;
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
      throw error;
    }
}