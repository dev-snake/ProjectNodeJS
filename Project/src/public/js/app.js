let notifications = document.querySelector('.notifications');
const queryParams = new URLSearchParams(window.location.search);
const toastData = [
    { param: 'error', type: 'error', icon: 'fa-solid fa-circle-exclamation', title: 'Error', text: 'Error Failure ??' },
    { param: 'warning', type: 'warning', icon: 'fa-solid fa-triangle-exclamation', title: 'Waring', text: 'Waring Faild ??' },
    { param: 'success', type: 'success', icon: 'fa-solid fa-circle-check', title: 'Success', text: 'Successfully !' },
    { param: 'loginInfor', type: 'info', icon: 'fa-solid fa-circle-info', title: 'Info', text: 'Usernam or Password ??' },
    { param: 'loginError', type: 'error', icon: 'fa-solid fa-circle-exclamation', title: 'Error', text: 'Invalid Email or Password' },
    { param: 'loginSuccess', type: 'success', icon: 'fa-solid fa-circle-check', title: 'Success', text: 'Login Success' },
    { param: 'exchangeSuccess', type: 'success', icon: 'fa-solid fa-circle-check', title: 'Success', text: 'Exchange Success' },
    { param: 'isVoucherAlreadyExchanged', type: 'warning', icon: 'fa-solid fa-triangle-exclamation', title: 'Warn', text: 'Voucher already exchanged' },
    { param: 'isNotEnoughPoint', type: 'error', icon: 'fa-solid fa-circle-exclamation', title: 'Error', text: 'Not Enough Point' },
    { param: 'warn', type: 'warning', icon: 'fa-solid fa-triangle-exclamation', title: 'Warn', text: 'Enter your information' },
    { param: 'loginBlock', type: 'error', icon: 'fa-solid fa-circle-exclamation', title: 'Error', text: 'Account is blocked' },
    { param: 'updateProfileSuccess', type: 'success', icon: 'fa-solid fa-circle-check', title: 'Updated Success', text: 'Updated Profile Success' },
    { param: 'signupError', type: 'error', icon: 'fa-solid fa-circle-exclamation', title: 'Error', text: 'Signup Failed' },
    { param: 'signupWarn', type: 'warning', icon: 'fa-solid fa-triangle-exclamation', title: 'Waring', text: 'Password maximum length is 8 characters' },
    { param: 'dataExist', type: 'warning', icon: 'fa-solid fa-triangle-exclamation', title: 'Waring', text: 'Username or Email Exist' },

];

toastData.forEach(({ param, type, icon, title, text }) => {
    const paramValue = queryParams.get(param);
    if (paramValue) {
        createToast(type, icon, title, text);
    }
});

function createToast(type, icon, title, text) {
    let newToast = document.createElement('div');
    newToast.innerHTML = `
        <div class="toast ${type}">
            <i class="${icon}"></i>
            <div class="content">
                <div class="title">${title}</div>
                <span>${text}</span>
            </div>
            <i class="close fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
        </div>`;

    notifications.appendChild(newToast);
    newToast.timeOut = setTimeout(() => newToast.remove(), 3000)
}
const rank = document.querySelectorAll("#rank");
rank[0].innerHTML = `<i class='bx bx-trophy'></i>`

