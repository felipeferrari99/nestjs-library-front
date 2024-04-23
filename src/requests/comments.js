import libraryAPI from "../axios/config";

export const newComment = async (id, body, starRating, userId) => {
    try {
        const response = await libraryAPI.post(`/books/${id}/comments`, {
            'book_id': Number(id),
            'user_id': Number(userId),
            'body': body,
            'rating': Number(starRating),
        });
        return response.data
    } catch (error) {
        throw error;
    }
}

export const deleteComment = async (id, commentId) => {
    try {
        const response = await libraryAPI.delete(`/books/${id}/comments/${commentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}