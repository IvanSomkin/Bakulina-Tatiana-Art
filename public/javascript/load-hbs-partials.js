import { registerPartial } from 'express-handlebars';
import { readdirSync, readFileSync } from 'fs';

var partialsDir = __dirname + '/../views/partials';

var filenames = readdirSync(partialsDir);

filenames.forEach(function (filename) {
  var matches = /^([^.]+).hbs$/.exec(filename);
  if (!matches) {
    return;
  }
  var name = matches[1];
  var template = readFileSync(partialsDir + '/' + filename, 'utf8');
  registerPartial(name, template);
});