// http://spurbsp198/estagiario/apiestagio.php/user/ -> autentição nprodam intranet. Retorna NM_PRODAM
// http://spurbsp04/usuario/ws/localizacao?NM_PRODAM=e059153 -> dados completos de usuários
// http://spurbsp04/usuario/ws/localizacao -> lista global de usuários
module.exports = (sequelize, Sequelize) => {
  let Usuario = sequelize.define('usuarios', {
    nprodam: {
			type: Sequelize.STRING(128),
			unique: true
    },
    email: {
			type: Sequelize.STRING,
			unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
	})
	Usuario.associate = AuthTokenModel => Usuario.hasMany(AuthTokenModel)

  Usuario.prototype.authorize = async function () {
    const { authtokens } = sequelize.models
    const user = this
    const authoritzation = await authtokens.generate(this.id)

		return { usuario: user, authoritzation }
  }

  return Usuario
}
