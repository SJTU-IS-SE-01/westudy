
$(document).ready(() => {
  const n = new Date();
  $('#button-search').click(() => {
    const area = $('#area').val();
    const floor = $('#floor').val();

    $.get(`/api/seats/query?Area=${area}&Floor=${floor}`, (data) => {
      console.log(data);

      if (data.results.length) {
        $('#Snumber').html('');
        $('#seats').html('');
        for (let i = 0; i < data.results.length; i++) {
          const snumber = data.results[i].Snum;
          $.get(`/api/students/seatsapt?Snum=${snumber}`, (data_c) => {
            console.log(data_c);
            $('#seats').html((x, origText) => `${origText}<tr><td>${data_c.results[i].Snum}号座位</td>`);
            $('#Snumber').html((x, origText) => `${origText}<option>${data_c.results[i].Snum}</option>`);
            for (let j = 0; j < data_c.results.length; j++) {
              $('#seats').html((x, origText) => `${origText}<td>${data_c.results[j].Btime.slice(11, 16)}--${data_c.results[j].Etime.slice(11, 16)}</td>`);
            }
            $('#seats').html((x, origText) => `${origText}</tr>`);
          });
        }
      } else {
        $('#seats').html('该区域暂未开放！');
      }
    });
  });

  $('#button-post').click(() => {
    const num = $('#Snumber').val();
    if (num == 0) {
      alert('请查询该区域的座位并选择座位号！');
      return 1;
    }
    if ($('#end').val() <= $('#begin').val()) {
      alert('请重新选择时间段！');
      return 1;
    }
    const Btime = `${n.getFullYear()}-${n.getMonth()}-${n.getDate()} ${$('#begin').val()}:00:00`;
    const Etime = `${n.getFullYear()}-${n.getMonth()}-${n.getDate()} ${$('#end').val()}:00:00`;
    
    $.get('/users/getEmail', (data1) => {
      console.log(data1);
      const { email } = data1.results;
      if (email == undefined) {
        alert('请先登录！');
      } else {
        $.get(`/api/students/query?email=${email}`, (data2) => {
          console.log(data2);
          var obj = {Btime:Btime,Etime:Etime,Snum:num,Id:data2.results[0].Id};
          console.log(obj)
          $.post(`/api/students/addappointment`, obj, (data3) => {
            console.log(data3);
            if (data3.status) {
              alert('预约失败');
            } else {
              alert('预约成功');
            }
          });
        });
      }
    });
  });
});
