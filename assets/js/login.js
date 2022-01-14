"use strict";
function displayLoginPage() {
	const loginTemplate = `
    <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <!-- Modal Content here -->
                    <div class="container-fluid">
                        <div class="row main-content text-center">
                            <div class="col-md-4 text-center company_info">
                                <span class="company_logo"
                                    ><img
                                        src="./assets/images/eduquiz-icon.png"
                                /></span>
                                <h4 class="company_title">Edu Quiz CBT</h4>
                            </div>
                            <div
                                class="
                                    col-md-8 col-xs-12 col-sm-12
                                    login_form
                                "
                            >
                                <div class="container-fluid">
                                    <div class="row">
                                        <h3 id="signupLoginTitle">
                                            Log In
                                        </h3>
                                    </div>
                                    <div class="row">
                                        <form control="" class="form-group">
                                            <div class="row">
                                                <input
                                                    required
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    class="form_input"
                                                    placeholder="Username"
                                                />
                                            </div>
                                            <div class="row">
                                                <input
                                                    required
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    class="form_input"
                                                    placeholder="Password"
                                                />
                                            </div>
                                            <div class="row confirmPassword">
                                                <input
                                                    required
                                                    type="password"
                                                    name="confirmPassword"
                                                    id="confirmPassword"
                                                    class="form_input"
                                                    placeholder="Confirm Password"
                                                />
                                            </div>
                                            <div class="row">
                                                <input
                                                    id="signupLoginBtn"
                                                    type="button"
                                                    value="Login"
                                                    class="btn modalBtn"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Modal Content Ends Here -->
                </div>
            </div>
        </div>
    </div>`;
	document.getElementById("loginDiv").innerHTML = loginTemplate;
}
