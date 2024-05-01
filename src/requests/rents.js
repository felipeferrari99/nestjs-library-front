import libraryAPI from "../axios/config";

export const getBooks = async () => {
  const query = `
      {
          listAvailable {
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
      return response.data.data.listAvailable
  } catch (error) {
      throw error;
  }
}

export const getAllRents = async () => {
  const query = `
  {
      listAllRents {
        id
        date_rented
        date_for_return
        date_returned
        status
        user {
          username
        }
        book {
          title
        }
      }
  }
`;
try {
  const response = await libraryAPI.post('', { query });
  return response.data.data.listAllRents
} catch (error) {
  throw error;
}
}

export const getMyRents = async (userId) => {
  const query = `
      {
          listMyRents(userId: ${userId}) {
            id
            date_rented
            date_for_return
            date_returned
            status
            book {
              title
            }
          }
      }
  `;
  try {
      const response = await libraryAPI.post('', { query });
      return response.data.data.listMyRents
  } catch (error) {
      throw error;
  }
}

export const newRent = async (id, days, userId) => {
    try {
        const date = new Date();
        date.setDate(date.getDate() + parseInt(days))
        const response = await libraryAPI.post(`/${id}/rent`, {
            'book_id': Number(id),
            'user_id': Number(userId),
            'date_rented': (new Date()).toISOString().split('T')[0],
            'date_for_return': date.toISOString().split('T')[0]
        });
        return response.data
    } catch (error) {
        throw error;
    }
}

export const returnBook = async (id) => {
    try {
        const response = libraryAPI.post(`/return/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}