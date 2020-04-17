const now = new Date()
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'horas',
      [
        {
          id: 2,
          horas: 4,
          extras: 0,
          usuario: 1,
          projeto: 10,
          fase: 2,
          subatividade: 2,
          dataRefInicio: '2020-04-17',
          descricao: "descrição 2",
          createdAt: now,
          updatedAt: now
        },
        {
          id: 3,
          horas: 4,
          extras: 0,
          usuario: 1,
          projeto: 1,
          fase: 1,
          subatividade: 1,
          dataRefInicio: "2020-04-03",
          descricao: "descrição 3",
          createdAt: now,
          updatedAt: now
        },
        {
          "id": 4,
          "horas": 5,
          "extras": 0,
          "usuario": 1,
          "projeto": 1,
          "fase": 1,
          "subatividade": 1,
          "dataRefInicio": "2020-04-02",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 5,
          "horas": 8,
          "extras": 0,
          "usuario": 1,
          "projeto": 5,
          "fase": 1,
          "subatividade": 1,
          "dataRefInicio": "2020-04-01",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 6,
          "horas": 3,
          "extras": 0,
          "usuario": 1,
          "projeto": 11,
          "fase": 12,
          "subatividade": 2,
          "dataRefInicio": "2020-05-01",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 7,
          "horas": 8,
          "extras": 0,
          "usuario": 1,
          "projeto": 3,
          "fase": 10,
          "subatividade": 1,
          "dataRefInicio": "2020-05-04",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 8,
          "horas": 4,
          "extras": 0,
          "usuario": 1,
          "projeto": 9,
          "fase": 2,
          "subatividade": 1,
          "dataRefInicio": "2020-04-02",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 9,
          "horas": 4,
          "extras": 0,
          "usuario": 1,
          "projeto": 2,
          "fase": 2,
          "subatividade": 1,
          "dataRefInicio": "2020-04-03",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 10,
          "horas": 4,
          "extras": 0,
          "usuario": 1,
          "projeto": 2,
          "fase": 2,
          "subatividade": 2,
          "dataRefInicio": "2020-04-07",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 11,
          "horas": 4,
          "extras": 0,
          "usuario": 1,
          "projeto": 11,
          "fase": 9,
          "subatividade": 2,
          "dataRefInicio": "2020-04-08",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 12,
          "horas": 4,
          "extras": 0,
          "usuario": 1,
          "projeto": 11,
          "fase": 9,
          "subatividade": 2,
          "dataRefInicio": "2020-04-08",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        },
        {
          "id": 13,
          "horas": 6,
          "extras": 0,
          "usuario": 1,
          "projeto": 11,
          "fase": 8,
          "subatividade": 2,
          "dataRefInicio": "2020-04-09",
          "descricao": "",
          "createdAt": now,
          "updatedAt": now
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('horas', null, {})
  }
}
