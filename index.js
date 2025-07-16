import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const START_DATE = moment("2024-09-01");
const END_DATE = moment("2025-06-30");

const getRandomDateInRange = () => {
  const daysDiff = END_DATE.diff(START_DATE, "days");
  const randomDays = random.int(0, daysDiff);
  return START_DATE.clone().add(randomDays, "days").startOf("day");
};

const makeCommits = (n) => {
  if (n === 0) {
    console.log("✅ Done pushing all commits");
    return simpleGit().push();
  }

  const date = getRandomDateInRange().format();
  const data = { date };

  console.log(`📅 Commit Date: ${date}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }, () =>
      makeCommits(n - 1)
    );
  });
};

makeCommits(100); // Change number as needed
