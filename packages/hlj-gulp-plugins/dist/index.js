'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = _interopDefault(require('fs'));
var stream = _interopDefault(require('stream'));

var transform = new stream.Transform({ objectMode: true });
transform._transform = function (chunk, encoding, callback) {
  //此处输出传入的文件流，就是一段buffer
  var filePath = chunk.history[0];
  var content = chunk.contents.toString('utf-8');
  var pattern = /import ([a-z]*) from ['"].\/style.css['"]/;
  if (pattern.test(content)) {
    var data = fs.readFileSync(filePath.replace('index.js', 'style.json'));
    var match = content.match(pattern);
    content = content.replace(match[0], 'import "./style.css"\nconst ' + match[1] + ' = ' + data);
  }
  fs.writeFile(filePath, new Buffer(content), 'utf8', function (err) {
    if (err) {
      console.error(err);
    }
  });
  // file = chunk
  // //可以在这里对文件流内容进行处理
  // var str = chunk.contents.toString() //比如这里的str为"hello ${arg}"
  // chunk.contents = new Buffer(str)

  transform.push(chunk);

  callback();
};

module.exports = transform;
