import Logo from "../models/logo.js";

export const updateLogo = async (req, res) => {
    try {
      const { imageUrl } = req.body; // Destructuring imageUrl from req.body
      const updatedLogo = await Logo.findOneAndUpdate({}, {imageUrl} , { new: true });
      res.json(updatedLogo); // Send the updated logo as JSON response
    } catch (error) {
      console.error('Error updating logo:', error);
      res.status(500).json({ message: 'Failed to update logo' }); // Send a 500 status code with error message
    }
  };

export const getLogo = async (req, res) => {
    try {
      const logo = await Logo.findOne();
      if (!logo) {
        return res.status(404).json({ message: 'Logo not found' });
      }
      res.json(logo);
    } catch (error) {
      console.error('Error getting logo:', error);
      res.status(500).json({ message: 'Failed to get logo' });
    }
  };