import markdownit from 'markdown-it';
const md = markdownit();
const result = md.render('# markdown-it rulezz!');
console.log(result);
