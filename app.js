let fs = require ('fs')
const path = require('path')
const marked = require('marked')

path1 = path.parse("README.md"); 
console.log("path: ", path1); 
console.log("===================================")

let index = process.argv.indexOf("--file")
    if (index < 0) return console.log("You need to use a valid uri flag --file")
    console.log("===================================")    
    
let uri = process.argv[index + 1]
     let string =fs.readFileSync(uri, 'utf8')
     console.log(process.argv)
     console.log("index: ", index)
     console.log("uri: ", uri)
     console.log("Text: ", string)

    	process.argv.forEach((val, index, array) => {
	      console.log(`${index}: ${val}`);
	});
  console.log("===================================");
  fs.readFile('README.md', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
 

console.log("*************************************************")

// Override function
const renderer = {
  heading(text, level) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  }
};

marked.use({ renderer });

// Run marked
console.log(marked('# heading+'));
console.log("================================================================")
const tokenizer = {
  codespan(src) {
    const match = src.match(/\$+([^\$\n]+?)\$+/);
    if (match) {
      return {
        type: 'codespan',
        raw: match[0],
        text: match[1].trim()
      };
    }

    // return false to use original codespan tokenizer
    return false;
  }
};

marked.use({ tokenizer });

console.log("===============================================================0")
 
function isValidURL(string) {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

var testCase1 = "http://en.wikipedia.org/wiki/Procter_&_Gamble";
console.log(isValidURL(testCase1)); // return true

var testCase2 = "http://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&docid=nIv5rk2GyP3hXM&tbnid=isiOkMe3nCtexM:&ved=0CAUQjRw&url=http%3A%2F%2Fanimalcrossing.wikia.com%2Fwiki%2FLion&ei=ygZXU_2fGKbMsQTf4YLgAQ&bvm=bv.65177938,d.aWc&psig=AFQjCNEpBfKnal9kU7Zu4n7RnEt2nerN4g&ust=1398298682009707";
console.log(isValidURL(testCase2)); // return true

var testCase3 = "https://sdfasd";
console.log(isValidURL(testCase3)); // return false

var testCase4 = "dfdsfdsfdfdsfsdfs";
console.log(isValidURL(testCase4)); // return false

var testCase5 = "magnet:?xt=urn:btih:123";
console.log(isValidURL(testCase5)); // return false

var testCase6 = "https://stackoverflow.com/";
console.log(isValidURL(testCase6)); // return true

var testCase7 = "https://w";
console.log(isValidURL(testCase7)); // return false

var testCase8 = "https://sdfasdp.ppppppppppp";
console.log(isValidURL(testCase8)); // return false