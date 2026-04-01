#!/usr/bin/env node

const required = ["LINKEDIN_ACCESS_TOKEN", "LINKEDIN_AUTHOR_URN", "OPENAI_API_KEY"];
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
  console.log("No class updates detected. Skipping LinkedIn post.");
  process.exit(0);
}

const siteUrl = process.env.SITE_URL || "https://learngermanghana.com";
const registerUrl = process.env.REGISTER_URL || "https://www.falowen.app";
const openAiModel = process.env.OPENAI_MODEL || "gpt-4o-mini";

const prompt = [
  "You are a social media assistant for Learn Language Education Academy in Ghana.",
  "Write one short LinkedIn post for new class updates.",
  "Style rules:",
  "- Friendly, confident, concise.",
  "- 1200 characters max.",
  "- Mention at least one concrete class update from the diff.",
  "- Include one clear call to action to register.",
  "- Include 3-5 relevant hashtags.",
  `- Mention website: ${siteUrl}`,
  `- Mention registration link: ${registerUrl}`,
  "Output only the final post text with no markdown fences.",
  "",
  `Changed files:\n${changedFiles.join("\n")}`,
  "",
  `Git diff:\n${diffText}`,
].join("\n");

async function generatePost() {
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
        { role: "system", content: "You produce polished LinkedIn copy for education brands." },
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
    throw new Error("OpenAI did not return post content.");
  }

  return content;
}

async function publishToLinkedIn(text) {
  const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: process.env.LINKEDIN_AUTHOR_URN,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LinkedIn publish failed (${response.status}): ${errorText}`);
  }

  const postUrn = response.headers.get("x-restli-id") || "(no urn returned)";
  console.log(`LinkedIn post published successfully: ${postUrn}`);
}

const postText = await generatePost();
console.log("Generated LinkedIn post draft:");
console.log(postText);
await publishToLinkedIn(postText);
