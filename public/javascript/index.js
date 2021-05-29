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
        $('#users-email').text(data.results.email);
      }
    });
  }
}

window.$(document).ready(() => {
  const header = new Header();
  header.build();
});
