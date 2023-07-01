const createPartner = async (req,res) => {
  const partnerData = req.body;
  // const newPartner = new Partner(partnerData)
  // newPartner.save((err, savedPartner))
  console.log(partnerData);
  res.json({ message: "Data received successfully" });
}

module.exports ={
  createPartner
}