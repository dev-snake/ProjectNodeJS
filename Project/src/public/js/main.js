const iconUser = document.getElementById("icon-user");
const boxAuth = document.getElementById("box-auth");
const addCart = document.getElementById("addCart");
const notifi = document.getElementById("notifi");
const btnSearch = document.querySelector('.bx-search');
const searchInput = document.querySelector('.search-box');
const menu = document.querySelector('.bx-menu');
const navbar = document.querySelector('.navbar');
menu.onclick = () => {
	navbar.classList.toggle('active');
}
const displayAuth = () => {
	boxAuth.classList.toggle("active");
	searchInput.classList.remove("active");
};
btnSearch.onclick = () => {
	searchInput.classList.toggle('active');
	boxAuth.classList.remove('active');
};
iconUser?.addEventListener("click", displayAuth);
if (addCart !== null) {
	addCart.addEventListener("click", () => {
		const valueInput = document.getElementById("valueInput").value;
		if (Number(valueInput) <= 0) {
			const waringMsg = document.createElement("div");
			waringMsg.classList.add("warningMiximum");
			waringMsg.innerHTML =
				"<i class='fa-solid fa-circle-exclamation'></i> Tối thiểu một sản phẩm";
			notifi.appendChild(waringMsg);
			setTimeout(() => {
				waringMsg.remove();
			}, 2000);
		}
	});
}
const apiDistrict = async () => {
	const res = await fetch(
		"https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
	);
	const data = await res.json();
	const city = document.getElementById("city");
	const district = document.getElementById("district");
	data.forEach((cityList) => {
		const { Name } = cityList;
		if (city !== null && district !== null) {
			city.innerHTML += `<option value="${Name}">${Name}</option>`;
			cityList.Districts.forEach((inforDistrict) => {
				const { Name } = inforDistrict;
				district.innerHTML += `<option value="${Name}">${Name}</option>`;
			});
		}
	});
};
apiDistrict();

let show_eye = document.querySelector(".fa-eye");
let show_eye_slash = document.getElementById("fa-eye-slash");
let passwordInput = document.getElementById("password-input");
show_eye?.addEventListener("click", () => {
	if (passwordInput.type === "password") {
		show_eye.style.display = "none";
		show_eye_slash.style.display = "block";
		passwordInput.type = "text";
	}
});
show_eye_slash?.addEventListener("click", () => {
	if (passwordInput.type === "text") {
		show_eye.style.display = "block";
		show_eye_slash.style.display = "none";
		passwordInput.type = "password";
	}
});

const copyBtn = document.querySelectorAll(".btn-copy");
copyBtn.forEach((item) => {
	item?.addEventListener("click", () => {
		const inputValue = document.querySelector(".voucherInput").value;
		navigator.clipboard
			.writeText(inputValue)
			.then(() => {
				console.log("Copy to clipboard was successful!");
			})
			.catch((err) => {
				console.log(err);
			});
	});
});
//

const myPlot = document.getElementById("myPlot");
const xArray = [];
const yArray = [];
fetch("http://localhost:3000/api/getProductSoldList")
	.then(res => res.json())
	.then(data => {
		data.forEach(item => {
			xArray.push(item.name);
			yArray.push(item.number_of_orders);
		});
		const plotData = [
			{
				x: xArray,
				y: yArray,
				type: "bar",
				orientation: "v",
				marker: { color: "#474F7A" }
			}
		];
		const layout = { title: "Thống kê số lượng sản phẩm đã bán" };
		Plotly.newPlot(myPlot, plotData, layout);
	})
	.catch(err => console.log(err));

if (myPlot) {
	Plotly.newPlot("myPlot");
	google.charts.load("current", { packages: ["corechart"] });
	google.charts.setOnLoadCallback(() => {
		Promise.all([
			fetch("http://localhost:3000/lab/cate/1").then((res) => res.json()),
			fetch("http://localhost:3000/lab/cate/2").then((res) => res.json()),
			fetch("http://localhost:3000/lab/cate/3").then((res) => res.json()),
			fetch("http://localhost:3000/lab/cate/4").then((res) => res.json())
		])
			.then(([data1, data2, data3, data4]) => {
				const cate1 = data1.length;
				const cate2 = data2.length;
				const cate3 = data3.length;
				const cate4 = data4.length;
				drawChart(cate1, cate2, cate3, cate4);
			})
			.catch((err) => console.log(err));
	});

	function drawChart(cate1, cate2, cate3, cate4) {
		const data = google.visualization.arrayToDataTable([
			["Tai nghe", "Mhl"],
			["Tai nghe không dây", cate3],
			["Tai nghe thể thao", cate2],
			["Tai nghe có dây", cate4],
			["Tai nghe thông minh", cate1]
		]);
		const options = {
			title: "Thông tin tai nghe",
			is3D: true
		};
		const chart = new google.visualization.PieChart(document.getElementById("myChart"));
		chart.draw(data, options);
	}
}
