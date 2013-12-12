  app.get('/users/:id', function(req, res, next){
    var id    = req.params.id;
    var query = {id:id};
    //query
    User.find(query, function(err, users){
      if(err)return next(err);
      res.json(users);
    });
  });
