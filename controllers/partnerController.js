const createPartner = async (req,res) => {
  const partnerData = req.body;
  console.log(partnerData);
  res.json({ message: "Data received successfully" });
}

module.exports ={
  createPartner
}