// utils/modelMapper.js
const Diplome = require('../models/diplomeModel');
const Stage = require('../models/stageModel');
const Recommandation = require('../models/recommandationModel');
const Frequentation = require('../models/frequentationModel');

exports.getModelByType = (type) => {
  switch (type) {
    case 'Diplome': return Diplome;
    case 'Stage': return Stage;
    case 'Recommandation': return Recommandation;
    case 'Frequentation': return Frequentation;
    default: throw new Error("Type de demande inconnu");
  }
};


