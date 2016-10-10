var peopleRoutes = require('./people/routes');

module.exports = function routes(app) {
    app.use('/people', peopleRoutes);
};
