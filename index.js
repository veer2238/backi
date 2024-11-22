import express from "express";


app.get('/api', (req, res) => {
    res.send('Hello World!')
    })

app.listen(3035, () => {
    console.log('Server connected');
  });