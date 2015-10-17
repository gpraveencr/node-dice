

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require("morgan");
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;

var Job = require('./models/jobs');

mongoose.connect('mongodb://localhost:27017/dice');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
  Authorization');
 next();
 });

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Welcome to the Home page!');
});

var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
  console.log('Request is in apiRouter');
  next();
});

apiRouter.get('/', function(req, res) {
  res.json({message : 'Welcome to API page!'});
});

apiRouter.route('/jobs')
  .post(function(req, res) {
    var job = new Job();

    if(req.body.company) job.company = req.body.company;
    if(req.body.jobtitle) job.jobtitle = req.body.jobtitle
    if(req.body.minyearsofexp) job.minyearsofexp = req.body.minyearsofexp
    if(req.body.maxyearsofexp) job.maxyearsofexp = req.body.maxyearsofexp
    if(req.body.location) job.location = req.body.location
    if(req.body.description) job.description = req.body.description
    if(req.body.requirements) job.requirements = req.body.requirements
    if(req.body.prefer) job.prefer = req.body.prefer
    if(req.body.benefits) job.benefits = req.body.benefits
    if(req.body.technologystack) job.technologystack = req.body.technologystack

    job.save(function(err) {
      if(err) {
        if(err.code == 11000)
          return res.json({message : 'Job already exists.'});
        else
          return res.send(err);
      }
      res.json({message : 'Job successfully created.'});
    });
  })
  .get(function(req, res) {
    Job.find(function(err, jobs) {
      if(err) {
        res.send(err);
      }
      res.json(jobs);
    });
  })

apiRouter.route('/jobs/:job_id')
  .get(function(req, res) {
    Job.findById(req.params.job_id, function(err, job) {
      if(err) {
        res.send(err);
      }
      res.json(job);
    });
  })
  .put(function(req, res) {
    Job.findById(req.params.job_id, function(err, job) {
      if(err) {
        res.send(err);
      }

      if(req.body.company) job.company = req.body.company;
      if(req.body.jobtitle) job.jobtitle = req.body.jobtitle
      if(req.body.minyearsofexp) job.minyearsofexp = req.body.minyearsofexp
      if(req.body.maxyearsofexp) job.maxyearsofexp = req.body.maxyearsofexp
      if(req.body.location) job.location = req.body.location
      if(req.body.description) job.description = req.body.description
      if(req.body.requirements) job.requirements = req.body.requirements
      if(req.body.prefer) job.prefer = req.body.prefer
      if(req.body.benefits) job.benefits = req.body.benefits
      if(req.body.technologystack) job.technologystack = req.body.technologystack

      job.save(function(err){
        if(err) {
          res.send(err);
        }
        res.json({message : 'Job updated successfully.'});
      });
    });
  })
  .delete(function(req, res) {
    Job.remove({_id : req.params.job_id}, function(err, job) {
      if(err) {
        res.send(err);
      }
      res.json({message : 'Job has been removed.'});
    });
  })

app.use('/api', apiRouter);

app.listen(port);
console.log('app is running on port ' + port);
