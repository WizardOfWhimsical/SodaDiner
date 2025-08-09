import { Router } from "express";
import Soda from "#Controllers/Soda";

const router = Router();

router
  .route("/")
  .get(Soda.getMany) //getmany
  .post(Soda.createOne); //createOne

router.route("/updateSoda/:sodaID").put(Soda.updateServingOne);

router.route("/serving").get(Soda.getMany); //getmany

router
  .route("/:sodaID")
  .get(Soda.getOne) //getOne
  .put(Soda.updateOne) //updateOne
  .delete(Soda.deleteOne); //deleteOne

export default router;
