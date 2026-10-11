window.AQ = window.AQ || {};

(function () {
  var U = AQ.util;
  var I = AQ.icons;

  function welcome() {
    return '<div class="screen welcome">' +
      '<div class="welcome-head">' +
      '<span class="logo logo-xl">' + I.logo(106) + '</span>' +
      '<h1>Aqua<span class="accent">Connect</span></h1>' +
      '<p class="tagline">Know. Plan. Report.</p>' +
      '</div>' +
      '<div class="welcome-art"><img src="assets/illustration.png" alt="City riverside illustration"></div>' +
      '<div class="welcome-foot">' +
      '<button class="btn btn-primary btn-block" data-action="go-login">Get Started</button>' +
      '<p class="muted">Already have an account? <a data-action="go-login">Log in</a></p>' +
      '</div>' +
      '</div>';
  }

  function login() {
    var S = AQ.state;
    var f = S.form.login;
    return '<div class="screen"><div class="auth">' +
      '<div class="auth-head">' +
      '<span class="logo logo-md">' + I.logo(62) + '</span>' +
      '<h1>Aqua<span class="accent">Connect</span></h1>' +
      '<h2>Log In</h2>' +
      '</div>' +
      '<form data-form="login" novalidate>' +
      '<div class="field"><label for="loginId">Email or Mobile Number</label>' +
      '<input id="loginId" class="input" name="identifier" placeholder="Enter your email or mobile number" autocomplete="username" value="' + U.esc(f.identifier) + '" data-model="form.login.identifier"></div>' +
      '<div class="field"><label for="loginPw">Password</label>' +
      '<div class="input-wrap">' +
      '<input id="loginPw" class="input" name="password" type="' + (S.passwordVisible ? 'text' : 'password') + '" placeholder="Enter your password" autocomplete="current-password" value="' + U.esc(f.password) + '" data-model="form.login.password">' +
      '<button type="button" class="input-eye" data-action="toggle-password" aria-label="Show or hide password">' + (S.passwordVisible ? I.eyeOff(20) : I.eye(20)) + '</button>' +
      '</div></div>' +
      (S.loginError ? '<p class="form-error">' + U.esc(S.loginError) + '</p>' : '') +
      '<button type="button" class="btn btn-primary btn-block" data-action="login"' + (S.loginBusy ? ' disabled' : '') + '>' + (S.loginBusy ? '<span class="spinner"></span>Logging in\u2026' : 'Log In') + '</button>' +
      '</form>' +
      '<a class="link-center" data-action="forgot">Forgot Password?</a>' +
      '<div class="divider">or</div>' +
      '<button class="btn btn-google btn-block" data-action="login-google">' + I.google() + ' Continue with Google</button>' +
      '<button class="btn btn-outline btn-block" data-action="go-signup">Create Account</button>' +
      '</div></div>';
  }

  function signup() {
    var S = AQ.state;
    var f = S.form.signup;
    return '<div class="screen">' +
      '<header class="topbar"><span class="tb-left"><button class="icon-btn" data-action="go-login" aria-label="Back">' + I.arrowLeft(22) + '</button></span><h2>Create Account</h2><span class="tb-right"></span></header>' +
      '<div class="auth">' +
      '<div class="auth-head"><h1>Join AquaConnect</h1><p class="tagline">Know. Plan. Report.</p></div>' +
      '<form data-form="signup" novalidate>' +
      '<div class="field"><label for="suName">Full Name</label>' +
      '<input id="suName" class="input" name="name" placeholder="Enter your full name" autocomplete="name" value="' + U.esc(f.name) + '" data-model="form.signup.name"></div>' +
      '<div class="field"><label for="suEmail">Email</label>' +
      '<input id="suEmail" class="input" name="email" type="email" placeholder="Enter your email" autocomplete="email" value="' + U.esc(f.email) + '" data-model="form.signup.email"></div>' +
      '<div class="field"><label for="suPw">Password</label>' +
      '<input id="suPw" class="input" name="password" type="password" placeholder="Create a password" autocomplete="new-password" value="' + U.esc(f.password) + '" data-model="form.signup.password"></div>' +
      (S.signupError ? '<p class="form-error">' + U.esc(S.signupError) + '</p>' : '') +
      '<button type="button" class="btn btn-primary btn-block" data-action="signup"' + (S.signupBusy ? ' disabled' : '') + '>' + (S.signupBusy ? '<span class="spinner"></span>Creating account\u2026' : 'Create Account') + '</button>' +
      '</form>' +
      '<p class="muted small" style="text-align:center;margin-top:14px;line-height:1.5">By creating an account you agree to the Terms of Service and Privacy Policy of BCWD AquaConnect.</p>' +
      '</div></div>';
  }

  AQ.screens = AQ.screens || {};
  AQ.screens.welcome = welcome;
  AQ.screens.login = login;
  AQ.screens.signup = signup;
})();
