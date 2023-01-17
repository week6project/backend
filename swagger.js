// swagger.js
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: '내가기린그림',
    description: '항해 99 11기 6주차 미니프로젝트에서 만든 게시글 형식의 캐치마인드 게시판입니다.',
  },
  host: 'https://codingtestrg.shop:3001',
  schemes: ['https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
