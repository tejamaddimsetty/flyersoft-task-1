var express = require('express');
var router = express.Router();

const ctrlDetails = require('../controllers/detail');

router                                                        
  .route('/details')                                        
  .get(ctrlDetails.getDetails)                 
  .post(ctrlDetails.createDetails);

router                                                       
  .route('/details/:myid')          
  .get(ctrlDetails.getSingleDetails)                            
  .put(ctrlDetails.updateDetails)                          
  .delete(ctrlDetails.deleteDetails); 

module.exports = router;  