import fs from "fs";
import stream from "stream";

const transform = new stream.Transform({ objectMode: true });

let file;
transform._transform = (chunk, encoding, callback) => {
  //此处输出传入的文件流，就是一段buffer
  let filePath = chunk.history[0];
  let content = chunk.contents.toString("utf-8");
  let pattern = /import ([a-z]*) from ['"].\/style.css['"]/;
  if (pattern.test(content)) {
    let data = fs.readFileSync(filePath.replace("index.js", "style.json"));
    let match = content.match(pattern);
    content = content.replace(
      match[0],
      `import "./style.css"\nconst ${match[1]} = ${data}`
    );
  }
  fs.writeFile(filePath, new Buffer(content), "utf8", err => {
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

export default transform;
