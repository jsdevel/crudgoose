  app.get('/users', function(req, res, next){
    var query = {};
    //query
    User.find(query, function(err, users){
      if(err)return next(err);
      res.json(users);
    });
  });
