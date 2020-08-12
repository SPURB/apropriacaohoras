import Commons from '../index'
import { line } from './commons'

function adminSection1 ({ projeto, totalHoras, usuarios, fasesComHoras }) {
  const equipe = Commons.separarArray(usuarios, 4)
  const fases = fasesComHoras.map(fase => {
    return [
      { text: fase.nome },
      { text: fase.totalHorasFase, style: ['tableFirst'] }
    ]
  })

  return [
    { text: line, margin: [0, 15, 0, 20] },
    {
      text: projeto,
      style: ['header']
    },
    {
      marginTop: 10,
      columns: [
        {},
        {
          text: `Horas totais registradas \n ${totalHoras}`,
          style: ['rightText']
        }
      ]
    },
    { text: line, margin: [0, 15, 0, 20] },
    {
      text: 'Equipe',
      style: ['subheader']
    },
    {
      margin: [0, 5, 0, 0],
      table: {
        widths: ['25%', '25%', '25%', '25%'],
        body: equipe
      },
      layout: 'noBorders'
    },
    { text: line, margin: [0, 15, 0, 20] },
    {
      text: 'Horas totais por fases',
      style: ['subheader']
    },
    {
      margin: [0, 5, 0, 0],
      table: {
        headerRows: 1,
        widths: ['70%', '30%'],
        body: [
          [
            { text: 'Fase', style: ['tableFirst'] },
            { text: 'Horas', style: ['tableFirst'] }
          ],
          ...fases,
          [
            { text: 'Total', style: ['textTable', 'total'] },
            { text: totalHoras, style: ['textTable', 'total'] }
          ]
        ]
      },
      layout: 'lightHorizontalLines',
      pageBreak: 'after'
    }
  ]
}

function adminSection2 ({
  projeto,
  totalHoras,
  fases,
  subatividadesFlat,
  horas
}) {
  const tables = fases.map(fase => {
    const content = subatividadesFlat
      .filter(subatividade => fase.id === subatividade.fase)
      .map(subatividade => {
        return [
          {
            text: subatividade.nome
          },
          {
            text: horas
              .filter(hora => hora.subatividade === subatividade.id)
              .map(hora => hora.horas + hora.extras)
              .reduce((a, acc) => a + acc, 0)
          }
        ]
      })

    const table = {
      margin: [0, 20, 0, 0],
      table: {
        headerRows: 1,
        widths: ['70%', '30%'],
        body: [
          [
            { text: fase.nome, style: ['tableFirst'], margin: [0, 20, 0, 0] },
            { text: 'Horas', style: ['tableFirst'], margin: [0, 20, 0, 0] }
          ],
          ...content
        ]
      },
      layout: 'lightHorizontalLines'
    }
    return table
  })

  return [
    { text: line, margin: [0, 10, 0, 20] },
    {
      columns: [
        {
          text: projeto,
          style: ['header']
        },
        {
          text: `Horas totais registradas \n ${totalHoras}`,
          style: ['rightText']
        }
      ]
    },
    { text: line, margin: [0, 10, 0, 20] },
    {
      text: 'Horas totais por subatividades',
      style: ['subheader']
    },
    tables,
    { text: '', pageBreak: 'after' }
  ]
}

function adminSection3 ({ projeto, totalHoras, horas, usuarios }) {
  const table = usuarios.map(usuario => {
    const horasUsuario = horas
      .filter(hora => hora.usuario === usuario.id)
      .map(hora => hora.horas + hora.extras)
      .reduce((a, ac) => a + ac, 0)

    return [{ text: usuario.nome }, { text: horasUsuario }]
  })

  return [
    { text: line, margin: [0, 10, 0, 20] },
    {
      columns: [
        {
          text: projeto,
          style: ['header']
        },
        {
          text: `Horas totais registradas \n ${totalHoras}`,
          style: ['rightText']
        }
      ]
    },
    { text: line, margin: [0, 10, 0, 20] },
    {
      text: 'Horas totais por Funcionário',
      style: ['subheader']
    },
    {
      margin: [0, 5, 0, 0],
      table: {
        headerRows: 1,
        widths: ['70%', '30%'],
        body: [
          [
            { text: 'Funcionário', style: ['tableFirst'] },
            { text: 'Horas', style: ['tableFirst'] }
          ],
          ...table,
          [
            { text: 'Total', style: ['textTable', 'total'] },
            { text: totalHoras, style: ['textTable', 'total'] }
          ]
        ],
        pageBreak: 'after'
      },
      layout: 'lightHorizontalLines'
    }
  ]
}

export { adminSection1, adminSection2, adminSection3 }
