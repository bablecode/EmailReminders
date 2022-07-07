const express = require('express');
const router = express.Router();
const acts = require('../../services/actionsSrv');

router.get('/', async function(req, res, next) {
  try {
    let rows = await acts.getActions(req.query.id);
    res.status(200).json(rows);
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});
//VALUES(vActionType, vNote, vrecUIDImport, vClientID);
router.post('/', async function(req, res, next) {
  try {
    const b = req.body;
console.log(b.actionType);
    const data = await acts.addAction(b.clientID, b.actionType, b.note, b.contactID );
    res.status(200).json(data);
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

module.exports = router;