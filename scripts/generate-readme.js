const fs = require('fs');
const path = require('path');

const metadataPath = path.join(__dirname, '..', 'channels-metadata.json');
const readmePath = path.join(__dirname, '..', 'README.generated.md');

const channels = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const value = item[key] || 'uncategorized';
    if (!acc[value]) acc[value] = [];
    acc[value].push(item);
    return acc;
  }, {});
}

const byCategory = groupBy(channels, 'category');
const aliases = channels.filter(c => c.alias_of);

let output = `# MeshCore NL Discovered Channels\n\n`;
output += `Generated from channels-metadata.json\n\n`;

output += `## Browse by category\n\n`;

for (const [category, items] of Object.entries(byCategory).sort()) {
  output += `### ${category}\n\n`;
  items.sort((a, b) => a.channel.localeCompare(b.channel)).forEach(item => {
    output += `- **${item.channel}**`;
    if (item.region) output += ` — ${item.region}`;
    if (item.notes) output += ` — ${item.notes}`;
    output += `\n`;
  });
  output += `\n`;
}

output += `## Known aliases\n\n`;
aliases.forEach(item => {
  output += `- **${item.channel}** → **${item.alias_of}**`;
  if (item.notes) output += ` — ${item.notes}`;
  output += `\n`;
});

fs.writeFileSync(readmePath, output, 'utf8');
console.log('README.generated.md created');