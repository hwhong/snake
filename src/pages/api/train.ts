import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    fetch(
      "https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace",
      { headers: { "x-api-key": "eeUcj01QdK2J8BUQZ8t767qe1Y8qNB2a1oApU8PR" } }
    ).then((result) => res.status(200).json({ result }));
  } catch (e) {
    res.status(200).json({ result: e });
  }

  res.status(200).json({ result: "success" });
}
