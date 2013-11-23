#crudgoose
Geese are birds. Mongeese eat birds.  Crudgeese battle mongeese by generating
crud.

##Flight Plan of a Crudgoose

1. Find the project's configuration.  The project's configuration is expected to
reside in `$PROJECT_ROOT/config/crudgoose.json`.  Crudgoose uses `findup-sync`
to achieve this.
2. Find the models tracked by the configuration.  The models may be listed
individually, or they may be grouped in a directory.  All paths are resolved
against the location of the configuration.
3. Extract the model names and schemas.  Crudgoose loads the models using using
`proxyquire` and `sinon` to intercept mongoose constructs.
4. Generate a module with all the CRUD and exit!