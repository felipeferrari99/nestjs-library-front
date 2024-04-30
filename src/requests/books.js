import libraryAPI from "../axios/config";

export const getBooks = async (search) => {
  const query = `
      query {
          listBooks(search: "${search}") {
              id
              title
              image
              author_id
              author {
                  name
              }
          }
      }
  `;
  try {
      const response = await libraryAPI.post('', { query });
      return response.data.data.listBooks
  } catch (error) {
      throw error;
  }
}

export const getBook = async (id) => {
  const query = `
      query {
          showBook(id: ${id}) {
              id
              title
              image
              description
              author_id
              qty_available
              release_date
              author {
                  name
              }
              comments{
                id
                body
                rating
                user_id
                user {
                  id
                  username
                }
              }
          }
      }
  `;
  try {
      const response = await libraryAPI.post('', { query });
      return response.data.data.showBook
  } catch (error) {
      throw error;
  }
}

export const newBook = async (title, author, description, release_date, qty_available) => { 
  try {
        const response = await libraryAPI.post(`/books`, {
          'title': title,
          'authorName': author,
          'description': description,
          'release_date': release_date,
          'qty_available': Number(qty_available)
        });
        return response.data
    } catch (error) {
      console.log(error)
        throw error;
    }
}

export const updateBook = async (id, title, author, description, release_date, qty_available) => {
    try {
        await libraryAPI.patch(`/books/${id}`, {
            'title': title,
            'authorName': author,
            'description': description,
            'release_date': release_date,
            'qty_available': Number(qty_available)
        });
    } catch (error) {
        throw error;
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
      throw error;
    }
}