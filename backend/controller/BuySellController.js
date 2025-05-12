
import BuySell from "../model/BuySellModel.js";
export const createCattleListing = async (req, res) => {
  console.log("In cattlelisting")
  console.log(req.body.userId)
  try {
    const {
      userId,
      type,
      breed,
      age,
      gender,
      price,
      location,
      description,
      contact_name,
      contact_number,
      image,
      additional_images = []
    } = req.body;
    console.log(type)
    // Validate required fields
      
    if (!breed || !age || !gender || !price || !location || !description || !contact_name || !contact_number  ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }
    if(!userId) return res.status(400).json({message: 'Did not receive userID'})

    // Create new listing
    const newListing = new BuySell({
      userId,
      type,
      breed,
      age,
      gender,
      price,
      location,
      description,
      contact_name,
      contact_number,
      image,
      additional_images,
      postedDate: new Date()

    });

    // Save to database
    const savedListing = await newListing.save();

    // Return the saved listing
    res.status(201).json({
      message: 'Cattle listing created successfully',
      data: savedListing
    });
  } catch (error) {
    console.error('Error creating cattle listing:', error);
    res.status(500).json({ 
      message: 'Error creating cattle listing',
      error: error.message 
    });
  }
};

export const getAllCattleListings = async (req, res) => {
  try {
    const listings = await BuySell.find();
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching cattle listings:", error);
    res.status(500).json({ message: "Error fetching cattle listings", error: error.message });
  }
};

export const mycattleListings = async(req,res) =>{
  try {
    const { userId } = req.query; // since passing value through query

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const listings = await BuySell.find({ userId }); // <-- finds all matching entries

    res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching cattle listings by userId:", error);
    res.status(500).json({ message: "Error fetching cattle listings", error: error.message });
  }
}

const deleteBuySellById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await BuySell.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Server error while deleting listing" });
  }
};

export const updateCattleListing = async (req, res) => {
  console.log("In updating cattle listing")
  try {
    console.log("in try")
    const id  = req.params.id; // Listing ID passed in URL
    console.log(id)
    const {
      type,
      breed,
      age,
      gender,
      price,
      location,
      description,
      contact_name,
      contact_number,
      image,
      additional_images
    } = req.body;
    console.log(req.body)
    if (!id) {
      return res.status(400).json({ message: "Listing ID is required" });
    }

    // Find listing by ID and update
    const updatedListing = await BuySell.findByIdAndUpdate(
      id,
      {
        type,
        breed,
        age,
        gender,
        price,
        location,
        description,
        contact_name,
        contact_number,
        image,
        additional_images,
        date: new Date() // optional: update timestamp
      },
      { new: true } // Return the updated document
    );

    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    console.log("in catch")
    console.error("Error updating cattle listing:", error);
    res.status(500).json({ message: "Error updating listing", error: error.message });
  }
};

export default {createCattleListing,getAllCattleListings,mycattleListings,deleteBuySellById,updateCattleListing}