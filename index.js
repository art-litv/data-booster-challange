const axios = require("axios");
const fs = require("fs");

const apiUrl = "https://flag-gilt.vercel.app/api/challenge";
const bearerToken = "uM0M7uypyeeHZ741XIrs9KsFOUEhxUdtXJA=";

async function followCursor(nextCursor, cursorIndex = 0) {
  if (nextCursor) console.log(`Cursor (${cursorIndex}):`, nextCursor);

  const body = nextCursor && { cursor: nextCursor };

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    if (data.nextCursor) {
      await followCursor(data.nextCursor, cursorIndex + 1);
    } else {
      console.log("Result:", data);
      fs.writeFileSync("result.json", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

followCursor();
