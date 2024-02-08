const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.static('public'));

app.get('/api', (req, res) => {
  let count = fs.readFileSync('count.txt', { encoding: 'utf8', flag: 'r' });
  res.json({count:count});
});



// Define a POST endpoint at '/submit'
app.post('/api/submit', (req, res) => {
  let all_text = fs.readFileSync('count.txt', { encoding: 'utf8', flag: 'r' });
  let reasons = all_text.split('\n').slice(1);
  let number = all_text.split('\n')[0];
  let body = JSON.stringify(req.body);
  reasons.push(body);

  console.log(req.body);

  count = (parseInt(number)+1).toString() + "\n";

  try {
    count = count + reasons;
      fs.writeFile('count.txt', count, { encoding: "utf8" }, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("File written successfully");
      });

      res.status(200).send({count:count});
  } catch (error) {
    res.status(500).send({msg:error.message});
  }

});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});