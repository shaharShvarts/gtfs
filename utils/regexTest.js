const RegexTest = [
  { lang: "he", regex: /^[\u0590-\u05FF 0-9'-/].*$/ },
  { lang: "en", regex: /^[\s\w\d\?><;,\`(/).–{\}\[\]\-_\+=!@\#\$%^&\*\|\']*$/ }, ///^[A-Za-z 0-9'-/`]*$/
  { lang: "ru", regex: /^[\u0400-\u04FF 0-9'-/]*$/ },
  { lang: "ar", regex: /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u2000-\u206F\u2E00-\u2E7F 0-9'-/]*$/ },
];

export default RegexTest;
