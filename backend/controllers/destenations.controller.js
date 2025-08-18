const { isValidObjectId } = require("mongoose")
const destenationsModel = require("../models/destenations")

const index =async (req,res,next)=>{
    try {
        const destenations = await destenationsModel.find()

res.status(200).json({
    method:"GET",
    data: destenations
})
    } catch (error) {
        next(error)
    }

}

const create = async (req,res,next)=>{
    try {
       const destenation = await destenationsModel(req.body);
       
      await destenation.save()

      res.status(201).json({
        method:"POST",
        message:"New destenation added"
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

// Destructure out array fields
const { imgs, reviews, travlingTips, ...otherFields } = req.body;

// Build update object without conflict
const update = {
  ...otherFields,  // title, description, etc.
  $push: {
    ...(imgs ? { imgs: { $each: imgs } } : {}),
    ...(reviews ? { reviews: { $each: reviews } } : {}),
    ...(travlingTips ? { travlingTips: { $each: travlingTips } } : {})
  }
};

const destenation = await destenationsModel.findByIdAndUpdate(
  req.params.id,
  update,
  { new: true, runValidators: true }
);

       if (!destenation) {
       return res.status(400).json({
          error:"Bad request",
          message:"No Destenation with this id"
        })
       }
      res.status(200).json({
        method:"PUT",
        message:"Destenation updated succesfully"
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

        const destenation = await destenationsModel.findById(req.params.id);

        if (!destenation) {
       return res.status(400).json({
          error:"Bad request",
          message:"No Destenation with this id"
        })
       }
           res.status(200).json({
            method:"GET",
            data:destenation
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

       const destenation = await destenationsModel.findByIdAndDelete(req.params.id);
       
       if (!destenation) {
       return res.status(400).json({
          error:"Bad request",
          message:"No Destenation with this id"
        })
       }

      res.status(200).json({
        method:"DELETE",
        message:"Destenation deleted succesfully"
      })
    } catch (error) {
        next(error)
    }
}


module.exports = {create,index,edit,destroy,show}