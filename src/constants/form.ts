const FORM = {
  nickname: {
    title: '닉네임',
    fieldName: 'nickname',
    regExp: /^[가-힣a-zA-Z0-9]{2,}$/,
    message: '공백 없이 2자 이상, 한글, 영문, 숫자만 입력해 주세요.',
  },
  password: {
    title: '비밀번호',
    fieldName: 'password',
    regExp: /^\d{4,}$/,
    message: '최소 4자리 이상 숫자를 입력해 주세요.',
  },
};

export default FORM;
