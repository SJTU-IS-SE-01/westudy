class Header {
  build() {
    const { $ } = window;
    const header = $('#header');
    if (header.length === 0) return;
    $.get('/header.html', (data) => {
      header.html(data);
      header.trigger('build');
    });
    header.bind('build', this.update.bind(this));
  }

  update() {
    const { $ } = window;
    $('#login').click((e) => {
      e.preventDefault();
      window.location.href = '/login.html';
    });
    $('#signup').click((e) => {
      e.preventDefault();
      window.location.href = '/signup.html';
    });
    $.get('/users/getEmail', (data) => {
      console.log(data);
      if (data.status === 0) {
        $('#login').hide();
        $('#signup').hide();
        const { email } = data.results;
        $.get(`/api/students/query?email=${email}`, (data2) => {
          $('#users-email').html(`欢迎您，<a href="/personal.html">${data2.results[0].Name}</a>！`);
        });
      }
    });
  }
}

window.$(document).ready(() => {
  const header = new Header();
  header.build();
});
