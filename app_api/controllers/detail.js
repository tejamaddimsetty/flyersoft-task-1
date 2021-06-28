const mongoose = require("mongoose");
const Details = mongoose.model('Details');

const getDetails = function(req,res)
{
  Details.find().exec(function(err,mydetails)
  {
      if(err)
      {
          res
           .status(404)
           .json(err);
      return;     
      } 
    res
     .status(200)
     .json(mydetails); //while using GET on url localhost:3000/api/details 
  }); 
};

const createDetails = function(req,res)
{
  Details.create({
      name: req.body.name,
      gender: req.body.gender
  }, (err, mydetails) => {
      if(err)
      {
          res 
           .status(400) // when no name and gender are given validation error is thrown
           .json(err);
      }
      else{
          res
           .status(201)
           .json(mydetails); //while using POST on url localhost:3000/api/details with new name and gender
      }
  });
};

const getSingleDetails = (req, res) => {
  Details
      .findById(req.params.myid)
      .exec((err, mydetails) => {
        if (!mydetails) {                           
          return res                               
            .status(404)                           
            .json({                                
              "message": "Details not found"   //while using GET on localhost:3000/api/details/123 where myid 123 not found   
            });                                    
        } else if (err) {                          
          return res                               
            .status(404)                           
            .json(err);                            
        }
        res                                        
          .status(200)                             
          .json(mydetails);     //while using GET on localhost:3000/api/details/somevalue                    
       });
};


const updateDetails = function(req,res)
{
    if(!req.params.myid)
    {
        res
         .status(404)
         .json({"message":"Not found, myid is required"});
    return;     
    }
    Details.findById(req.params.myid)
        .exec((err,mydetails) => {
            if(!mydetails)
            {
                res
                 .status(404)
                 .json({"message":"foodid not found"}); //// while using PUT on localhost:3000/api/foods/123
            return;     
            } else if(err)
            {
                res
                 .status(400)
                 .json(err);
                return; 
            }
          mydetails.name = req.body.name;
          mydetails.gender = req.body.gender;
          mydetails.save((err,mydetails) => {
              if(err)
              {
                  res
                   .status(404)
                   .json(err);
              }
              else{
                  res
                   .status(200)
                   .json(mydetails);
              }
          });  
        }
    ); 

};

const deleteDetails = function(req,res)
{
    const myid = req.params.myid;
    if(myid)
    {
      Details
         .findByIdAndRemove(myid)
         .exec((err,mydetails) => {
        
        if(err)
        {
            res
             .status(404)
             .json(err);
        return;     
        }
        res
        .status(204)
        .json(null);
   }); 
    } else{
        res
         .status(404)
         .json({"message":"No myid"});
    }
    };




module.exports = {
    getDetails,
    createDetails,
    getSingleDetails,
    updateDetails,
    deleteDetails
};