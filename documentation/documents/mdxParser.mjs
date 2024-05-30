import * as fs from 'fs';
import * as xml2js from 'xml2js';

fs.readFile('test-results/merged-results.xml', 'utf8', function (err, xmlData) {
  if (err) {
    return console.log(err);
  }

  xml2js.parseString(xmlData, function (err, result) {
    if (err) {
      return console.log(err);
    }

    const testsuites = result.testsuites.testsuite;
    let mdxContent = 
    `
import { Meta, Description } from '@storybook/addon-docs'

<Meta 
title="Test Report"  
parameters={{
    viewMode: 'docs',
    previewTabs: { 
    canvas: { hidden: true } 
    },
}}
/>

# Test Report\n\n`;

    for (const testsuite of testsuites) {
      const testcases = testsuite.testcase;
      const testsuiteName = `${testsuite.$.name}`.replace('tests ', '');

      mdxContent += `## ${testsuiteName}\n\n`;

      for (const testcase of testcases) {
        const isFailed = testcase.failure;
        const testName = `${testcase.$.name}`.replace(testsuiteName, '').replace('test ', '');
        const testStatus = isFailed ? 'Failed' : 'Passed';
        const testIcon = isFailed ? '❌' : '✅';
        mdxContent += `- ${testIcon} ${testName}: ${testStatus}\n`;
      }

      mdxContent += '\n';
    }

    fs.writeFile('stories/testResults.stories.mdx', mdxContent, function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('The .mdx file was saved!');
    });
  });
});
