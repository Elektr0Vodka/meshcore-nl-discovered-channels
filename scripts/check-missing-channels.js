const fs = require('fs');
const path = require('path');

const exportPath = path.join(__dirname, '..', 'remote-terminal-export.txt');
const metadataPath = path.join(__dirname, '..', 'channels-metadata.json');

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
const knownChannels = new Set(metadata.map(c => c.channel.toLowerCase()));

const exportText = fs.readFileSync(exportPath, 'utf8');

// Basic regex to find channels: #channel-name (assumes format #something)
const channelRegex = /#([a-zA-Z0-9_-]+)/g;

let match;
const foundChannels = new Set();

while ((match = channelRegex.exec(exportText)) !== null) {
  foundChannels.add(`#${match[1]}`);
}

const missingChannels = [...foundChannels].filter(c => !knownChannels.has(c.toLowerCase()));

if (!missingChannels.length) {
  console.log('✅ No missing channels found.');
} else {
  console.log('⚠️ Missing channels (not in metadata):');
  missingChannels.forEach(c => console.log(`- ${c}`));
}

// Optional: output to JSON file for further processing
fs.writeFileSync(
  path.join(__dirname, '..', 'missing-channels.json'),
  JSON.stringify(missingChannels, null, 2),
  'utf8'
);

console.log(`\nResults written to missing-channels.json`);