import libraryAPI from "../axios/config";

export const newComment = async (id, body, starRating, userId) => {
    try {
      const query = `
        mutation ($bookId: Float!, $userId: Float!, $body: String!, $rating: Float!) {
          createComment(data: {
            book_id: $bookId
            user_id: $userId
            body: $body
            rating: $rating
          }) {
            id
          }
        }
      `;
  
      const variables = {
        bookId: parseFloat(id),
        userId: parseFloat(userId),
        body,
        rating: parseFloat(starRating)
      };
  
      const response = await libraryAPI.post('', { query, variables });
      return response.data
    } catch (error) {
      throw error;
    }
};  

export const deleteComment = async (id, commentId) => {
    try {
        const query = `
          mutation DeleteComment($id: Float!, $commentId: Float!) {
            deleteComment(id: $id, commentId: $commentId) {
              id
            }
          }
        `;

        const variables = {
          id: parseFloat(id),
          commentId: parseFloat(commentId),
        };

        const response = await libraryAPI.post('', { query, variables });
        return response.data;
    } catch (error) {
        throw error;
    }
}