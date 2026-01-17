function generateCustomId(filiere, promotion, numero) {
    const numFormat = String(numero).padStart(3, '0'); // 001, 002...
    const filiereCode = filiere.toUpperCase();
    const promoShort = String(promotion).slice(-2);   // 2018 → 18
    return `ETD-${numFormat}-${filiereCode}-${promoShort}`;
  }
  
  module.exports = generateCustomId;
  