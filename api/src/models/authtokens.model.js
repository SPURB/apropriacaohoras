module.exports = (sequelize, Sequelize) => {
  const AuthToken = sequelize.define('authtokens', {
    token: {
      type: Sequelize.STRING
    },
    idusuario: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.usuarios,
        key: 'id'
      }
    }
  })

  AuthToken.associate = UsuarioModel => AuthToken.belongsTo(UsuarioModel)

  AuthToken.generate = async idusuario => {
    if (!idusuario) {
      throw new Error('AuthToken requer o id do usuário')
    }

    let token = ''
    const possibleCharacters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      )
    }
    return AuthToken.create({ token, idusuario })
  }

  return AuthToken
}
