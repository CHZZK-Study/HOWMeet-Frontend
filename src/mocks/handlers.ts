import { LoginReq } from '@/models/user.model';
import { http, HttpResponse, PathParams } from 'msw';
import { selectedTimeData } from './data/selectedTimeData';
import { TimeTableServerInfo } from './data/timeTableData';

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
    return HttpResponse.json(selectedTimeData);
  }),
  http.get('/guest-schedule/:id', () => {
    return HttpResponse.json(TimeTableServerInfo);
  }),
  http.get('/member-schedule/:id', () => {
    return HttpResponse.json(TimeTableServerInfo);
  }),
];

export default handlers;
