import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
  const res = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => {
      return res.data.choices[0].text;
    })
    .catch((error) => {
      return `ChatGPT was unable to find an asnwer fot that (Error: ${error.message})`;
    });

  return res;
};

export default query;
