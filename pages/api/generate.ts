import type { NextApiRequest, NextApiResponse } from "next";
import { FormValues } from "../../components/Form";
import { openai } from "../../utils/openai";

type Data = {
  result: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = req.body as FormValues;

  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt: generatePrompt(data),
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["#", ";"],
  });

  const sql = `SELECT ${response.data.choices[0].text}`;

  res.status(200).json({ result: sql });
}

function generatePrompt(data: FormValues) {
  const { details, table } = data;

  const tables = table.map((t) => `${t.name}(${t.fields})`);
  let str = "";

  for (const t of table) {
    str += `\n#${t.name}(${t.fields})`;
  }

  const prompt = `
  ### Postgres SQL tables, with their properties:
  #
  ${str}
  #
  ### ${details}
  SELECT
  `;

  console.log(prompt);

  return prompt;
}
