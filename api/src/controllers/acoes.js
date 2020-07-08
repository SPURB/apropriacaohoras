import db from '../models'
import sequelize from 'sequelize'
import fetch from 'node-fetch'

const logo = '/static/spurbanismo-mono-negativo.png'

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
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>  
      </head>
      <body>
        <table width="640" cellpadding="0" cellspacing="0" border="0" class="wrapper" bgcolor="#FFFFFF"
          style="width:100%;font-family:roboto, sans-serif;padding:0;Margin:0">
          <tr>
            <td height="10" style="font-size:10px; line-height:10px;">&nbsp;</td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table width="600" cellpadding="15" cellspacing="0" border="0" class="container">
                <tr>
                  <td align="center" valign="top" bgcolor="#048874">
                    <img src="${logo}" width="200" height="50" style="margin:0; 
                          padding:0; 
                          border: none; 
                          display:block;" border="0" alt="" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table width="600" cellpadding="0" cellspacing="30" border="0">
                <tr>
                  <td bgcolor="#FFFFFF">
                    Olá
                    <strong>${nome}</strong>
                    você recebeu acesso ao sistema de registros de horas.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0" class="container">
                <tr>
                  <td align="center">
                    <p>Sua senha de acesso ao sistema é:</p>
                    <h3>
                      <strong>${senha}</strong>
                    </h3>
                    <p style="font-size: 11pt;">
                      você pode acessar o sistema agora ou redefinir sua senha clicando nos botões abaixo.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="30" border="0">
                <tr>
                  <td align="center">
                    <a href="https://servicos.spurbanismo.sp.gov.br/apropriacaohoras/?email=${email}"   >
                      Acessar sistema
                    </a>
                  </td>
                  <td align="center">
                    <a href="https://servicos.spurbanismo.sp.gov.br/apropriacaohoras/reset?email=${email}%26reset=${senha}" style="">
                      Redefinir senha
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" valign="top">
              <table width="600" cellpadding="15" cellspacing="0" border="0" class="container" style="margin-top: 2rem;">
                <tr>
                  <td align="left" valign="top" bgcolor="#048874">              
                    <font color="white">
                      Dúvidas ou problemas? Entre em contato com
                      <strong>desenvolvimento@spurbanismo.sp.gov.br</strong>
                    </font>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
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
