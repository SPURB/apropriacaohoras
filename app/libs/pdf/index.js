import { styles01, styles02 } from './styles'
import Commons from '../index'
import { line, spurbanismoBase64 } from './commons'
import { adminSection1, adminSection2, adminSection3 } from './sections'

const origin = `${window.location.host}/apropriacaohoras/`
const date = Commons.currentDate()
const today = new Date()
const horario = today.getHours() + 'h' + today.getMinutes()

const pdfUsuario = (projetos, nome) => {
  let minhasHoras = 0

  const content = projetos.map((projeto, index) => {
    let horasEquipe = 0
    let horasUsuario = 0

    const fases = projeto.fases.map(fase => {
      minhasHoras = minhasHoras + fase.horasUsuario
      horasEquipe = horasEquipe + fase.horasEquipe
      horasUsuario = horasUsuario + fase.horasUsuario

      return [
        { text: fase.nome, style: 'textTable' },
        { text: fase.horasUsuario, style: ['rightText', 'textTable'] },
        { text: fase.horasEquipe, style: ['rightText', 'textTable'] }
      ]
    })

    const current = [
      { text: line, marginTop: 10 },
      {
        marginTop: 5,
        columns: [
          {
            text: nome,
            style: ['header', 'margin']
          },
          {
            text: `Horas totais registradas \n ${minhasHoras}`,
            style: ['rightText', 'margin']
          }
        ]
      },
      { text: line },
      {
        marginTop: 15,
        columns: [
          {
            text: projeto.nome,
            style: ['leftText', 'subheader']
          },
          {
            text: projeto.grupo,
            style: ['rightText', 'subheader']
          }
        ]
      },
      {
        style: 'tableHoras',
        marginTop: 15,
        table: {
          headerRows: 1,
          widths: '33%',
          body: [
            [
              { text: 'Fases', style: ['tableFirst'] },
              { text: 'Suas horas', style: ['tableHeader'] },
              { text: 'Horas da equipe', style: ['tableHeader'] }
            ],
            ...fases,
            [
              { text: 'Total', style: ['textTable', 'total'] },
              {
                text: horasUsuario,
                style: ['rightText', 'textTable', 'total']
              },
              {
                text: horasEquipe,
                style: ['rightText', 'textTable', 'total']
              }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ]

    if (index + 1 != projetos.length) {
      current[4].pageBreak = 'after'
    }

    return current
  })

  return {
    pageSize: 'A4',
    content,
    header: function (currentPage, pageCount) {
      return {
        columns: [
          {
            image: spurbanismoBase64,
            width: 100,
            marginTop: 25,
            marginLeft: 40
          },
          {
            alignment: 'right',
            text: currentPage.toString() + ' de ' + pageCount,
            marginTop: 25,
            marginRight: 40
          }
        ]
      }
    },
    footer: {
      margin: [40, -3, 40, 0],
      columns: [
        {
          text: `Verifique este documento \n ${origin}`,
          style: ['leftText', 'footer']
        },
        {
          text: `Relatório gerado em \n ${date.cDay}/${date.cMonth}/${date.cYear} às ${horario}`,
          style: ['rightText', 'footer']
        }
      ]
    },
    styles: styles01,
    defaultStyle: {
      columnGap: 20
    }
  }
}

const pdfAdmin = content => {
  return {
    pageSize: 'A4',
    header: (currentPage, pageCount) => {
      return {
        columns: [
          {
            image: spurbanismoBase64,
            width: 100,
            marginTop: 25,
            marginLeft: 40
          },
          {
            alignment: 'right',
            text: currentPage.toString() + ' de ' + pageCount,
            marginTop: 25,
            marginRight: 40
          }
        ]
      }
    },
    content: [
      adminSection1(content),
      adminSection2(content),
      adminSection3(content)
    ],
    footer: {
      margin: [40, -15, 40, 0],
      columns: [
        {
          text: `Verifique este documento \n ${origin}`,
          style: ['leftText', 'footer']
        },
        {
          text: `Relatório gerado em \n ${date.cDay}/${date.cMonth}/${date.cYear} às ${horario}`,
          style: ['rightText', 'footer']
        }
      ]
    },
    styles: styles02
  }
}

export { pdfUsuario, pdfAdmin }
