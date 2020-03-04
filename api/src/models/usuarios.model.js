module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('usuarios', {
    nprodam: {
      type: Sequelize.STRING(128)
    }
  })
  return Usuario
}
