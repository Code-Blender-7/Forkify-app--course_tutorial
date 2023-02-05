import { TIMEOUT_SECONDS } from "./config";

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/JSON", // json being sent will be a json format
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]); // reject promise if the request fefch was a weak connection
    const data = await res.json();

    if (!res) throw new Error("API key is not present");
    if (!res.ok) throw new Error("Check your API");

    return data;
  } catch (err) {
    console.error(`Warning from helper.js! ${err}`);
    throw err; // rethrow err passing it to the next importer
  }
};

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long after ${s} seconds`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  /*
  Receiving DATA from the API as a JSON
  Requires URL
  */
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

export const sendJSON = async function (url, uploadData) {
  /*
  Sending DATA to API as JSON
  Requires URL and uploadData
  */
  try {
    const fetchPro = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON", // json being sent will be a json format
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SECONDS)]); // reject promise if the request fefch was a weak connection
    const data = await res.json();

    if (!res) throw new Error("API key is not present");
    return data;
  } catch (err) {
    console.error(`Warning from helper.js! ${err}`);
    throw err; // rethrow err passing it to the next importer
  }
};
