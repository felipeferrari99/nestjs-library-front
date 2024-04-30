import libraryAPI from "../axios/config";

export const loginRequest = async (username, password) => {
  try {
    const query = `
      mutation Login($username: String!, $password: String!) {
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
    const response = await libraryAPI.post('/register', {
      'username': username,
      'email': email,
      'password': password,
    })
    return response.data
  } catch (error) {
    throw error;
  }
}

export const getUser = async (id) => {
  const query = `
      query {
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
      console.log(response)
      return response.data.data.showUser
  } catch (error) {
      throw error;
  }
}

export const updateUser = async (id, email, password, description) => {
  try {
    await libraryAPI.patch(`/user/${id}`, {
      'email': email,
      'password': password,
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

    const response = await libraryAPI.post(`/user/${id}/image`, formData, {
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
    await libraryAPI.patch(`/books/${id}/favorite`, {
      'user_id': userId
    });
  } catch (error) {
    throw error;
  }
}