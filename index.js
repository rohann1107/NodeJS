import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const path = "./data.json";

// ⬅️ Update to your specific date range
const START_DATE = moment("2025-06-21");
const END_DATE = moment("2025-06-25");

const getRandomDateInRange = () => {
  const daysDiff = END_DATE.diff(START_DATE, "days");
  const randomDays = Math.floor(Math.random() * (daysDiff + 1)); // 0 to daysDiff inclusive
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
    simpleGit()
      .add([path])
      .commit(date, { "--date": date }, () => makeCommits(n - 1));
  });
};

// Call it with number of fake commits you want
makeCommits(15);
