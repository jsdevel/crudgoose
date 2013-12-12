    if(!req.username)return next(new Error('req.username was falsey.'));
    query.username = req.username;
