export const get = {
  handler(req, res) {
    // Return current datetime
    res.status(200).json({time: new Date()});
  }
};
