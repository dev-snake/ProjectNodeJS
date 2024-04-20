const iconUser = document.getElementById("icon-user");
const boxAuth = document.getElementById("box-auth");
const displayAuth = () => {
	boxAuth.classList.toggle("active");
};
iconUser.addEventListener("click", displayAuth);
