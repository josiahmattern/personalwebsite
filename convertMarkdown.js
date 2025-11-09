const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");

const md = new MarkdownIt({
	breaks: true
});

const inputDir = "./public/markdown";
const outputDir = "./public/blogposts";

// make sure the output folder exists
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// read all markdown files
const files = fs.readdirSync(inputDir).filter(f => f.endsWith(".md"));

for (const file of files) {
  const markdown = fs.readFileSync(path.join(inputDir, file), "utf8");
  const content = md.render(markdown);

  // wrap in your HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.parse(file).name}</title>
  <link rel="stylesheet" href="/blogstyles.css">
</head>
<body class="blog">
${content}
</body>
</html>`;

  // write to blogposts folder
  const outPath = path.join(outputDir, file.replace(/\.md$/, ".html"));
  fs.writeFileSync(outPath, html);
  console.log(`✅ ${file} → ${path.basename(outPath)}`);
}

console.log("🎉 All markdown files converted!");

