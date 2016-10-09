var sitesRoutes = require('./Sites/routes');

module.exports = function routes(app) {
    app.use('/Sites', sitesRoutes);
};
