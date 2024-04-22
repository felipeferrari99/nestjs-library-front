import libraryAPI from "../axios/config";
const url = import.meta.env.VITE_AXIOS_URL;

export const loginRequest = async (username, password) => {
  try {
    const response = await libraryAPI.post('/login', {
      'username': username,
      'password': password,
    })
    return response.data
  } catch (error) {
    throw error;
  }
}

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
  try {
    const response = await libraryAPI.get(`/user/${id}`);
    return response.data
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