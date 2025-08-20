const { isValidObjectId } = require("mongoose")
const destinationsModel = require("../models/destinations")

const index =async (req,res,next)=>{
    try {
        const destinations = await destinationsModel.find()

res.status(200).json({
    method:"GET",
    destinations
})
    } catch (error) {
        next(error)
    }

}

const create = async (req,res,next)=>{
    try {
       const destination = await destinationsModel(req.body);
       
      await destination.save()

      res.status(201).json({
        method:"POST",
        message:"New destination added"
      })
    } catch (error) {
      if (error.name=="ValidationError") {
            error.status = 400
        }
        next(error)
    }
}


const edit = async (req,res,next)=>{
     try {
        if (!isValidObjectId(req.params.id)) {
           return res.status(400).json({
                error:"Bad request",
                message:"invalid Id"
            })
        }

if (req.body?.imgs && !Array.isArray(req.body.imgs)) {
  req.body.imgs = [req.body.imgs];
}
if (req.body?.reviews && !Array.isArray(req.body.reviews)) {
  req.body.reviews = [req.body.reviews];
}
if (req.body?.travlingTips && !Array.isArray(req.body.travlingTips)) {
  req.body.travlingTips = [req.body.travlingTips];
}

const { imgs, reviews, travlingTips, ...otherFields } = req.body;


const update = {
  ...otherFields,  
  $push: {
    ...(imgs ? { imgs: { $each: imgs } } : {}),
    ...(reviews ? { reviews: { $each: reviews } } : {}),
    ...(travlingTips ? { travlingTips: { $each: travlingTips } } : {})
  }
};

const destination = await destinationsModel.findByIdAndUpdate(
  req.params.id,
  update,
  { runValidators: true }
);

       if (!destination) {
       return res.status(400).json({
          error:"Bad request",
          message:"No destination with this id"
        })
       }
      res.status(200).json({
        method:"PUT",
        message:"Destination updated succesfully"
      })
    } catch (error) {
      if (error.name=="ValidationError") {
            error.status = 400
        }
        next(error)
    }
}

const show = async(req,res,next)=>{
  try {
      if (!isValidObjectId(req.params.id)) {
           return res.status(400).json({
                error:"Bad request",
                message:"invalid Id"
            })
        }

        const destination = await destinationsModel.findById(req.params.id);

        if (!destination) {
       return res.status(400).json({
          error:"Bad request",
          message:"No destination with this id"
        })
       }
           res.status(200).json({
            method:"GET",
            destination
        })

  } catch (error) {
    next(error)
  }
}

const destroy =async (req,res,next)=>{
   try {
        if (!isValidObjectId(req.params.id)) {
           return res.status(400).json({
                error:"Bad request",
                message:"invalid Id"
            })
        }

       const destination = await destinationsModel.findByIdAndDelete(req.params.id);
       
       if (!destination) {
       return res.status(400).json({
          error:"Bad request",
          message:"No destination with this id"
        })
       }

      res.status(200).json({
        method:"DELETE",
        message:"Destination deleted succesfully"
      })
    } catch (error) {
        next(error)
    }
}


module.exports = {create,index,edit,destroy,show}