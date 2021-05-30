const { $ } = window;

$(document).ready(() => {
  const n = new Date();
  console.log(n.getHours());
  if (n.getHours() < 21) {
    for (let k = n.getHours() + 1; k < 22; k += 1) {
      if (k < 8) break;
      $('#begin').html((x, origText) => `${origText}<option>${k}:00</option>`);
      $('#end').html((x, origText) => `${origText}<option>${k}:59</option>`);
    }
  } else {
    for (let k = 8; k < 22; k += 1) {
      $('#begin').html((x, origText) => `${origText}<option value='${k}:00'>次日${k}:00</option>`);
      $('#end').html((x, origText) => `${origText}<option value='${k + 1}:00'>次日${k}:59</option>`);
    }
    n.setDate(n.getDate() + 1);
  }

  $('#button-search').click(() => {
    const area = $('#area').val();
    const floor = $('#floor').val();
    $('#table-header').html('<tr><td>座位号</td><td>/</td><td>已占用时间</td></tr>');
    $.get(`/api/seats/query?Area=${area}&Floor=${floor}`, (data) => {
      console.log(data);

      if (data.results.length) {
        $('#Snumber').html('');
        $('#seats').html('');
        for (let i = 0; i < data.results.length; i += 1) {
          const snumber = data.results[i].Snum;
          $.get(`/api/students/seatsapt?Snum=${snumber}`, (data_c) => {
            console.log(data_c);
            let str = `${$('#seats').html()}<tr><td>${data.results[i].Snum}</td><td>/</td>`;
            $('#Snumber').html((x, origText) => `${origText}<option>${data.results[i].Snum}</option>`);
            for (let j = 0; j < data_c.results.length; j += 1) {
              const b = data_c.results[j].Btime;
              if (parseInt(b.slice(0, 4)) * 10000 + parseInt(b.slice(5, 7)) * 100 + parseInt(b.slice(8, 10)) == 20210100 + n.getMonth() * 100 + parseInt(n.getDate())) {
                str += `<td>${data_c.results[j].Btime.slice(11, 16)}--${data_c.results[j].Etime.slice(11, 16)}</td>`;
              }
            }
            $('#seats').html(`${str}</tr>`);
          });
        }
      } else {
        $('#seats').html('该区域暂无可预约的座位！');
      }
    });
  });

  $('#button-search1').click(() => {
    const begin = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()} ${$('#begin').val()}:00`;
    const end = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()} ${$('#end').val()}:00`;
    $('#table-header').html('<tr><td>空闲座位号如下</td></tr>');
    $.get(`/api/timecheck/${begin}/${end}`, (dataA) => {
      console.log(dataA);

      if (dataA.results.length) {
        $('#Snumber').html('');
        $('#seats').html('');
        for (let i = 0; i < dataA.results.length; i += 1) {
          if (dataA.results[i].Snum != '001') {
            $('#seats').html((x, origText) => `${origText}<td>${dataA.results[i].Snum}</td>`);
            $('#Snumber').html((x, origText) => `${origText}<option>${dataA.results[i].Snum}</option>`);
          }
        }
      } else {
        $('#seats').html('该区域暂无可预约的座位！');
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
    const Btime = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()} ${$('#begin').val()}:00`;
    const Etime = `${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()} ${$('#end').val()}:00`;

    $.get(`/api/seatcheck/${num}/${Btime}/${Etime}`, (data0) => {
      console.log(data0);
      if (data0.results) {
        alert('当前时段已被占用！');
        return;
      }
      $.get('/users/getEmail', (data1) => {
        console.log(data1);
        const { email } = data1.results;
        if (email == undefined) {
          alert('请先登录！');
        } else {
          $.get(`/api/students/query?email=${email}`, (data2) => {
            console.log(data2);
            const obj = {
              Btime, Etime, Snum: num, Id: data2.results[0].Id,
            };
            console.log(obj);
            $.post('/api/students/addappointment', obj, (data3) => {
              console.log(data3);
              if (data3.status) {
                alert('预约失败');
              } else {
                alert('预约成功！请到“我的预约”界面查看您的预约状态！');
              }
            });
          });
        }
      });
    });
  });
});
