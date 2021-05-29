window.$(document).ready(() => {
  const {
    $,
  } = window;

  $('#signin').click(() => {
    $('#signin').html('>>>签退<<<');
  });

  $.get('/users/getEmail', (data1) => {
    console.log(data1);
    const { email } = data1.results;
    $.get(`/api/students/query?email=${email}`, (data2) => {
      console.log(data2);
      $('#name').html(data2.results[0].Name);
      $('#id').html(data2.results[0].Id);
      $('#time').html(data2.results[0].Time);
      $('#state').html(data2.results[0].State);
    });
  });
});
