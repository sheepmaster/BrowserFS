// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    common = require('../../../harness/common');
    
module.exports = function() {
  if (!fs.getRootFS().isReadOnly()) {
    var dirName = path.resolve(common.fixturesDir, 'test-readfile-unlink'),
        fileName = path.resolve(dirName, 'test.bin');
    
    var buf = new Buffer(512);
    buf.fill(42);
    
    fs.mkdir(dirName, function(err) {
      if (err) throw err;
      fs.writeFile(fileName, buf, function(err) {
        if (err) throw err;
        fs.readFile(fileName, function(err, data) {
          assert.ifError(err);
          assert(data.length == buf.length);
          assert.strictEqual(buf.get(0), 42);
    
          fs.unlink(fileName, function(err) {
            if (err) throw err;
            fs.rmdir(dirName, function(err) {
              if (err) throw err;
            });
          });
        });
      });
    });
  }
};
