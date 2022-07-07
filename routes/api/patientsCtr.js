const express = require('express');
const router = express.Router();
const pats = require('../../services/patientsSrv');

// router.get('/',pats.getPatients);


router.get('/', async function(req, res, next) {
  try {
    let rows = await pats.getPatients(req.query.id);
    res.status(200).json(rows);
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


router.put('/:id', async function(req, res, next) {
  try {
    let rows = await pats.Patient_ToggleINC(req.params.id);
    res.status(200).json(rows);
    // res.status(200).json({id: req.params.id});
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});


module.exports = router;
