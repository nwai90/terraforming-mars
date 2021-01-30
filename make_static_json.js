// Generates the files settings.json and translations.json, stored in src/genfiles

require('dotenv').config();
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

function getAllTranslations() {
  const pathToTranslationsDir = path.resolve('src/locales');
  const translations = {};
  let translationDir = '';

  const dirs = fs.readdirSync(pathToTranslationsDir);
  for (let idx = 0; idx < dirs.length; idx++) {
    const lang = dirs[idx];
    const localeDir = path.join(pathToTranslationsDir, lang);
    if (lang.length === 2 && fs.statSync(localeDir).isDirectory()) {
      translationDir = path.resolve(path.join(pathToTranslationsDir, lang));

      const files = fs.readdirSync(translationDir);
      for (let idx = 0; idx < files.length; idx++) {
        const file = files[idx];

        if ( file === undefined || ! file.endsWith('.json')) continue;

        const dataJson = JSON.parse(fs.readFileSync(path.join(translationDir, file), 'utf8'));

        for (const phrase in dataJson) {
          if (translations[phrase] === undefined) {
            translations[phrase] = {};
          }
          translations[phrase][lang] = dataJson[phrase];
        }
      }
    }
  }

  return translations;
}

function generateAppVersion() {
  // assumes SOURCE_VERSION is git hash
  if (process.env.SOURCE_VERSION) {
    return process.env.SOURCE_VERSION.substring(0, 7) + ' deployed ' + new Date().toISOString();
  }
  try {
    return child_process.execSync(`git log -1 --pretty=format:"%h %cD"`).toString();
  } catch (error) {
    console.warn('unable to generate app version', error);
    return 'unknown version';
  }
}

function getWaitingForTimeout() {
  if (process.env.WAITING_FOR_TIMEOUT) {
    return Number(process.env.WAITING_FOR_TIMEOUT);
  }
  return 5000;
}

if (!fs.existsSync('src/genfiles')) {
    fs.mkdirSync('src/genfiles');
}

fs.writeFileSync('src/genfiles/settings.json', JSON.stringify({
    version: generateAppVersion(),
    waitingForTimeout: getWaitingForTimeout()
}));

fs.writeFileSync('src/genfiles/translations.json', JSON.stringify(
    getAllTranslations(),
));
