import axios from 'axios';

export const createCattleListing = async (listingData) => {
  console.log("in listing")
  console.log(listingData.userId)
  try {
    // Remove the extra quotes around the URL
    const response = await axios.put("http://localhost:4000/buysell/putBuySell", listingData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error creating cattle listing:', error);
    throw error;
  }
};