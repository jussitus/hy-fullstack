export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  switch (true) {
    case bmi < 18:
      return `Abnormal (underweight)`;
    case bmi < 25:
      return `Normal (healthy weight)`;
    case bmi < 30:
      return `Abnormal (overweight)`;
    default:
      return `Abnormal (obese)`;
  }
};

interface HeightWeight {
  height: number;
  weight: number;
}
const parseArguments = (args: string[]): HeightWeight => {
  if (args.length !== 4) throw new Error("Wrong number of arguments");
  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (!isNaN(height) && !isNaN(weight)) {
    return { height, weight };
  } else {
    throw new Error("Arguments were not numbers");
  }
};
if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    }
  }
}
