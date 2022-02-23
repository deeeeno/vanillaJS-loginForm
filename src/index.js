// TODO: 이 곳에 정답 코드를 작성해주세요.
class Login {
    formEl
    idEl
    idMsgEl
    pwEl
    pwMsgEl
    pwdChkEl
    pwdChkMsgEl
    submitEl
    modelEl
    confirmIdEl
    confirmPwEl
    fontControlBoxEl
    increaseFontBtnEl
    decreaseFontBtnEl
    ERROR_MESSAGE_CLASS = 'border-red-600'
    FONT_SIZE = 16
    constructor() {
        this.assignElement()
        this.addEvent()
    }

    assignElement() {
        this.formEl = document.getElementById('form')
        this.modalEl = document.getElementById('modal')
        this.fontControlBoxEl = document.getElementById('font-control-box')
        this.idEl = this.formEl.querySelector('#id')
        this.idMsgEl = this.formEl.querySelector('#id-msg')
        this.pwEl = this.formEl.querySelector('#pw')
        this.pwMsgEl = this.formEl.querySelector('#pw-msg')
        this.pwdChkEl = this.formEl.querySelector('#pw-check')
        this.pwdChkMsgEl = this.formEl.querySelector('#pw-check-msg')
        this.submitEl = this.formEl.querySelector('#submit')
        this.confirmIdEl = this.modalEl.querySelector('#confirm-id')
        this.confirmPwEl = this.modalEl.querySelector('#confirm-pw')
        this.cancelBtnEl = this.modalEl.querySelector('#cancel-btn')
        this.approveBtnEl = this.modalEl.querySelector('#approve-btn')
        this.increaseFontBtnEl =
            this.fontControlBoxEl.querySelector('#increase-font-btn')
        this.decreaseFontBtnEl =
            this.fontControlBoxEl.querySelector('#decrease-font-btn')
    }

    addEvent() {
        this.formEl.addEventListener('submit', this.onSubmit.bind(this))
        this.idEl.addEventListener('focus', this.onIdFocus.bind(this))
        this.idEl.addEventListener('focusout', this.onIdFocusOut.bind(this))
        this.pwEl.addEventListener('focus', this.onPwdFocus.bind(this))
        this.pwEl.addEventListener('focusout', this.onPwdFocusOut.bind(this))
        this.pwdChkEl.addEventListener('focus', this.onPwdChkFocus.bind(this))
        this.pwdChkEl.addEventListener(
            'focusout',
            this.onPwdChkFocusOut.bind(this)
        )
        this.cancelBtnEl.addEventListener(
            'click',
            this.onClickCancelBtn.bind(this)
        )
        this.approveBtnEl.addEventListener(
            'click',
            this.onClickApproveBtn.bind(this)
        )
        this.increaseFontBtnEl.addEventListener(
            'click',
            this.onClickIncreaseBtn.bind(this)
        )
        this.decreaseFontBtnEl.addEventListener(
            'click',
            this.onClickDecreaseBtn.bind(this)
        )
    }
    onSubmit(e) {
        e.preventDefault()
        const id = this.idEl.value
        const pwd = this.pwEl.value
        const pwdChk = this.pwdChkEl.value

        const idErrno = this.idValidator(id)
        const pwdErrno = this.pwdValidator(pwd)
        const pwdChkErrno = this.pwdChkValidator(pwd, pwdChk)

        if (idErrno + pwdErrno + pwdChkErrno === 0) {
            this.setModalInfo(id, pwd)
        } else {
            this.setIdMsg(idErrno)
            this.setPwMsg(pwdErrno)
            this.setPwChkMsg(pwdChkErrno)
        }
    }

