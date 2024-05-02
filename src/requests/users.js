import axios from "axios";
import libraryAPI from "../axios/config";

export const loginRequest = async (username, password) => {
  try {
    const query = `
      mutation login($username: String!, $password: String!) {
        login(data: {
          username: $username
          password: $password
        }) {
          token
        }
      }
    `;

    const variables = {
      username,
      password,
    };

    const response = await libraryAPI.post('', { query, variables });
    return response.data.data.login;
  } catch (error) {
    throw error;
  }
};

export const registerRequest = async (username, email, password) => {
  try {
    const query = `
      mutation register($username: String!, $email: String!, $password: String!) {
        createUser(data: {
          username: $username
          email: $email
          password: $password
        }) {
          token
        }
      }
    `;

    const variables = {
      username,
      email,
      password,
    };

    const response = await libraryAPI.post('', { query, variables });
    return response.data.data.createUser;
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  const query = `
      {
          showUser(id: ${id}) {
              id
              email
              username
              image
              description
              favorite_book
              book {
                id
                title
                image
              }
          }
      }
  `;
  try {
      const response = await libraryAPI.post('', { query });
      return response.data.data.showUser
  } catch (error) {
      throw error;
  }
}

export const updateUser = async (id, email, password, description) => {
  try {
    const query = `
      mutation UpdateUser($id: Float!, $input: UpdateUserInput!) {
        updatePartialUser(id: $id, data: $input) {
          id
        }
      }
    `;

    const variables = {
      id: parseFloat(id),
      input: {
        email,
        password,
        description,
      },
    };

    await libraryAPI.post('', { query, variables });
  } catch (error) {
    throw error;
  }
};

export const changeImage = async (id, image) => {
  try {
    const formData = new FormData();
    formData.append('id', id)
    formData.append('file', image);
    formData.append('origin', 'user')

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

export const alterFavorite = async (id, userId) => {
  try {
    const idFloat = parseFloat(id);
    const userIdFloat = parseFloat(userId);

    const query = `
      mutation UpdateFavorite($id: Float!, $userId: Float!) {
        updateFavorite(id: $id, user_id: $userId) {
          id
        }
      }
    `;

    const variables = {
      id: idFloat,
      userId: userIdFloat,
    };

    const response = await libraryAPI.post('', { query, variables });
    return response.data;
  } catch (error) {
    throw error;
  }
};