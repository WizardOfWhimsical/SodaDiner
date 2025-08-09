import Soda from "#Models/Soda";

function getMany(req, res) {
  return Soda.find()
    .then((soda) => {
      if (!soda.length) {
        res.status(404).json("Something went wrong");
      } else {
        res.status(200).json({ sodas: soda });
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function createOne(req, res) {
  return Soda.create({
    ...req.body,
    rating: req.body.taste_rating,
  })
    .then((sodas) => {
      if (sodas) {
        res.status(201).json({ sodas });
      } else {
        res.status(404).json("failed to create");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function getOne(req, res) {
  return Soda.findOne({ _id: req.params.sodaID })
    .then((soda) => {
      if (soda) {
        res.status(200).json({ soda });
      } else {
        res.status(400).json("failed to find");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function updateOne(req, res) {
  return Soda.findByIdAndUpdate(
    req.params.sodaID,
    { ...req.body, rating: req.body.taste_rating },
    { new: true, runValidators: true },
  )
    .then((soda) => {
      if (soda) {
        res.status(201).json({ soda });
      } else {
        res.status(400).json("update failed");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function updateServingOne(req, res) {
  return Soda.findByIdAndUpdate(
    req.params.sodaID,
    { ...req.body, rating: req.body.taste_rating, served: req.body.serving },
    { new: true },
  )
    .then((soda) => {
      if (soda) {
        soda = soda.toObject();
        soda.serving = soda.served.toString();
        res.status(201).json(soda);
      } else {
        res.status(400).json("update failed");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function deleteOne(req, res) {
  return Soda.findByIdAndDelete(req.params.sodaID)
    .then((soda) => {
      if (soda) {
        res.status(200).json({ soda });
      } else {
        res.status(400).json("It was not successful");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

const crudSodaControllers = {
  getMany: getMany,
  createOne: createOne,
  getOne: getOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  updateServingOne: updateServingOne,
};

export default crudSodaControllers;
