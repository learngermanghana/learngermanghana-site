#!/usr/bin/env node

const required = [
  "INSTAGRAM_ACCESS_TOKEN",
  "INSTAGRAM_IG_USER_ID",
  "INSTAGRAM_IMAGE_URL",
  "OPENAI_API_KEY",
];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

const changedFiles = (process.env.CHANGED_FILES || "")
  .split("\n")
  .map((entry) => entry.trim())
  .filter(Boolean);

const diffText = (process.env.CLASS_DIFF || "").trim();

if (changedFiles.length === 0 || diffText.length === 0) {
  console.log("No class updates detected. Skipping Instagram post.");
  process.exit(0);
}

const siteUrl = process.env.SITE_URL || "https://learngermanghana.com";
const registerUrl = process.env.REGISTER_URL || "https://falowen.com";
const openAiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

const prompt = [
  "You are a social media assistant for Learn Language Education Academy in Ghana.",
  "Write one Instagram feed caption for new class updates.",
  "Style rules:",
  "- Friendly, warm, concise.",
  "- 2200 characters max.",
  "- Mention at least one concrete class update from the diff.",
  "- Include one clear call to action to register.",
  "- Include 5-10 relevant hashtags.",
  `- Mention website: ${siteUrl}`,
  `- Mention registration link: ${registerUrl}`,
  "Output only the final caption text with no markdown fences.",
  "",
  `Changed files:\n${changedFiles.join("\n")}`,
  "",
  `Git diff:\n${diffText}`,
].join("\n");

async function generateCaption() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: openAiModel,
      temperature: 0.7,
      messages: [
        { role: "system", content: "You produce polished Instagram copy for education brands." },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error("OpenAI did not return caption content.");
  }

  return content;
}

async function createMediaContainer(caption) {
  const body = new URLSearchParams({
    image_url: process.env.INSTAGRAM_IMAGE_URL,
    caption,
    access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
  });

  const response = await fetch(`https://graph.facebook.com/${process.env.INSTAGRAM_IG_USER_ID}/media`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Instagram media creation failed (${response.status}): ${JSON.stringify(payload)}`);
  }

  if (!payload?.id) {
    throw new Error(`Instagram media creation did not return an id: ${JSON.stringify(payload)}`);
  }

  return payload.id;
}

async function publishMediaContainer(creationId) {
  const body = new URLSearchParams({
    creation_id: creationId,
    access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
  });

  const response = await fetch(`https://graph.facebook.com/${process.env.INSTAGRAM_IG_USER_ID}/media_publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Instagram publish failed (${response.status}): ${JSON.stringify(payload)}`);
  }

  const postId = payload?.id || "(no post id returned)";
  console.log(`Instagram post published successfully: ${postId}`);
}

const caption = await generateCaption();
console.log("Generated Instagram caption draft:");
console.log(caption);

const creationId = await createMediaContainer(caption);
console.log(`Created Instagram media container: ${creationId}`);

await publishMediaContainer(creationId);
