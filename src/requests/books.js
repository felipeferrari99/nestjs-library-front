import libraryAPI from "../axios/config";

export const getBooks = async (search) => {
    try {
      const response = await libraryAPI.get("/books", { params: { search } });
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export const getBook = async (id) => {
    try {
      const response = await libraryAPI.get(`/books/${id}`)
      return response.data
    } catch (error) {
        console.log(error);
    }
}

export const newBook = async (title, author, image, description, release_date, qty_available) => {
    try {
        const formData = new FormData();
        formData.append('title', title)
        formData.append('author', author)
        formData.append('file', image);
        formData.append('description', description)
        formData.append('release_date', release_date)
        formData.append('qty_available', qty_available)
        const response = await libraryAPI.post(`/books`, formData, { 
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export const updateBook = async (id, title, author, description, release_date, qty_available) => {
    try {
        await libraryAPI.put(`/books/${id}`, {
            'title': title,
            'author': author,
            'description': description,
            'release_date': release_date,
            'qty_available': qty_available,
        });
    } catch (error) {
        console.log(error);
    }
}

export const changeImage = async (id, image) => {
    try {
      const formData = new FormData();
      formData.append('file', image);
  
      const response = await libraryAPI.post(`/books/${id}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const deleteBook = async (id) => {
    try {
        const response = libraryAPI.delete(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}