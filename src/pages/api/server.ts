import { NextApiRequest, NextApiResponse } from "next";
import pa11y from "pa11y";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {url} = req.body;
  console.log("URL: ", req.body);

  if (!url || typeof url !== "string" || url === "") {
    return res.status(400).json({ error: "Invalid url" });
  }

  try {
    const result = await pa11y(url);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to perform accessibility testing" });
  }
}


