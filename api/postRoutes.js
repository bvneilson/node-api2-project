const express = require('express');
const db = require('../data/db.js');

const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post."});
  } else {
    db.insert(req.body).then(response => {
        db.findById(response.id).then(post => {
          res.status(201).json(post);
        }).catch(err => {
          res.status(400).send('There was an error');
        })
    }).catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
  }
});

router.post('/:id/comments', (req, res) => {
  const { id } = req.params;
  if (!req.body.text) {
    res.status(400).json({ errorMessage: "Please provide text for the comment." });
  } else {
    db.findById(id).then(response => {
      db.insertComment(req.body).then(responseTwo => {
        db.findCommentById(id).then(comment => {
          res.status(201).json(comment);
        }).catch(err => {
          res.status(400).send('There was an error')
        })
      }).catch(err => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
      })
    }).catch(err => {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
  }
});

router.get('/', (req, res) => {
  db.find().then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id).then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(500).json({ message: "The post with the specified ID does not exist." });
  })
});

router.get('/:id/comments', (req, res) => {
  const { id } = req.params;
  db.findPostComments(id).then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(404).json({ message: "The post with the specified ID does not exist." });
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id).then(response => {
    db.findById(id).then(responseTwo => {
      res.status(200).json({success: true, response});
    }).catch(err => {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
  }).catch(err => {
    res.status(500).json({ error: "The post could not be removed" });
  })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  } else {
    db.update(id, req.body).then(response => {
      db.findById(id).then(post => {
        res.status(200).json(post);
      }).catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      })
    }).catch(err => {
      res.status(500).json({ error: "The post information could not be modified." });
    })
  }
})

module.exports = router;
