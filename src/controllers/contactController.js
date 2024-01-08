// @desc Get all contacts
// @route GET /api/contacts
// @acces public
const getContacts = (req, res) => {
  res.status(200).json({ message: "Get all contacts" });
};

// @desc Create contact
// @route POST /api/contacts
// @acces public
const createContact = (req, res) => {
  console.log(req.body);

  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("Semua bidang harus diisi !!");
  }

  res.status(201).json({ message: "create a contact" });
};

// @desc Get by id contacts
// @route GET /api/contacts/:id
// @acces public
const getContact = (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
};

// @desc Update contact
// @route PUT /api/contacts/:id
// @acces public
const updateContact = (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
};

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @acces public
const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
