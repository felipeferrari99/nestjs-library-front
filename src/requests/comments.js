import libraryAPI from "../axios/config";

export const newComment = async (id, body, starRating, userId) => {
    try {
        const response = await libraryAPI.post(`/books/${id}/comments`, {
            'book_id': id,
            'user_id': userId,
            'body': body,
            'rating': starRating,
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