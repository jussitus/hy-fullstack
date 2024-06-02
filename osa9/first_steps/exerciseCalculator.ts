interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((x) => x !== 0).length;
  const average = hours.reduce((acc, x) => acc + x, 0) / hours.length;
  const success = average >= target;
  let rating, ratingDescription;
  switch (true) {
    case average < target - 1:
      rating = 1;
      ratingDescription = "bad, do better";
      break;
    case average > target:
      rating = 3;
      ratingDescription = "nice, keep up the good work";
      break;
    default:
      rating = 2;
      ratingDescription = "ok, getting there";
  }

  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    ratingDescription,
    target,
  };
};

interface TargetHours {
  target: number;
  hours: number[];
}
const parseArguments = (args: string[]): TargetHours => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const target = Number(args[2]);
  const hours = args.slice(3).map((n) => Number(n));
  if (!isNaN(target) && hours.every((x) => !isNaN(x))) {
    return { target, hours };
  } else {
    throw new Error("Arguments were not numbers");
  }
};

if (require.main === module) {
  try {
    const { target, hours } = parseArguments(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    }
  }
}
