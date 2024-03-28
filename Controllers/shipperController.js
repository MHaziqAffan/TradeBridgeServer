const User = require("../Models/User");
const ShipperRequest = require("../Models/shipperRequest");

const book = async (req, res) => {
  const { shipperId, invoice, details, traderId } = req.body;
  try {
    const newShipperRequest = new ShipperRequest({
      shipperId: shipperId,
      traderId: traderId,
      invoice: invoice,
      details: details,
      status: "p", 
    });
    await newShipperRequest.save();

    res.status(200).json({ message: "Shipper request created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const fetchRequests = async (req, res) => {
  try {
    const { id ,find,status} = req.query;
    let requests
    if(find==='s')
    {
        requests = await ShipperRequest.find({ shipperId: id,status:status })
        .populate("traderId")
        .populate("shipperId");
    }
    else if(find==='t')
    {
        requests = await ShipperRequest.find({ traderId: id })
        .populate("traderId")
        .populate("shipperId");
    }
    res.status(200).json({ requests: requests });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

  const accept = async (req, res) => {
    const { id } = req.params;
  
    try {
      const shipperRequest = await ShipperRequest.findById(id);
      if (!shipperRequest) {
        return res.status(404).json({ message: "Shipment request not found" });
      }
      shipperRequest.status = req.body.status;;
      await shipperRequest.save();
      res.status(200).json({ message: "Shipment request accepted successfully" });
    } catch (error) {
      console.error("Error accepting shipment request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  
  
module.exports = { book, fetchRequests,accept };
