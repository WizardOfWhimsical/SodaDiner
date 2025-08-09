import { Router } from "express";
import Diner from "#Controllers/Diner";

const router = Router();

router.route("/").get(Diner.getMany).post(Diner.createOne);

router
  .route("/:dinerID")
  .get(Diner.getOne)
  .put(Diner.updateOne)
  .delete(Diner.deleteOne);

router.route("/:dinerID/sodas").put(Diner.updateSodaOne);
export default router;
