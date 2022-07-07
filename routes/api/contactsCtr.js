const express = require('express');
const router = express.Router();
const contacts = require('../../services/contactsSrv');

/* GET contact */ 
router.get('/:filter', async function(req, res, next) {
  let filter = req.params.filter;
  try {
    let rows = await contacts.getContacts(filter);
    res.status(200).json(rows);
  } catch (err) {
    console.error(`Error while getting data:getContacts: `, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    let rows = await contacts.Contact_ToggleINC(req.params.id);
    res.status(200).json(rows);
    // res.status(200).json({id: req.params.id});
  } catch (err) {
    console.error(`Error while getting data:Contact_ToggleINC: `, err.message);
    next(err);
  }
});


// router.get('/:id', async function(req, res, next) {
//   try {
//     let data = await contacts.getContact(req.params.id);
//     data = data.data;
//     if (typeof data[0] === 'undefined') {
//       data[0]='$$ERROR$$';
//       data.push(`Record ID ${req.params.id} not found`);
//     }
//     console.log('ctr:', data[0]);
//     res.status(200).json(data);
//   } catch (err) {
//     console.error(`Error while getting data `, err.message);
//     next(err);
//   }
// });

module.exports = router;