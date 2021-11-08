const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    try {
      const speakers = await speakersService.getList();
      const allArtworks = await speakersService.getAllArtwork();
      console.log(allArtworks);
      response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        allArtworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (request, response) => {
    try {
      const speaker = await speakersService.getSpeaker(request.params.shortname);
      const artworks = await speakersService.getArtworkForSpeaker(request.params.shortname);
      response.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        artworks,
      });
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
