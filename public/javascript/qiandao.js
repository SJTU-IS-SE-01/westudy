async function run() {
  const { $ } = window;
  async function getInfo() {
    return new Promise((resolve) => {
      $.get('/users/getInfo', (data) => {
        resolve(data.results[0]);
      });
    });
  }
  async function getAppointment(id) {
    return new Promise((resolve) => {
      $.get(`/api/students/seatsapt?Id=${id}`, (data) => {
        resolve(data.results);
      });
    });
  }

  async function getSeatInfo(snum) {
    return new Promise((resolve) => {
      $.get(`/api/seats/quary?Snum=${snum}`, (data) => {
        resolve(data.results[0]);
      });
    });
  }

  function handleDate(date) {
    let min = date.getMinutes().toString();
    if (min.length < 2) min = `0${min}`;
    return `${date.getHours()}:${min}`;
  }

  const info = await getInfo();
  const { Id } = info;
  const appointment = await getAppointment(Id);
  let tmpHtml = '';
  console.log(appointment);
  const seatsInfo = await Promise.all(appointment.map((x) => getSeatInfo(x.Snum)));
  for (let i = 0; i < appointment.length; i += 1) {
    const seatInfo = seatsInfo[i];
    appointment[i].seatInfo = seatInfo;
    const Btime = new Date(appointment[i].Btime);
    const Etime = new Date(appointment[i].Etime);
    let status = '';
    if (appointment[i].Seatcheck === 0) {
      status = `<button class="btn btn-sm btn-primary appoint-button" key="${i}">签到</button>`;
    } else if (appointment[i].Seatcheck === 1) {
      status = `<button class="btn btn-sm btn-primary appoint-button" key="${i}">签退</button>`;
    } else {
      status = '预约结束';
    }
    tmpHtml += `
<tr id="appoint-${i}">
  <th scope="row">${i + 1}</th>
  <td>${seatInfo.Floor}</td>
  <td>${seatInfo.Area}</td>
  <td>${seatInfo.Snum}</td>
  <td>${Btime.getFullYear()}-${Btime.getMonth() + 1}-${Btime.getDate()}</td>
  <td>${handleDate(Btime)} - ${handleDate(Etime)}</td>
  <td>${status}</td>
</tr>
`;
  }
  $('#tbody-content').html(tmpHtml);

  const maxIndex = Math.ceil(appointment.length / 5) - 1;
  let nowIndex = 0;

  function updatePage() {
    if (nowIndex === 0) $('#prev').parent().addClass('disabled');
    else $('#prev').parent().removeClass('disabled');

    if (nowIndex === maxIndex) $('#next').parent().addClass('disabled');
    else $('#next').parent().removeClass('disabled');

    const l = nowIndex * 5;
    const r = l + 4;
    for (let i = 0; i < appointment.length; i += 1) {
      if (i >= l && i <= r) {
        $(`#appoint-${i}`).show();
      } else {
        $(`#appoint-${i}`).hide();
      }
    }
  }
  updatePage();
  $('#prev').click((e) => {
    nowIndex = Math.max(0, nowIndex - 1);
    updatePage();
  });
  $('#next').click((e) => {
    nowIndex = Math.min(maxIndex, nowIndex + 1);
    updatePage();
  });

  async function updateGeolocation() {
    const { Geolocation } = window;
    $('#geo').text('获取中');
    $('.appoint-button').addClass('disabled');
    const geo = new Geolocation();
    const res = await geo.tryToGet();
    if (res === false) {
      $('#geo').text('无法获取');
      return;
    }
    if (geo.inLibrary()) {
      $('#geo').text('在图书馆');
      $('.appoint-button').removeClass('disabled');
    } else $('#geo').text('不在图书馆');
  }

  updateGeolocation();
  $('#regeo').click(updateGeolocation);

  async function checkIn(key) {
    const Num = appointment[key].Number;
    return new Promise((resolve) => {
      $.post('/api/checkin', { Number: Num }, (data) => {
        resolve(data.status);
      });
    });
  }

  async function checkOut(key) {
    const Num = appointment[key].Number;
    return new Promise((resolve) => {
      $.post('/api/checkout', { Number: Num }, (data) => {
        resolve(data.status);
      });
    });
  }

  $('.appoint-button').click(async (e) => {
    const $this = $(e.target);
    if ($this.hasClass('disabled'))
    {
      alert("请确认签到位置");
      return;
    }
    const key = $this.attr('key');
    const text = $this.text();
    if (text === '签到') {
      const res = await checkIn(key);
      if (res === 0) {
        $this.text('签退');
      }
    } else if (text === '签退') {
      const res = await checkOut(key);
      if (res === 0) {
        $this.parent().html('预约结束');
      }
    }
  });
}

window.$(document).ready(run);
