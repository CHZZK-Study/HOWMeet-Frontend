import { LoginReq } from '@/models/user.model';
import { http, HttpResponse, PathParams } from 'msw';

const handlers = [
  http.get('https://example.com/user', () => {
    return HttpResponse.json({
      id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d',
      firstName: 'John',
      lastName: 'Maverick',
    });
  }),
  http.post<PathParams, LoginReq>('/mock/login', async ({ request }) => {
    const { nickname, password } = await request.json();

    if (nickname === '테스트' && password === '1234') {
      return HttpResponse.json(
        {
          accessToken:
            'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ7XCJpZFwiOjEsXCJuaWNrbmFtZVwiOlwi6rmA66-87JqwXCIsXCJyb2xlXCI6XCJURU1QT1JBUllcIixcImd1ZXN0XCI6dHJ1ZSxcIm1lbWJlclwiOmZhbHNlfSIsImlhdCI6MTcyMjQ4NjkwNywiZXhwIjoxNzIyNDkwNTA3fQ.qp9uZqvGbRRGi41af05poj98WjB7DeEGSwJrXNORm7HId9v_gojtZvVaRkCSNM2kSFCn54xm2QyKhXQsTlKV6g',
          guestId: 1,
          nickname: '테스터',
        },
        { status: 201 }
      );
    }
    return HttpResponse.json(null, { status: 400 });
  }),

  // 선택한 시간 결과 가져오기 (방장용)
  http.get('/selectedResult', () => {
    return HttpResponse.json({
      RoomId: 11,
      totalParticipants: {
        count: 9,
        names: [
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
      },
      selectTime: [
        {
          time: '2024-07-01T07:30',
          users: ['김유희', '구예진'],
          userCount: 2,
        },
        {
          time: '2024-07-01T10:00',
          users: ['오영', '채림'],
          userCount: 2,
        },
        {
          time: '2024-07-01T12:30',
          users: ['경효선', '고세종'],
          userCount: 2,
        },
        {
          time: '2024-07-01T15:00',
          users: ['류지민', '김수현', '김민우'],
          userCount: 3,
        },
        {
          time: '2024-07-01T17:30',
          users: ['구예진', '김유희', '채림'],
          userCount: 3,
        },
        {
          time: '2024-07-01T19:30',
          users: ['오영', '채림'],
          userCount: 2,
        },
        {
          time: '2024-07-01T20:00',
          users: ['구예진', '고세종', '류지민', '김유희'],
          userCount: 4,
        },
        {
          time: '2024-07-01T21:30',
          users: ['김수현', '김민우', '오영', '경효선', '구예진'],
          userCount: 5,
        },
        {
          time: '2024-07-01T23:00',
          users: ['고세종', '류지민'],
          userCount: 2,
        },
        {
          time: '2024-07-02T07:00',
          users: ['김민우', '경효선'],
          userCount: 2,
        },
        {
          time: '2024-07-02T09:30',
          users: ['채림', '류지민'],
          userCount: 2,
        },
        {
          time: '2024-07-02T12:30',
          users: ['채림'],
          userCount: 1,
        },
        {
          time: '2024-07-02T14:00',
          users: ['김수현', '김민우', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-02T16:30',
          users: ['오영', '고세종', '김유희'],
          userCount: 3,
        },
        {
          time: '2024-07-02T18:00',
          users: ['구예진', '김유희'],
          userCount: 2,
        },
        {
          time: '2024-07-02T20:00',
          users: ['경효선', '고세종', '류지민', '김수현'],
          userCount: 4,
        },
        {
          time: '2024-07-02T21:30',
          users: ['류지민', '채림', '김민우', '김수현'],
          userCount: 4,
        },
        {
          time: '2024-07-02T22:30',
          users: ['오영', '채림', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-03T06:00',
          users: ['경효선', '김유희'],
          userCount: 2,
        },
        {
          time: '2024-07-03T08:30',
          users: ['김수현', '류지민', '김민우'],
          userCount: 3,
        },
        {
          time: '2024-07-03T10:00',
          users: ['오영'],
          userCount: 1,
        },
        {
          time: '2024-07-03T12:00',
          users: ['김유희', '류지민'],
          userCount: 2,
        },
        {
          time: '2024-07-03T14:30',
          users: ['경효선', '고세종'],
          userCount: 2,
        },
        {
          time: '2024-07-03T16:00',
          users: ['구예진', '김수현', '채림'],
          userCount: 3,
        },
        {
          time: '2024-07-03T18:00',
          users: ['구예진', '채림', '김민우'],
          userCount: 3,
        },
        {
          time: '2024-07-03T19:30',
          users: ['류지민', '김유희', '김민우'],
          userCount: 3,
        },
        {
          time: '2024-07-03T21:00',
          users: ['김수현', '김민우', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-03T22:30',
          users: ['류지민', '채림', '김수현'],
          userCount: 3,
        },
        {
          time: '2024-07-04T07:00',
          users: ['김유희', '경효선'],
          userCount: 2,
        },
        {
          time: '2024-07-04T09:30',
          users: ['오영'],
          userCount: 1,
        },
        {
          time: '2024-07-04T11:00',
          users: ['김민우', '고세종'],
          userCount: 2,
        },
        {
          time: '2024-07-04T12:30',
          users: ['채림', '류지민'],
          userCount: 2,
        },
        {
          time: '2024-07-04T14:00',
          users: ['김수현', '김유희', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-04T15:30',
          users: ['오영', '채림', '김민우'],
          userCount: 3,
        },
        {
          time: '2024-07-04T17:00',
          users: ['류지민', '고세종'],
          userCount: 2,
        },
        {
          time: '2024-07-04T19:00',
          users: ['구예진', '고세종', '김유희'],
          userCount: 3,
        },
        {
          time: '2024-07-04T21:00',
          users: ['김수현', '경효선', '김민우', '채림'],
          userCount: 4,
        },
        {
          time: '2024-07-04T22:30',
          users: ['오영', '경효선'],
          userCount: 2,
        },
        {
          time: '2024-07-05T06:30',
          users: ['김수현', '채림'],
          userCount: 2,
        },
        {
          time: '2024-07-05T08:00',
          users: ['류지민', '김유희'],
          userCount: 2,
        },
        {
          time: '2024-07-05T09:30',
          users: ['오영', '구예진'],
          userCount: 2,
        },
        {
          time: '2024-07-05T11:00',
          users: ['경효선', '김수현'],
          userCount: 2,
        },
        {
          time: '2024-07-05T13:00',
          users: ['구예진', '고세종'],
          userCount: 2,
        },
        {
          time: '2024-07-05T15:30',
          users: ['류지민', '김민우', '김유희'],
          userCount: 3,
        },
        {
          time: '2024-07-05T17:00',
          users: ['경효선', '김수현', '오영'],
          userCount: 3,
        },
        {
          time: '2024-07-05T18:30',
          users: ['김수현', '김민우', '오영', '채림'],
          userCount: 4,
        },
        {
          time: '2024-07-05T20:00',
          users: ['구예진', '고세종', '류지민'],
          userCount: 3,
        },
        {
          time: '2024-07-05T22:00',
          users: ['경효선', '김수현', '류지민'],
          userCount: 3,
        },
        {
          time: '2024-07-06T07:30',
          users: ['김유희'],
          userCount: 1,
        },
        {
          time: '2024-07-06T09:00',
          users: ['경효선', '김수현'],
          userCount: 2,
        },
        {
          time: '2024-07-06T10:30',
          users: ['김민우', '채림'],
          userCount: 2,
        },
        {
          time: '2024-07-06T12:00',
          users: ['구예진', '고세종', '김민우'],
          userCount: 3,
        },
        {
          time: '2024-07-06T13:30',
          users: ['오영', '김유희'],
          userCount: 2,
        },
        {
          time: '2024-07-06T15:00',
          users: ['오영', '채림'],
          userCount: 2,
        },
        {
          time: '2024-07-06T17:30',
          users: ['김수현', '경효선'],
          userCount: 2,
        },
        {
          time: '2024-07-06T19:30',
          users: ['김수현', '경효선', '김유희'],
          userCount: 3,
        },
        {
          time: '2024-07-06T21:00',
          users: ['류지민', '김민우', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-06T22:00',
          users: ['류지민', '고세종', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-07T08:00',
          users: ['김민우', '김수현'],
          userCount: 2,
        },
        {
          time: '2024-07-07T09:30',
          users: ['채림', '오영'],
          userCount: 2,
        },
        {
          time: '2024-07-07T10:30',
          users: ['경효선', '김유희', '류지민'],
          userCount: 3,
        },
        {
          time: '2024-07-07T12:00',
          users: ['구예진', '고세종', '김수현'],
          userCount: 3,
        },
        {
          time: '2024-07-07T14:00',
          users: ['오영', '구예진', '채림'],
          userCount: 3,
        },
        {
          time: '2024-07-07T15:30',
          users: ['김유희', '김민우'],
          userCount: 2,
        },
        {
          time: '2024-07-07T17:00',
          users: ['김수현', '경효선', '김유희'],
          userCount: 3,
        },
        {
          time: '2024-07-07T18:00',
          users: ['김수현', '경효선', '김민우', '고세종'],
          userCount: 4,
        },
        {
          time: '2024-07-07T19:30',
          users: ['류지민', '구예진', '김유희'],
          userCount: 3,
        },
        {
          time: '2024-07-07T21:30',
          users: ['류지민', '김유희', '구예진'],
          userCount: 3,
        },
        {
          time: '2024-07-07T22:00',
          users: ['김수현', '채림', '오영'],
          userCount: 3,
        },
      ],

      participatedUsers: {
        names: ['오영', '구예진', '고세종', '류지민', '김유희', '김수현'],
        count: 8,
      },
    });
  }),
];

export default handlers;
