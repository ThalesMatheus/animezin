const { Router } = require('express')
const express = require('express')
const router = express.Router();
const aniRoute = require('./ani.ctt')

const defaultRoutes = [
  {
    path: '/ani',
    route: aniRoute,
  }
];

// const devRoutes = [
//   // routes available only in development mode
//   {
//     path: '/docs',
//     route: docsRoute,
//   },
// ];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// /* istanbul ignore next */
// if (config.env === 'development') {
//   devRoutes.forEach((route) => {
//     router.use(route.path, route.route);
//   });
// }

module.exports = router;
