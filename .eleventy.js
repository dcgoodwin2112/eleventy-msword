const fs = require("fs");
const path = require("path");
const mammoth = require("mammoth");
const globby = require("globby");

module.exports = function (eleventyConfig) {

  const DOC_PATH = "./_docs";

  const TEMPLATE_PATH = ".";

  const TEMPLATE_ENGINE = "html";

  const OPTIONS = {
    styleMap: [
      "p[style-name='Heading 1'] => h1.page-title:fresh",
      "p[style-name='Heading 2'] => h2:fresh",
      "p[style-name='Heading 3'] => h3:fresh",
    ],
  };

  const convertDocsToHTML = async () => {
    const paths = await globby(`${DOC_PATH}/**/*.docx`);
    paths.map((docPath) => {
      // Configure output path and file type
      const basePath = docPath.replace(DOC_PATH, "");
      const outputPath = path
        .join(TEMPLATE_PATH, basePath)
        .replace("docx", TEMPLATE_ENGINE);
      // Convert MS Word Docs to HTML templates
      mammoth.convertToHtml({ path: docPath }, OPTIONS).then((result) => {
        fs.writeFileSync(outputPath, result.value);
      });
    });
  };

  convertDocsToHTML()
};
