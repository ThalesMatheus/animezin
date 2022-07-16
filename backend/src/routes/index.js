const { Router } = require('express')
const express = require('express')
const router = express.Router();
const aniRoute = require('./ani.ctt')

const home = (req, res) => {
  res.send(
      `<h1>Home</h1>
      <br>
      <ul>
          <li><a href='http://localhost:3000/api/ani'>Ver todos os animes</a></li>
      </ul>`
  )
}

const defaultRoutes = [
  {
    path: '/ani',
    route: aniRoute,
  },
  {
    path: '/home',
    route: home
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
