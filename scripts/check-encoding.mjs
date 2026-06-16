import fs from 'node:fs';
const files = ['index.html','app.js','style.css','sw.js','manifest.json','README.md','app.meta.json'];
const forbidden = [
  '\u00c3','\u00c2','Ã¢â‚¬Â¢','\u00c4','Ã¡Âº','Ã¡Â»',
  'Kho video c nh n','T ng video','Dung l ng','Y u th ch','Xem g n','Ti p t c','Th m video','M th vi n','Don video loi',
  'Chi ti t','S a','kh ng','Chua co','Phut hom nay','Video da xem','Lan nghi mat','Ngay ky uc','tr nh duy t','v nh vi n',
  'Dashboard cua','Nep xem','Ho so','Tom tat','T  m',
  'Chu n b',' l u ',' t ng ','l n nh t','B n mu n','ti p t c','Xoa','Doi ten','Nhap','Khong','Da ','Luu','Bo qua','Loi','Chua','phu huynh','Che do'
];
function stripAllowedRepairBlocks(file, text) {
  if (file !== 'app.js') return text;
  return text
    .replace(/function repairVietnameseText\(value\) \{[\s\S]*?\n\}\nfunction repairTextFields/, 'function repairTextFields')
    .replace(/function scanBadTextInMetadata\(rows = videos\) \{[\s\S]*?\n\}\n\nfunction getVisibleTextBadPatterns/, 'function getVisibleTextBadPatterns')
    .replace(/function getVisibleTextBadPatterns\(\) \{[\s\S]*?\n\}\n\s*function buildImportPreflightMessage/, 'function buildImportPreflightMessage')
    .replace(/function getDialogBadPatterns\(\) \{[\s\S]*?\n\}\n\nfunction scanDialogText/, 'function scanDialogText')
    .replace(/function encodingHealthCheck\(\) \{[\s\S]*?\n\}\n\nfunction scanBadText/, 'function scanBadText');
}
const errors = [];
for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const text = stripAllowedRepairBlocks(file, raw);
  for (const pattern of forbidden) {
    if (text.includes(pattern)) errors.push(file + ': ' + pattern);
  }
}
if (errors.length) {
  console.error('Encoding check FAIL');
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Encoding check PASS');
