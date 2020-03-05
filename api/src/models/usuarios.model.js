// http://spurbsp198/estagiario/apiestagio.php/user/ -> autentição nprodam intranet. Retorna NM_PRODAM
// http://spurbsp04/usuario/ws/localizacao?NM_PRODAM=e059153 -> dados completos de usuários
// http://spurbsp04/usuario/ws/localizacao -> lista global de usuários
module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('usuarios', {
    nprodam: {
      type: Sequelize.STRING(128)
    }
  })
  return Usuario
}
