import libraryAPI from "../axios/config";

export const getBooks = async () => {
    try {
      const response = await libraryAPI.get("/available");
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export const getAllRents = async () => {
    try {
      const response = await libraryAPI.get("/allRents");
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export const getMyRents = async (userId) => {
    try {
      const response = await libraryAPI.get(`/myRents/${userId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
};

export const newRent = async (id, days, userId) => {
    try {
        const date = new Date();
        date.setDate(date.getDate() + parseInt(days))
        const response = await libraryAPI.post(`/${id}/rent`, {
            'book_id': id,
            'user_id': userId,
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