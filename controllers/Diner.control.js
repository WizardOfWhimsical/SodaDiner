/*
will be writing cruds directly to here
*/
import Soda from "#Models/Soda";
import Diner from "#Models/Diner";
import mongoose from "mongoose";

function getMany(req, res) {
  return Diner.find()
    .then((diner) => {
      if (!diner.length) {
        res.status(404).json("Nothing found");
      } else {
        res.status(200).json({ diners: diner });
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function createOne(req, res) {
  return Diner.create({ ...req.body })
    .then((diner) => {
      if (diner) {
        res.status(201).json(diner);
      } else {
        res.status(404).json("Failed to create");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function getOne(req, res) {
  return Diner.findOne({ _id: req.params.dinerID })
    .populate("sodas", null, { served: true })
    .then((diner) => {
      if (diner) {
        res.status(200).json({ diner });
      } else {
        res.status(404).json("Diner not found");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function updateOne(req, res) {
  return Diner.findByIdAndUpdate(
    req.params.dinerID,
    { ...req.body },
    { new: true, runValidators: true },
  )
    .then((diner) => {
      if (diner) {
        res.status(201).json(diner);
      } else {
        res.status(420).json("update failed");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function updateSodaOne(req, res) {
  return Diner.findById(req.params.dinerID)
    .then((diner) => {
      for (let soda of req.body.sodas) {
        let { sodas } = diner;
        if (!sodas.includes(soda)) {
          diner.sodas.push(soda);
        } else {
          console.log("***************************************");
          console.log(`-soda already exists in ${diner.name}'s Diner-`);
          console.log("***************************************");
        }
      }
      return diner.save();
    })
    .then((diner) => {
      if (diner) {
        res.status(201).json(diner);
      } else {
        res.status(420).json("update failed");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

function deleteOne(req, res) {
  return Diner.findByIdAndDelete(req.params.dinerID)
    .then((diner) => {
      if (diner) {
        res.status(200).json({ diner });
      } else {
        res.status(400).json("It was not deleted");
      }
    })
    .catch((e) => {
      res.status(500).json({ ErrorMessage: e.message });
    });
}

const crudDinerControllers = {
  getMany: getMany,
  createOne: createOne,
  getOne: getOne,
  updateOne: updateOne,
  deleteOne: deleteOne,
  updateSodaOne: updateSodaOne,
};

export default crudDinerControllers;
