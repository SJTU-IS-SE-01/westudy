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

  async function checkIn() {
    return 0;
  }

  async function checkOut() {
    return 1;
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
      status = '<p>预约结束</p>';
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
    if (nowIndex === 0)
      $("#prev").parent().addClass("disabled");
    else
      $("#prev").parent().removeClass("disabled");

    if (nowIndex === maxIndex)
      $("#next").parent().addClass("disabled");
    else
      $("#next").parent().removeClass("disabled");

    let l = nowIndex * 5;
    let r = l + 4;
    for (var i = 0; i < appointment.length; i += 1) {
      if (i >= l && i <= r) {
        $(`#appoint-${i}`).show();
      } else {
        $(`#appoint-${i}`).hide();
      }
    }
  }
  updatePage();
  $("#prev").click(e => {
    nowIndex = Math.max(0, nowIndex - 1);
    updatePage();
  });
  $("#next").click(e => {
    nowIndex = Math.min(maxIndex, nowIndex + 1);
    updatePage();
  });

  $('.appoint-button').click(async (e) => {
    const $this = $(e.target);
    const key = $this.attr('key');
    const text = $this.text();
    if (text === '签到') {
      const res = await checkIn();
      if (res === 0) {
        $this.text('签退');
      }
    } else if (text === '签退') {
      const res = await checkOut();
      if (res === 0) {

      }
    }
  });
}

window.$(document).ready(run);
