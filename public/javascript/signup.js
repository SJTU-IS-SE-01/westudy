const { $ } = window;

function checkValid() {
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($('#inputEmail').val())) {
    alert('请输入正确的邮箱');
    return false;
  }
  return true;
}

$(document).ready(() => {
  $('#get-code').click(() => {
    if (!checkValid()) return;
    $.post('/users/code', { email: $('#inputEmail').val() }, (data) => {
      console.log(data);
      // alert('发送成功');
    });
  });
  $('#signup').click((e) => {
    e.preventDefault();
    const email = $('#inputEmail').val();
    const code = $('#inputCode').val();
    const Id = $('#inputSno').val();
    const Name = $('#inputName').val();
    const Major = $('#inputSdept').val();
    $.post('/users/signup', {
      email, code, Id, Name, Major,
    }, (data) => {
      if (data.status === 0) {
        window.location.href = '/';
      }
    });
  });
});
