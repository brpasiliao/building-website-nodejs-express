const express = require('express');

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    try {
      const topSpeakers = await speakersService.getList();
      const allArtworks = await speakersService.getAllArtwork();
      response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        allArtworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
