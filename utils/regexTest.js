const RegexTest = [
  { lang: "he", regex: /^[\u0590-\u05FF 0-9'-/].*$/ },
  { lang: "en", regex: /^[\s\w\d\?><;,\`().–{\}\[\]\-_\+=!@\#\$%^&\*\|\']*$/ }, ///^[A-Za-z 0-9'-/`]*$/
  { lang: "ru", regex: /^[\u0400-\u04FF 0-9'-/]*$/ },
  { lang: "ar", regex: /^[\u0600-\u06FF.\u200e 0-9'-/]*$/ },
];

export default RegexTest;
