var local_database = {

  dorms: [{
    dormId: 32,
    qrcode: '/images/community-qrcode.jpg',
    ShortName: 'Staytoo Apartment',
    Category: '商业',
    Name: 'Staytoo Appartment',
    Cover: 'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/staytoo.jpg',
    Tag: ['阳台', '公寓', '健身房', '游戏室', '交通不便','贵','服务费'],
    Address: 'Rochusstraße 65, 53123 BONN',
    Website: 'https://www.staytoo.de/en/bonn-student-apartments/',
    Apply: 'https://www.staytoo.de/en/booking/',
    Breif: 'At Staytoo, you will live in a stylishly furnished apartment, with an amazing array of amenities thrown into the deal to make your life easier. Better yet, you will stay on top of the costs because the whole living arrangement comes as an all-in package deal.',
    roomTypeList: [{
      type: '单人公寓',
      size: '17～23',
      number: '未知',
      furnished: '全装',
      price: '459~610欧'
    },
    {
      type: '双人公寓',
      size: '14~28',
      number: '未知',
      furnished: '全装',
      price: '未知'
    }
    ],
    imageList: [
      'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/staytoo/1.jpg',
      'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/staytoo/2.jpg',
      'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/staytoo/3.jpg',
      'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/staytoo/4.jpg',
      'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/staytoo/5.jpg',

    ],
    mapInfo: {
      latitude: 50.7190082,
      longitude: 7.0569379,
    }
  },
    {
      dormId: 33,
      qrcode: '/images/community-qrcode.jpg',
      ShortName: '42',
      Category: '商业',
      Name: 'Projekt 42!',
      Cover: 'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/42/3.png',
      Tag: ['主火', '环保', '可持续', '花园', '公寓', '阳台', '智能家居','漂亮','贵','实木地板'],
      Address: 'Karl-Frowein-Straße 4, 53115 Bonn',
      Website: 'https://www.42-bonn.de/grundidee-42/',
      Apply: 'https://www.42-bonn.de/kontakt/',
      Breif: 'Ein Leuchtturmprojekt ökologischen Bauens, zentral in Bonn gelegen. Mit einer Bauweise, die Ökologie und Wirtschaftlichkeit verbindet, tritt das innovative Projekt den Beweis an, dass Holzbau die Antwort auf die Frage sein kann, wie man im mehrgeschossigen Wohnungsbau Nachhaltigkeit und Zukunftsfähigkeit in Einklang bringt.',
      roomTypeList: [{
        type: '单人公寓',
        size: '26',
        number: '28',
        furnished: '全装',
        price: '未知'
      },
      {
        type: '双人公寓',
        size: '45',
        number: '5',
        furnished: '全装',
        price: '未知'
      }
      ],
      imageList: [
        'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/42/0.jpg',
        'https://bonn-dorm-1253324855.cos.eu-frankfurt.myqcloud.com/cdorms/42/1.png',
      ],
      mapInfo: {
        latitude: 50.734338,
        longitude: 7.085002,
      }
    },

  ]
}

module.exports = {
  cdormList: local_database
}