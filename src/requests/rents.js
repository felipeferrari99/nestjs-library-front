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
      const query = `
      mutation NewRent($book_id: Float!, $user_id: Float!, $date_rented: String!, $date_for_return: String!) {
        createRent(data: {
            book_id: $book_id
            user_id: $user_id
            date_rented: $date_rented
            date_for_return: $date_for_return
        }) {
          id
        }
      }
    `;
    const variables = {
        book_id: parseFloat(id),
        user_id: parseFloat(userId),
        date_rented: (new Date()).toISOString().split('T')[0],
        date_for_return: date.toISOString().split('T')[0]
    };
    return await libraryAPI.post('', { query, variables });
  } catch (error) {
    console.log(error)
      throw error;
  }
}

export const returnBook = async (id) => {
  try {
      const query = `
        mutation ReturnBook($id: Float!) {
          returnBook(id: $id) {
            id
          }
        }
      `;

      const variables = {
        id: parseInt(id),
      };

      const response = await libraryAPI.post('', { query, variables });
      console.log('Return Book Response:', response.data);
      return response.data.data.returnBook;
  } catch (error) {
      console.log('Return Book Error:', error);
      throw error;
  }
};