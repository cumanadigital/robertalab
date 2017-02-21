define([ 'exports', 'log', 'message', 'util', 'group.model', 'guiState.controller', 'jquery', 'blocks', 'blocks-msg' ], function(exports, LOG, MSG, UTIL, GROUP,
        GUISTATE_C, $, Blockly) {

    var $divForms;
    var $formLogin;
    var $formLost;
    var $formRegister;
    //var $formGroupPasswordChange;
    var $formSingleModal;
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 2000;

    /**
     * Create new group
     */
    function createUserToServer() {
        $formRegister.validate();
        if ($formRegister.valid()) {
            USER.createUserToServer($("#registerAccountName").val(), function(result) {
                if (result.rc === "ok") {
                    $("#registerGroupName").val();
                    //$('#loginPassword').val($('#registerPass').val());
                }
                MSG.displayInformation(result, "", result.message);
            });
        }
    }

    /**
     * Update group
     */
    function updateGroupToServer() {
        $formRegister.validate();
        if ($formRegister.valid()) {
            GROUP.updateGroupToServer(GUISTATE_C.getUserAccountName(), $('#registerGrouoName').val(), function(result) {
                if (result.rc === "ok") {
                	GROUP.getUserFromServer(GUISTATE_C.getUserAccountName(), function(result) {
                        if (result.rc === "ok") {
                            GUISTATE_C.setLogin(result);
                        }
                    });
                }
                MSG.displayInformation(result, "", result.message);
            });
        }
    }

    /**
     * Update Group Password
     
    function updateUserPasswordOnServer() {
        restPasswordLink = $("#resetPassLink").val()
        $formUserPasswordChange.validate();
        if ($formUserPasswordChange.valid()) {
            if (restPasswordLink) {
                USER.resetPasswordToServer(restPasswordLink, $("#passNew").val(), function(result) {
                    if (result.rc === "ok") {
                        $("#change-user-password").modal('hide');
                        $("#resetPassLink").val(undefined);
                        // not to close the startup popup, if it is open
                        MSG.displayMessage(result.message, "TOAST", "");
                    } else {
                        MSG.displayInformation(result, "", result.message);
                    }
                });
            } else {
                USER.updateUserPasswordToServer(GUISTATE_C.getUserAccountName(), $('#passOld').val(), $("#passNew").val(), function(result) {
                    if (result.rc === "ok") {
                        $("#change-user-password").modal('hide');
                    }
                    MSG.displayInformation(result, "", result.message);
                });
            }

        }
    }*/

    /**
     * Get group from server
     */
    function getUserFromServer() {
        GROUP.getUserFromServer(GUISTATE_C.getGroupName(), function(result) {
            if (result.rc === "ok") {
                $("#registerGroupName").val(result.userAccountName);s
            }
        });
    }

   

    /**
     * Update user password
     
    function userPasswordRecovery() {
        $formLost.validate();
        if ($formLost.valid()) {
            USER.userPasswordRecovery($('#lost_email').val(), GUISTATE_C.getLanguage(), function(result) {
                MSG.displayInformation(result, result.message, result.message);
            });
        }
    }*/

    /**
     * Delete group on server
     */
    function deleteGroupOnServer() {
        $formSingleModal.validate();
        if ($formSingleModal.valid()) {
            GROUP.deleteGroupOnServer(GUISTATE_C.getGroupName(), $('#singleModalInput').val(), function(result) {
                if (result.rc === "ok") {
                    logout();
                }
                MSG.displayInformation(result, "MESSAGE_GROUPs_DELETED", result.message, GUISTATE_C.getGroupName());
            });
        }
    }


    function validateRegisterGroup() {
        $formRegister.removeData('validator');
        $.validator.addMethod("loginRegex", function(value, element) {
            return this.optional(element) || /^[a-z0-9\-\s]+$/i.test(value);
        }, "Group name must contain only letters, numbers, or dashes.");
        $formRegister.validate({
            rules : {
                registerAccountName : {
                    required : true,
                    maxlength : 15,
                    loginRegex : true
                },
                /*registerPass : {
                    required : true,
                    minlength : 6
                },
                registerPassConfirm : {
                    required : true,
                    equalTo : "#registerPass"
                },*/

            },
            errorClass : "form-invalid",
            errorPlacement : function(label, element) {
                label.insertAfter(element);
            },
            messages : {
                registerAccountName : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"],
                    maxlength : Blockly.Msg["ORA_GROUP_CREATE_ERROR_CONTAINS_SPECIAL_CHARACTERS"],
                    loginRegex : Blockly.Msg["ORA_GROUP_CREATE_ERROR_CONTAINS_SPECIAL_CHARACTERS"]
                }
                /*registerPass : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"],
                    minlength : Blockly.Msg["VALIDATION_PASSWORD_MIN_LENGTH"]
                },
                registerPassConfirm : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"],
                    equalTo : Blockly.Msg["SECOND_PASSWORD_EQUAL"]
                }*/

            }
        });
    }

    /*function validateUserPasswordChange() {
        $formUserPasswordChange.removeData('validator');
        $formUserPasswordChange.validate({
            rules : {
                passOld : "required",
                passNew : {
                    required : true,
                    minlength : 6
                },
                passNewRepeat : {
                    required : true,
                    equalTo : "#passNew"
                },
            },
            errorClass : "form-invalid",
            errorPlacement : function(label, element) {
                label.insertAfter(element);
            },
            messages : {
                passOld : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"]
                },
                passNew : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"],
                    minlength : Blockly.Msg["VALIDATION_PASSWORD_MIN_LENGTH"]
                },
                passNewRepeat : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"],
                    equalTo : Blockly.Msg["VALIDATION_SECOND_PASSWORD_EQUAL"]
                }
            }
        });
    }

    function validateLostPassword() {
        $formLost.removeData('validator');
        $formLost.validate({
            rules : {
                lost_email : {
                    required : true,
                    email : true
                }
            },
            errorClass : "form-invalid",
            errorPlacement : function(label, element) {
                label.insertAfter(element);
            },
            messages : {
                lost_email : {
                    required : Blockly.Msg["VALIDATION_FIELD_REQUIRED"],
                    email : Blockly.Msg["VALID_EMAIL_ADDRESS"]
                }
            }
        });
    }*/

    //Animate between forms in login modal
    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function() {
            $divForms.animate({
                height : $newH
            }, $modalAnimateTime, function() {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function() {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    //header change of the modal login
    function hederChange($oldHeder, $newHeder) {
        $oldHeder.addClass('hidden');
        $newHeder.removeClass('hidden');
    }

    /**
     * Resets the validation of every form in login modal
     * 
     */
    function resetForm() {
        $formLogin.validate().resetForm();
        $formLost.validate().resetForm();
        $formRegister.validate().resetForm();
    }

    /**
     * Clear input fields in login modal
     */
    function clearInputs() {
        $divForms.find('input').val('');
    }

    function initGroupCreationForm() {
        $formRegister.unbind('submit');
        $formRegister.onWrap('submit', function(e) {
            e.preventDefault();
            createUserToServer();
        });
        $("#registerGroup").text(Blockly.Msg["POPUP_REGISTER_GROUP"]);
        $("#registerGrouptName").prop("disabled", false);
        //$("#fgRegisterPass").show()
        //$("#fgRegisterPassConfirm").show()
        //$("#showChangeUserPassword").addClass('hidden');
        $("#register_login_btn").show()
        $formLogin.hide()
        $formRegister.show();
        $('#div-login-forms').css('height', 'auto');
    }

    function initLoginModal() {
        $('#login-user').onWrap('hidden.bs.modal', function() {
            initRegisterForm();
            resetForm();
            clearInputs();
        });

        $formLost.onWrap('submit', function(e) {
            e.preventDefault();
            userPasswordRecovery();
        });
        $formLogin.onWrap('submit', function(e) {
            e.preventDefault();
            login();
        });
        $formRegister.onWrap('submit', function(e) {
            e.preventDefault();
            createUserToServer();
        });

        // Login form change between sub-form
        $('#login_register_btn').onWrap('click', function() {
            hederChange($h3Login, $h3Register)
            modalAnimate($formLogin, $formRegister)
            UTIL.setFocusOnElement($('#registerAccountName'));
        });
        $('#register_login_btn').onWrap('click', function() {
            hederChange($h3Register, $h3Login)
            modalAnimate($formRegister, $formLogin);
            UTIL.setFocusOnElement($('#loginAccountName'));
        });
        $('#login_lost_btn').onWrap('click', function() {
            hederChange($h3Login, $h3Lost)
            modalAnimate($formLogin, $formLost);
            UTIL.setFocusOnElement($('#lost_email'));
        });
        $('#lost_login_btn').onWrap('click', function() {
            hederChange($h3Lost, $h3Login);
            modalAnimate($formLost, $formLogin)
            UTIL.setFocusOnElement($('#loginAccountName'));
        });
        $('#lost_register_btn').onWrap('click', function() {
            hederChange($h3Lost, $h3Register)
            modalAnimate($formLost, $formRegister);
            UTIL.setFocusOnElement($('#registerAccountName'));
        });
        $('#register_lost_btn').onWrap('click', function() {
            hederChange($h3Register, $h3Lost)
            modalAnimate($formRegister, $formLost);
            UTIL.setFocusOnElement($('#lost_email'));
        });

        validateLoginUser();
        validateRegisterUser();
        validateLostPassword();
    }

    function initUserPasswordChangeModal() {
        $formUserPasswordChange.onWrap('submit', function(e) {
            e.preventDefault();
            updateUserPasswordOnServer();
        });

        $('#showChangeUserPassword').onWrap('click', function() {
            $('#change-user-password').modal('show');
        });

        $('#change-user-password').onWrap('hidden.bs.modal', function() {
            $formUserPasswordChange.validate().resetForm();
            $('#grOldPassword').show();
            $('#passOld').val('');
            $('#passNew').val('');
            $('#passNewRepeat').val('');
        });

        validateUserPasswordChange();
    }

    /**
     * Initialize the login modal
     */
    function init() {
        var ready = $.Deferred();
        $.when(USER.clear(function(result) {
            UTIL.response(result);
        })).then(function() {
            $divForms = $('#div-login-forms');
            $formLogin = $('#login-form');
            $formLost = $('#lost-form');
            $formRegister = $('#register-form');
            $formUserPasswordChange = $('#change-user-password-form');
            $formSingleModal = $('#single-modal-form');

            $h3Login = $('#loginLabel');
            $h3Register = $('#registerInfoLabel');
            $h3Lost = $('#forgotPasswordLabel');

            $('#iconDisplayLogin').onWrap('click', function() {
                showUserInfo();
            }, 'icon user click');

            initLoginModal();
            initUserPasswordChangeModal();
            LOG.info('init user forms');
            ready.resolve();
        });
        return ready.promise();
    }
    exports.init = init;

    function showUserDataForm() {
        getUserFromServer();
        $formRegister.unbind('submit');
        $formRegister.onWrap('submit', function(e) {
            e.preventDefault();
            updateUserToServer();
        });
        $("#registerUser").text("OK");
        $("#registerAccountName").prop("disabled", true);
        $("#userInfoLabel").removeClass('hidden');
        $("#loginLabel").addClass('hidden');
        $("#registerInfoLabel").addClass('hidden');
        $("#forgotPasswordLabel").addClass('hidden');
        $("#fgRegisterPass").hide()
        $("#fgRegisterPassConfirm").hide()
        $("#register_login_btn").hide()
        $("#showChangeUserPassword").removeClass('hidden');
        $("#register_lost_btn").hide()
        $formLogin.hide()
        $formRegister.show();
        $('#div-login-forms').css('height', 'auto');
        $("#login-user").modal('show');
    }
    exports.showUserDataForm = showUserDataForm;

    function showLoginForm() {
        $("#userInfoLabel").addClass('hidden');
        $("#registerInfoLabel").addClass('hidden');
        $("#forgotPasswordLabel").addClass('hidden');
        $formLogin.show()
        $formLost.hide();
        $formRegister.hide();
        $("#login-user").modal('show');
    }
    exports.showLoginForm = showLoginForm;

    function showDeleteUserModal() {
        UTIL.showSingleModal(function() {
            $('#singleModalInput').attr('type', 'password');
            $('#single-modal h3').text(Blockly.Msg["MENU_DELETE_USER"]);
            $('#single-modal label').text(Blockly.Msg["POPUP_PASSWORD"]);
            $('#single-modal span').removeClass('typcn-pencil');
            $('#single-modal span').addClass('typcn-lock-closed');
        }, deleteUserOnServer, function() {
            $('#single-modal span').addClass('typcn-pencil');
            $('#single-modal span').removeClass('typcn-lock-closed');
        }, {
            rules : {
                singleModalInput : {
                    required : true
                }
            },
            errorClass : "form-invalid",
            errorPlacement : function(label, element) {
                label.insertAfter(element);
            },
            messages : {
                singleModalInput : {
                    required : jQuery.validator.format(Blockly.Msg["VALIDATION_FIELD_REQUIRED"])
                }
            }
        });
    }
    exports.showDeleteUserModal = showDeleteUserModal;

    /**
     * Show user info
     */
    function showUserInfo() {
        $("#loggedIn").text(GUISTATE_C.getUserAccountName());
        if (GUISTATE_C.isUserLoggedIn()) {
            $("#popup_username").text(Blockly.Msg["POPUP_USERNAME"] + ": ");
        } else {
            $("#popup_username").text(Blockly.Msg["POPUP_USERNAME_LOGOFF"]);
        }
        $("#programName").text(GUISTATE_C.getProgramName());
        $("#configurationName").text(GUISTATE_C.getConfigurationName());
        if (GUISTATE_C.getProgramToolboxLevel() === 'beginner') {
            $("#toolbox").text(Blockly.Msg["MENU_BEGINNER"]);
        } else {
            $("#toolbox").text(Blockly.Msg["MENU_EXPERT"]);
        }
        $("#show-state-info").modal("show");
    }
    exports.showUserInfo = showUserInfo;

    function showResetPassword(target) {
        USER.checkTargetRecovery(target, function(result) {
            if (result.rc !== 'ok') {
                $('#passOld').val(target);
                $('#resetPassLink').val(target);
                $('#grOldPassword').hide();
                $('#change-user-password').modal('show');
            } else {
                result.rc = 'error'
                MSG.displayInformation(result, "", result.message);
            }
        });
    }
    exports.showResetPassword = showResetPassword;

    function initValidationMessages() {
        validateLoginUser();
        validateRegisterUser();
        validateLostPassword();
    }
    exports.initValidationMessages = initValidationMessages;
});
