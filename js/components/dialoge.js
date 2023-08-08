let dialoge;

window.addEventListener('DOMContentLoaded', () => {
	dialoge = document.getElementsByClassName('dialoge')[0];
	dialoge.style.display = "grid";

	let index = 0;
	let body = dialoge.getElementsByClassName('dialoge-body')[0];
	let title = dialoge.getElementsByClassName('dialoge-title')[0]

	dialoge.querySelector("#next").addEventListener('click', () => {
		if (index === content.length - 1) {
			dialoge.remove();
			return;
		} else if (index === content.length - 2) {
			dialoge.querySelector("#next").innerHTML = "Finish";
		}
		index++;
		body.innerHTML = content[index].body;
		title.innerHTML = content[index].title;
	});

	dialoge.querySelector("#back").addEventListener('click', () => {
		if (index - 1 != -1) {
			index -= 1;
			if (index === content.length - 2) {
				dialoge.querySelector("#next").innerHTML = "Next";
				console.log("sd")
			} else {
			}
			body.innerHTML = content[index].body;
			title.innerHTML = content[index].title;
		}
	});

	dialoge.querySelector("#skip").addEventListener('click', () => {
		dialoge.remove();
	});
});