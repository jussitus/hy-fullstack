import express from "express";
//import { calculateExercises } from "./exerciseCalculator";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    res.send({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  let { daily_exercises, target }: any = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!target || !daily_exercises || daily_exercises.length === 0) {
    res.status(400).send({ error: "parameters missing" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  daily_exercises = daily_exercises.map((x: any) => Number(x));
  target = Number(target);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  if (!isNaN(target) && !daily_exercises.every((x: any) => !isNaN(x))) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(calculateExercises(daily_exercises, target));
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
