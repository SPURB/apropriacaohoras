import db from '../models'
import sequelize from 'sequelize'
import fetch from 'node-fetch'

module.exports = {
  horas: {
    totalPorPeriodo: (inicio, fim, idProjeto) => {
      const { between } = sequelize.Op
      const { horas } = db

      return horas.findOne({
        where: {
          projeto: idProjeto,
          dataRefInicio: {
            [between]: [inicio, fim]
          }
        },
        attributes: [
          'id',
          'projeto',
          [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
          [sequelize.fn('sum', sequelize.col('extras')), 'extras'],
          'dataRefInicio'
        ]
      })
    }
  },

  projetos: {
    somaHoras: where => {
      const { horas, projetos } = db

      return horas.findOne({
        where,
        attributes: [
          'id',
          'projeto',
          [sequelize.fn('sum', sequelize.col('horas')), 'horas'],
          [sequelize.fn('sum', sequelize.col('extras')), 'extras']
        ],
        include: [{ model: projetos, attributes: ['nome'], as: 'id_projeto' }]
      })
    }
  },

  usuarios: {
    criarMensagem: (nome, email, senha) => {
      return `
        <h3>Olá ${nome},</h3>
        <p>A sua senha do sistema de registro de horas é:</p>
        <p><strong>${senha}</strong></p>
        <p>Faça o login para acessar o sistema: <a href="https://servicos.spurbanismo.sp.gov.br/apropriacaohoras/?email=${email}">login</a></p>
        <p>Se preferir defina uma nova senha pelo link abaixo:</p>
        <p><a href="https://servicos.spurbanismo.sp.gov.br/apropriacaohoras/reset?email=${email}&reset=${senha}">Redefinir senha</a></p>
      `
    }
  },

  enviarEmail: (email, assunto, mensagem) => {
    const data = {
      'Para': email,
      'Assunto': assunto,
      'Mensagem': mensagem
    }

    const convert = json => {
      let str = []
      for (const key in json) {
        if (json.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key) + "=" + encodeURIComponent(json[key]))
        }
      }
      return str.join("&")
    }

    return fetch(process.env.SERVICE_EMAIL, {
      method: 'post',
      body: convert(data),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
  }
}
