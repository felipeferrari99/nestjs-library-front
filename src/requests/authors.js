import libraryAPI from "../axios/config";

export const getAuthors = async (search) => {
  const query = `
      query {
          listAuthors(search: "${search}") {
              id
              name
              image
          }
      }
  `;
  try {
      const response = await libraryAPI.post('', { query });
      return response.data.data.listAuthors
  } catch (error) {
      throw error;
  }
}

export const getAuthor = async (id) => {
  const query = `
      query {
          showAuthor(id: ${id}) {
              id
              name
              image
              description
              books {
                  id
                  title
                  image
              }
          }
      }
  `;
  try {
      const response = await libraryAPI.post('', { query });
      return response.data.data.showAuthor
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