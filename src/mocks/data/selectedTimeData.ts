export const selectedTimeData = {
  RoomId: 11,
  totalPersonnel: [
    '오영',
    '채림',
    '구예진',
    '고세종',
    '류지민',
    '김유희',
    '경효선',
    '김수현',
    '김민우',
  ],
  participatedPersonnel: [
    '오영',
    '구예진',
    '고세종',
    '류지민',
    '김유희',
    '김수현',
    '경효선',
    '김민우',
  ],
  time: [
    // 연속된 시간 동안 같은 사용자가 유지되는 경우
    {
      selectTime: '2024-07-01T07:00',
      participantDetails: {
        nicknames: ['오영', '채림', '구예진'],
      },
    },
    {
      selectTime: '2024-07-01T07:30',
      participantDetails: {
        nicknames: ['오영', '채림', '구예진'],
      },
    },
    {
      selectTime: '2024-07-01T08:00',
      participantDetails: {
        nicknames: ['오영', '채림', '구예진'],
      },
    },
    {
      selectTime: '2024-07-01T08:30',
      participantDetails: {
        nicknames: ['오영', '채림', '구예진', '고세종'],
      },
    },
    {
      selectTime: '2024-07-01T09:00',
      participantDetails: {
        nicknames: ['오영', '채림', '구예진', '고세종', '류지민'],
      },
    },
    // 사용자가 일부 변경된 경우
    {
      selectTime: '2024-07-01T09:30',
      participantDetails: {
        nicknames: ['오영', '채림', '류지민', '김유희'],
      },
    },
    {
      selectTime: '2024-07-01T10:00',
      participantDetails: {
        nicknames: ['오영', '김유희'],
      },
    },
    {
      selectTime: '2024-07-01T10:30',
      participantDetails: {
        nicknames: ['김유희', '경효선', '김수현'],
      },
    },
    {
      selectTime: '2024-07-01T11:00',
      participantDetails: {
        nicknames: ['경효선', '김수현', '김민우'],
      },
    },
    {
      selectTime: '2024-07-01T11:30',
      participantDetails: {
        nicknames: ['김수현', '김민우', '류지민'],
      },
    },
    // 전혀 다른 사용자들이 포함된 경우
    {
      selectTime: '2024-07-01T12:00',
      participantDetails: {
        nicknames: ['구예진', '고세종', '김민우'],
      },
    },
    {
      selectTime: '2024-07-01T12:30',
      participantDetails: {
        nicknames: ['류지민', '경효선', '오영'],
      },
    },
    {
      selectTime: '2024-07-01T13:00',
      participantDetails: {
        nicknames: ['김수현', '채림', '김유희'],
      },
    },
    {
      selectTime: '2024-07-01T13:30',
      participantDetails: {
        nicknames: ['고세종', '김민우'],
      },
    },
    // 연속된 시간 동안 여러 사용자가 포함된 경우
    {
      selectTime: '2024-07-01T14:00',
      participantDetails: {
        nicknames: ['김수현', '김유희', '구예진', '류지민'],
      },
    },
    {
      selectTime: '2024-07-01T14:30',
      participantDetails: {
        nicknames: ['김수현', '김유희', '구예진', '류지민'],
      },
    },
    {
      selectTime: '2024-07-01T15:00',
      participantDetails: {
        nicknames: ['김수현', '김유희', '구예진', '류지민', '오영'],
      },
    },
    {
      selectTime: '2024-07-01T15:30',
      participantDetails: {
        nicknames: ['김수현', '김유희', '구예진', '류지민', '오영', '채림'],
      },
    },
    {
      selectTime: '2024-07-01T16:00',
      participantDetails: {
        nicknames: [
          '김수현',
          '김유희',
          '구예진',
          '류지민',
          '오영',
          '채림',
          '경효선',
        ],
      },
    },
    {
      selectTime: '2024-07-01T16:30',
      participantDetails: {
        nicknames: [
          '김수현',
          '김유희',
          '구예진',
          '류지민',
          '오영',
          '채림',
          '경효선',
          '고세종',
        ],
      },
    },
    {
      selectTime: '2024-07-01T17:00',
      participantDetails: {
        nicknames: [
          '김수현',
          '김유희',
          '구예진',
          '류지민',
          '오영',
          '채림',
          '경효선',
          '고세종',
          '김민우',
        ],
      },
    },
    // 다시 일부 사용자가 빠진 경우
    {
      selectTime: '2024-07-01T17:30',
      participantDetails: {
        nicknames: ['김수현', '구예진', '김유희'],
      },
    },
    {
      selectTime: '2024-07-01T18:00',
      participantDetails: {
        nicknames: ['김수현', '구예진', '김유희', '오영'],
      },
    },
    {
      selectTime: '2024-07-01T18:30',
      participantDetails: {
        nicknames: ['김수현', '구예진', '김유희', '오영', '채림'],
      },
    },
    // 밤 시간대에 사용자가 적은 경우
    {
      selectTime: '2024-07-01T19:00',
      participantDetails: {
        nicknames: ['김수현', '오영', '채림'],
      },
    },
    {
      selectTime: '2024-07-01T19:30',
      participantDetails: {
        nicknames: ['오영', '채림'],
      },
    },
    {
      selectTime: '2024-07-01T20:00',
      participantDetails: {
        nicknames: ['구예진', '고세종', '류지민', '김유희'],
      },
    },
    {
      selectTime: '2024-07-01T21:00',
      participantDetails: {
        nicknames: ['김수현', '김민우', '구예진'],
      },
    },
    {
      selectTime: '2024-07-01T21:30',
      participantDetails: {
        nicknames: ['김수현', '김민우', '오영', '경효선', '구예진'],
      },
    },
    {
      selectTime: '2024-07-01T22:00',
      participantDetails: {
        nicknames: ['김수현', '김민우', '오영', '경효선', '구예진', '류지민'],
      },
    },
    {
      selectTime: '2024-07-01T22:30',
      participantDetails: {
        nicknames: [
          '김수현',
          '김민우',
          '오영',
          '경효선',
          '구예진',
          '류지민',
          '채림',
        ],
      },
    },
    {
      selectTime: '2024-07-01T23:00',
      participantDetails: {
        nicknames: ['고세종', '류지민'],
      },
    },
    {
      selectTime: '2024-07-02T07:00',
      participantDetails: {
        nicknames: ['김민우', '경효선'],
      },
    },
    {
      selectTime: '2024-07-02T07:30',
      participantDetails: {
        nicknames: ['김민우', '경효선', '류지민'],
      },
    },
    {
      selectTime: '2024-07-02T08:00',
      participantDetails: {
        nicknames: ['김민우', '경효선', '류지민', '오영'],
      },
    },
    {
      selectTime: '2024-07-02T08:30',
      participantDetails: {
        nicknames: ['김민우', '경효선', '류지민', '오영', '김수현'],
      },
    },
    {
      selectTime: '2024-07-02T09:00',
      participantDetails: {
        nicknames: ['김민우', '경효선', '류지민', '오영', '김수현', '채림'],
      },
    },
    {
      selectTime: '2024-07-02T09:30',
      participantDetails: {
        nicknames: ['채림', '류지민'],
      },
    },
    {
      selectTime: '2024-07-02T12:30',
      participantDetails: {
        nicknames: ['채림'],
      },
    },
    {
      selectTime: '2024-07-02T14:00',
      participantDetails: {
        nicknames: ['김수현', '김민우', '구예진'],
      },
    },
    {
      selectTime: '2024-07-02T16:30',
      participantDetails: {
        nicknames: ['오영', '고세종', '김유희'],
      },
    },
    {
      selectTime: '2024-07-02T18:00',
      participantDetails: {
        nicknames: ['구예진', '김유희'],
      },
    },
    {
      selectTime: '2024-07-02T20:00',
      participantDetails: {
        nicknames: ['경효선', '고세종', '류지민', '김수현'],
      },
    },
    {
      selectTime: '2024-07-02T21:30',
      participantDetails: {
        nicknames: ['류지민', '채림', '김민우', '김수현'],
      },
    },
    {
      selectTime: '2024-07-02T22:30',
      participantDetails: {
        nicknames: ['오영', '채림', '구예진'],
      },
    },
    {
      selectTime: '2024-07-03T06:00',
      participantDetails: {
        nicknames: ['경효선', '김유희'],
      },
    },
    {
      selectTime: '2024-07-03T08:30',
      participantDetails: {
        nicknames: ['김수현', '류지민', '김민우'],
      },
    },
    {
      selectTime: '2024-07-03T10:00',
      participantDetails: {
        nicknames: ['오영'],
      },
    },
    {
      selectTime: '2024-07-03T12:00',
      participantDetails: {
        nicknames: ['김유희', '류지민'],
      },
    },
    {
      selectTime: '2024-07-03T14:30',
      participantDetails: {
        nicknames: ['경효선', '고세종'],
      },
    },
    {
      selectTime: '2024-07-03T16:00',
      participantDetails: {
        nicknames: ['구예진', '김수현', '채림'],
      },
    },
    {
      selectTime: '2024-07-03T18:00',
      participantDetails: {
        nicknames: ['구예진', '채림', '김민우'],
      },
    },
    {
      selectTime: '2024-07-03T19:30',
      participantDetails: {
        nicknames: ['류지민', '김유희', '김민우'],
      },
    },
    {
      selectTime: '2024-07-03T21:00',
      participantDetails: {
        nicknames: ['김수현', '김민우', '구예진'],
      },
    },
    {
      selectTime: '2024-07-03T22:30',
      participantDetails: {
        nicknames: ['류지민', '채림', '김수현'],
      },
    },
    {
      selectTime: '2024-07-04T07:00',
      participantDetails: {
        nicknames: ['김유희', '경효선'],
      },
    },
    {
      selectTime: '2024-07-04T09:30',
      participantDetails: {
        nicknames: ['오영'],
      },
    },
    {
      selectTime: '2024-07-04T11:00',
      participantDetails: {
        nicknames: ['김민우', '고세종'],
      },
    },
    {
      selectTime: '2024-07-04T12:30',
      participantDetails: {
        nicknames: ['채림', '류지민'],
      },
    },
    {
      selectTime: '2024-07-04T14:00',
      participantDetails: {
        nicknames: ['김수현', '김유희', '구예진'],
      },
    },
    {
      selectTime: '2024-07-04T15:30',
      participantDetails: {
        nicknames: ['오영', '채림', '김민우'],
      },
    },
    {
      selectTime: '2024-07-04T17:00',
      participantDetails: {
        nicknames: ['류지민', '고세종'],
      },
    },
    {
      selectTime: '2024-07-04T19:00',
      participantDetails: {
        nicknames: ['구예진', '고세종', '김유희'],
      },
    },
    {
      selectTime: '2024-07-04T21:00',
      participantDetails: {
        nicknames: ['김수현', '경효선', '김민우', '채림'],
      },
    },
    {
      selectTime: '2024-07-04T22:30',
      participantDetails: {
        nicknames: ['오영', '경효선'],
      },
    },
    {
      selectTime: '2024-07-05T06:30',
      participantDetails: {
        nicknames: ['김수현', '채림'],
      },
    },
    {
      selectTime: '2024-07-05T08:00',
      participantDetails: {
        nicknames: ['류지민', '김유희'],
      },
    },
    {
      selectTime: '2024-07-05T09:30',
      participantDetails: {
        nicknames: ['오영', '구예진'],
      },
    },
    {
      selectTime: '2024-07-05T11:00',
      participantDetails: {
        nicknames: ['경효선', '김수현'],
      },
    },
    {
      selectTime: '2024-07-05T13:00',
      participantDetails: {
        nicknames: ['구예진', '고세종'],
      },
    },
    {
      selectTime: '2024-07-05T15:30',
      participantDetails: {
        nicknames: ['류지민', '김민우', '김유희'],
      },
    },
    {
      selectTime: '2024-07-05T17:00',
      participantDetails: {
        nicknames: ['경효선', '김수현', '오영'],
      },
    },
    {
      selectTime: '2024-07-05T18:30',
      participantDetails: {
        nicknames: ['김수현', '김민우', '오영', '채림'],
      },
    },
    {
      selectTime: '2024-07-05T20:00',
      participantDetails: {
        nicknames: ['구예진', '고세종', '류지민'],
      },
    },
    {
      selectTime: '2024-07-05T22:00',
      participantDetails: {
        nicknames: ['경효선', '김수현', '류지민'],
      },
    },
    {
      selectTime: '2024-07-06T07:30',
      participantDetails: {
        nicknames: ['김유희'],
      },
    },
    {
      selectTime: '2024-07-06T09:00',
      participantDetails: {
        nicknames: ['경효선', '김수현'],
      },
    },
    {
      selectTime: '2024-07-06T10:30',
      participantDetails: {
        nicknames: ['김민우', '채림'],
      },
    },
    {
      selectTime: '2024-07-06T12:00',
      participantDetails: {
        nicknames: ['구예진', '고세종', '김민우'],
      },
    },
    {
      selectTime: '2024-07-06T13:30',
      participantDetails: {
        nicknames: ['오영', '김유희'],
      },
    },
    {
      selectTime: '2024-07-06T15:00',
      participantDetails: {
        nicknames: ['오영', '채림'],
      },
    },
    {
      selectTime: '2024-07-06T17:30',
      participantDetails: {
        nicknames: ['김수현', '경효선'],
      },
    },
    {
      selectTime: '2024-07-06T19:30',
      participantDetails: {
        nicknames: ['김수현', '경효선', '김유희'],
      },
    },
    {
      selectTime: '2024-07-06T21:00',
      participantDetails: {
        nicknames: ['류지민', '김민우', '구예진'],
      },
    },
    {
      selectTime: '2024-07-06T22:00',
      participantDetails: {
        nicknames: ['류지민', '고세종', '구예진'],
      },
    },
    {
      selectTime: '2024-07-07T08:00',
      participantDetails: {
        nicknames: ['김민우', '김수현'],
      },
    },
    {
      selectTime: '2024-07-07T09:30',
      participantDetails: {
        nicknames: ['채림', '오영'],
      },
    },
    {
      selectTime: '2024-07-07T10:30',
      participantDetails: {
        nicknames: ['경효선', '김유희', '류지민'],
      },
    },
    {
      selectTime: '2024-07-07T12:00',
      participantDetails: {
        nicknames: ['구예진', '고세종', '김수현'],
      },
    },
    {
      selectTime: '2024-07-07T14:00',
      participantDetails: {
        nicknames: ['오영', '구예진', '채림'],
      },
    },
    {
      selectTime: '2024-07-07T15:30',
      participantDetails: {
        nicknames: ['김유희', '김민우'],
      },
    },
    {
      selectTime: '2024-07-07T17:00',
      participantDetails: {
        nicknames: ['김수현', '경효선', '김유희'],
      },
    },
    {
      selectTime: '2024-07-07T18:00',
      participantDetails: {
        nicknames: ['김수현', '경효선', '김민우', '고세종'],
      },
    },
    {
      selectTime: '2024-07-07T19:30',
      participantDetails: {
        nicknames: ['류지민', '구예진', '김유희'],
      },
    },
    {
      selectTime: '2024-07-07T21:30',
      participantDetails: {
        nicknames: ['류지민', '김유희', '구예진'],
      },
    },
    {
      selectTime: '2024-07-07T22:00',
      participantDetails: {
        nicknames: ['김수현', '채림', '오영'],
      },
    },
  ],
};
