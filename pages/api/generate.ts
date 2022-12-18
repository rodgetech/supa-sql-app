import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import { FormValues } from "../../components/Form";
import { openai } from "../../utils/openai";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createServerSupabaseClient({
    req,
    res,
  });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const data = req.body as FormValues;

  const prompt = generatePrompt(data);

  const response = await openai.createCompletion({
    model: "code-davinci-002",
    prompt,
    temperature: 0,
    max_tokens: 150,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["#", ";"],
  });

  const sql = `SELECT ${response.data.choices[0].text};`;

  if (!session) return res.status(200).json({ result: sql });

  const { error } = await supabase.from("translation_histories").insert({
    profile_id: session.user.id,
    generated_prompt: prompt,
    query_instructions: data.details,
    query_completion: sql,
    tables: data.table,
  });

  if (error) {
    console.log({ error });
    return res.status(500).json({ error: "Failed to save history" });
  }

  res.status(200).json({ result: sql });
}

function generatePrompt(data: FormValues) {
  const { details, table } = data;

  let tablesWithFieldsString = "";

  for (const t of table) {
    tablesWithFieldsString += `\n#${t.name}(${t.fields})`;
  }

  const prompt = `
  ### Postgres SQL tables, with their properties:
  #
  ${tablesWithFieldsString}
  #
  ### ${details}
  SELECT
  `;

  return prompt;
}