    setModalInfo(id, pwd) {
        this.confirmIdEl.innerText = id
        this.confirmPwEl.innerText = pwd
        this.modalEl.showModal()
    }
    onClickCancelBtn(e) {
        this.modalEl.close()
    }
    onClickApproveBtn(e) {
        alert('가입되었습니다 🥳')
        this.modalEl.close()
    }
    setHtmlFont() {
        document.querySelector('html').style.fontSize = `${this.FONT_SIZE}px`
    }
    onClickIncreaseBtn(e) {
        this.FONT_SIZE += 1
        this.setHtmlFont()
        this.increaseFontBtnEl.disabled = this.FONT_SIZE === 20
        this.decreaseFontBtnEl.disabled = this.FONT_SIZE === 12
    }
    onClickDecreaseBtn(e) {
        this.FONT_SIZE -= 1
        this.setHtmlFont()
        this.increaseFontBtnEl.disabled = this.FONT_SIZE === 20
        this.decreaseFontBtnEl.disabled = this.FONT_SIZE === 12
    }
    setIdMsg(errno) {
        this.idMsgEl.innerText = this.idErrorMessage(errno)
        this.idEl.classList.toggle(this.ERROR_MESSAGE_CLASS, errno != 0)
    }
    setPwMsg(errno) {
        this.pwMsgEl.innerText = this.pwdErrorMessage(errno)
        this.pwEl.classList.toggle(this.ERROR_MESSAGE_CLASS, errno != 0)
    }
    setPwChkMsg(errno) {
        this.pwdChkMsgEl.innerText = this.pwdChkErrorMessage(errno)
        this.pwdChkEl.classList.toggle(this.ERROR_MESSAGE_CLASS, errno != 0)
    }
    /* id focus, focusout event handler*/
    onIdFocus(e) {
        this.idMsgEl.innerText = ''
        this.idEl.classList.remove(this.ERROR_MESSAGE_CLASS)
    }
    onIdFocusOut(e) {
        const writtenId = this.idEl.value
        const idErrno = this.idValidator(writtenId)
        this.setIdMsg(idErrno)
    }
    /* password focus, focusout event handler*/
    onPwdFocus(e) {
        this.pwEl.classList.remove(this.ERROR_MESSAGE_CLASS)
        this.pwMsgEl.innerText = ''
    }
    onPwdFocusOut(e) {
        const writtenPwd = this.pwEl.value
        const pwErrno = this.pwdValidator(writtenPwd)
        this.setPwMsg(pwErrno)
    }
    /* pwdChk focus, focusout event handler*/
    onPwdChkFocus(e) {
        this.pwdChkEl.classList.remove(this.ERROR_MESSAGE_CLASS)
        this.pwdChkMsgEl.innerText = ''
    }
    onPwdChkFocusOut(e) {
        const writtenPwdChk = this.pwdChkEl.value
        const writtenPwd = this.pwEl.value
        const pwChkErrno = this.pwdChkValidator(writtenPwd, writtenPwdChk)
        this.setPwChkMsg(pwChkErrno)
    }
    /*
    ID: 5~20자. 영문 소문자, 숫자. 특수기호(_),(-)만 사용 가능
    비밀번호: 8~16자. 영문 대/소문자, 숫자 사용 가능
    비밀번호 확인: 비밀번호와 일치
    */
    idValidator(id) {
        if (id.length === 0) return 1
        if (id.length < 5 || id.length > 20) return 2
        const wrong_word = id.match(/[^A-Za-z0-9_-]/g)
        if (wrong_word != null) return 2
        return 0
    }
    pwdValidator(password) {
        if (password.length === 0) return 1
        if (password.length < 8 || password.length > 16) return 2
        const wrong_word = password.match(/[^A-Za-z0-9]/g)
        if (wrong_word != null) return 2
        return 0
    }
    pwdChkValidator(password, check) {
        if (check.length === 0) return 1
        return password === check ? 0 : 2
    }
    /*
    (공통) 빈 값일 경우: 필수 정보입니다.
    [ID] 유효하지 않은 값일 경우: “5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.”
    [비밀번호] 유효하지 않은 값일 경우: “8~16자 영문 대 소문자, 숫자를 사용하세요.”
    [비밀번호 확인] 유효하지 않은 값일 경우: “비밀번호가 일치하지 않습니다.”
    */
    idErrorMessage(errno) {
        const errorMessages = [
            '',
            '필수 정보입니다.',
            '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
        ]
        return errorMessages[errno]
    }
    pwdErrorMessage(errno) {
        const errorMessages = [
            '',
            '필수 정보입니다.',
            '8~16자 영문 대 소문자, 숫자를 사용하세요.',
        ]
        return errorMessages[errno]
    }
    pwdChkErrorMessage(errno) {
        const errorMessages = [
            '',
            '필수 정보입니다.',
            '비밀번호가 일치하지 않습니다.',
        ]
        return errorMessages[errno]
    }
}

new Login()
