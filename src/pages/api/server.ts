import { NextApiRequest, NextApiResponse } from "next";
import pa11y from "pa11y";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
      const { url } = req.body;

      // Check if the URL is valid
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(url)) {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      if (!url || typeof url !== "string" || url === "") {
        return res.status(400).json({ error: "Invalid url" });
      }


      try {
        const result = await pa11y(url);
        res.json(result);
      } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to perform accessibility testing" });
      }
}
