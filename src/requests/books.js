import libraryAPI from "../axios/config";

export const getBooks = async (search) => {
  const query = `
      {
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
      {
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
    const query = `
      mutation newBook($title: String!, $authorName: String!, $description: String, $qty_available: Float!, $release_date: String!) {
        createBook(data: {
          title: $title
          authorName: $authorName
          description: $description
          qty_available: $qty_available
          release_date: $release_date
        }) {
          id
        }
      }
    `;

    const variables = {
      title, 
      authorName: author,
      description, 
      release_date, 
      qty_available: parseFloat(qty_available)
    };

    const response = await libraryAPI.post('', { query, variables });
    return response.data.data.createBook;
  } catch (error) {
    throw error;
  }
}

export const updateBook = async (id, title, author, description, release_date, qty_available) => {
  try {
    const query = `
      mutation UpdateBook($id: Float!, $input: UpdateBookInput!) {
        updatePartialBook(id: $id, data: $input) {
          id
        }
      }
    `;

    const variables = {
      id: parseFloat(id),
      input: {
        title,
        authorName: author,
        description,
        release_date,
        qty_available: parseFloat(qty_available)
      },
    };

    await libraryAPI.post('', { query, variables });
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
  const query = `
      mutation {
        deleteBook(id:${id})
      }
    `;
    try {
      const response = await libraryAPI.post('', { query });
        return response.data;
    } catch (error) {
      throw error;
    }
}