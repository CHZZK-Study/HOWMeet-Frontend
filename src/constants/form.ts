const FORM = {
  nickname: {
    title: '닉네임',
    fieldName: 'nickname',
    regExp: /^[A-Za-z0-9_\-가-힣]{2,10}$/,
    message: '공백 없이 2~10자 이내, 한글, 영문, 숫자만 입력해 주세요.',
  },
  password: {
    title: '비밀번호',
    fieldName: 'password',
    regExp: /^[A-Za-z\d]{4,}$/,
    message: '최소 4자리 이상 영문, 숫자만 입력해 주세요.',
  },
};

export default FORM;
