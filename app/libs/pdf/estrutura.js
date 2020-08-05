import Commons from '../index'
import { line } from './commons'

export default {
  pageBreak: projetos => {
    return projetos.map((projeto, index) => {
      if (index + 1 != projetos.length) {
        projeto[projeto.length - 1].pageBreak = 'after'
      }
      return projeto
    })
  },
  primeiraPaginaAdmin: projeto => {
    const equipe = Commons.separarArray(projeto.equipe, 4)
    const fases = projeto.fases.map(fase => {
      return [
        { text: fase.nome },
        { text: fase.totalHorasFase, style: ['tableFirst'] }
      ]
    })
    return [
      { text: line, margin: [0, 15, 0, 20] },
      {
        text: projeto.nomeProjeto,
        style: ['header']
      },
      {
        marginTop: 10,
        columns: [
          {
            text: 'Data da última atualização: \n 2020 06 13 às 13h42'
          },
          {
            text: `Horas totais registradas \n ${projeto.totalHoras}`,
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
              { text: projeto.totalHoras, style: ['textTable', 'total'] }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ]
  },
  segundaPaginaAdmin: projeto => {
    const tables = projeto.fases.map(fase => {
      const content = fase.subatividades.map(subatividade => {
        return [{ text: subatividade.nome }, { text: subatividade.totalHoras }]
      })

      const table = {
        margin: [0, 20, 0, 0],
        table: {
          headerRows: 1,
          widths: ['70%', '30%'],
          body: [
            [
              { text: fase.nome, style: ['tableFirst'] },
              { text: 'Horas', style: ['tableFirst'] }
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
            text: projeto.nomeProjeto,
            style: ['header']
          },
          {
            text: `Horas totais registradas \n ${projeto.totalHoras}`,
            style: ['rightText']
          }
        ]
      },
      { text: line, margin: [0, 10, 0, 20] },
      {
        text: 'Horas totais por Subatividades',
        style: ['subheader']
      },
      tables,
      { text: '' }
    ]
  },
  terceiraPaginaAdmin: projeto => {
    const table = projeto.equipe.map(membro => {
      return [{ text: membro.nome }, { text: membro.totalHoras }]
    })

    return [
      { text: line, margin: [0, 10, 0, 20] },
      {
        columns: [
          {
            text: projeto.nomeProjeto,
            style: ['header']
          },
          {
            text: `Horas totais registradas \n ${projeto.totalHoras}`,
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
              { text: projeto.totalHoras, style: ['textTable', 'total'] }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ]
  },
  quartaPaginaAdmin: projeto => {
    const fases = projeto.fases.map(fase => {
      return [
        { text: fase.nome, style: 'textTable' },
        { text: fase.horasUsuario, style: ['rightText', 'textTable'] },
        { text: fase.horasEquipe, style: ['rightText', 'textTable'] }
      ]
    })

    return [
      { text: line, marginTop: 10 },
      {
        marginTop: 5,
        columns: [
          {
            text: projeto.nomeMembro,
            style: ['header', 'margin']
          },
          {
            text: `Horas totais registradas \n ${projeto.totalHorasProjetoUsuario}`,
            style: ['rightText', 'margin']
          }
        ]
      },
      { text: line },
      {
        marginTop: 15,
        columns: [
          {
            text: projeto.nomeProjeto,
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
              { text: 'Horas do funcionário', style: ['tableHeader'] },
              { text: 'Horas da equipe', style: ['tableHeader'] }
            ],
            ...fases,
            [
              { text: 'Total', style: ['textTable', 'total'] },
              {
                text: projeto.totalHorasProjetoUsuario,
                style: ['rightText', 'textTable', 'total']
              },
              {
                text: projeto.totalHorasProjeto,
                style: ['rightText', 'textTable', 'total']
              }
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ]
  }
}
