import { TIMEOUT_SECONDS } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]); // reject promise if the request fefch was a weak connection
    const data = await res.json();

    if (!res) throw new Error("API key is not present");
    if (!res.ok) throw new Error("Check your API");

    return data;
  } catch (err) {
    console.error(`Warning from helper.js! ${err}`);
    throw err; // rethrow err passing it to the next importer
  }
};
