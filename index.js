const express = require('express');
const knex = require('knex');
const helmet = require('helmet');
const knexConfig = require('./knexfile.js');

const server = express();

const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// zoos endpoints
server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(zoos => {
      if(zoos.length) {
        res.status(200).json(zoos);
      } else {
        res.status(404).json({ message: "The zoo ID is not valid." });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      if(!req.body.name) {
        res.status(400).json({ message: "A valid name must be provided." });
      } else {
        res.status(500).json(err);
      };
    });
}); 

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "The zoo ID is not valid." });
      };
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;

  db('zoos')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "The zoo ID is not valid." });
      };
    })
    .catch(err => {
      if (!changes.name) {
        res.status(400).json({ message: "A valid name must be provided. Please try again." });
      } else {
        res.status(500).json(err);
      };
    });
});

// bears endpoints
server.get('/api/bears/:id', (req, res) => {
  db('bears')
    .where({ id: req.params.id })
    .then(bear => {
      if(bear.length) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: "The bear ID is not valid." });
      };
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json(erro);
    });
});

server.post('/api/bears', (req, res) => {
  db('bears')
    .insert(req.body)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        if(!req.body.name) {
          res.status(400).json({ message: "A valid name must be provided." });
        } else {
          res.status(500).json(err);
        };
      });
});

server.delete('/api/bears/:id', (req, res) => {
  db('bears')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "The bear ID is not valid." });
      };
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.put('/api/bears/:id', (req, res) => {
  const changes = req.body;

  db('bears')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "The bear ID is not valid." });
      };
    })
    .catch(err => {
      if (!changes.name) {
        res.status(400).json({ message: "A valid name must be provided. Please try again." });
      } else {
        res.status(500).json(err);
      };
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
