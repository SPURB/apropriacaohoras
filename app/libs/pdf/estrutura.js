import Commons from '../index'

const spurbanismoBase64 =
  'data:image/png;base64,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'
const line =
  '_______________________________________________________________________________________________'

export default {
  pageBreak: projetos => {
    return projetos.map((projeto, index) => {
      if (index + 1 != projetos.length) {
        projeto[projeto.length - 1].pageBreak = 'after'
      }
      return projeto
    })
  },
  primeiraPageAdmin: projeto => {
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
  }
}
