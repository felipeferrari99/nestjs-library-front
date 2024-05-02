import axios from "axios";
import libraryAPI from "../axios/config";

export const getAuthors = async (search) => {
  const query = `
      {
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
      {
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
    const query = `
      mutation newAuthor($name: String!, $description: String) {
        createAuthor(data: {
          name: $name
          description: $description
        }) {
          id
        }
      }
    `;

    const variables = {
      name, 
      description, 
    };

    const response = await libraryAPI.post('', { query, variables });
    return response.data.data.createAuthor;
  } catch (error) {
    throw error;
  }
}

export const updateAuthor = async (id, name, description) => {
  try {
    const query = `
      mutation UpdateAuthor($id: Float!, $input: UpdateAuthorInput!) {
        updatePartialAuthor(id: $id, data: $input) {
          id
        }
      }
    `;

    const variables = {
      id: parseFloat(id),
      input: {
        name,
        description
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
    formData.append('id', id)
    formData.append('file', image);
    formData.append('origin', 'author')

    const response = await axios.post('http://localhost:3000/image', formData, {
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
    const query = `
        mutation {
          deleteAuthor(id:${id})
        }
      `;
      try {
        const response = await libraryAPI.post('', { query });
          return response.data;
      } catch (error) {
        throw error;
      }
  }