"use strict";
document.addEventListener("DOMContentLoaded", () => {
	const storedTasks = JSON.parse(localStorage.getItem("tasks"));

	if (storedTasks) {
		storedTasks.forEach((task) => tasks.push(task));
		updateTasksList();
		updateStats();
	}
});

let tasks = [];

const saveTasks = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
	const taskInput = document.getElementById("taskInput");
	const text = taskInput.value.trim();
	if (text) {
		tasks.push({ text, completed: false, editableNow: false });
		updateTasksList();
		updateStats();
		saveTasks();
		taskInput.value = "";
	}
};

const toggleTaskComplete = (index) => {
	tasks[index].completed = !tasks[index].completed;
	updateTasksList();
	updateStats();
	saveTasks();
};

const deleteTask = (index) => {
	tasks.splice(index, 1);
	updateTasksList();
	updateStats();
	saveTasks();
};

const editTask = (id, index) => {
	const taskInput = document.getElementById(id);
	tasks[index].text = taskInput.value;
	tasks[index].editableNow = false;

	updateTasksList();
	updateStats();
	saveTasks();
};

const updateStats = () => {
	const completedTasks = tasks.filter((task) => task.completed).length;
	const totalTasks = tasks.length;
	const progress = (completedTasks / totalTasks) * 100;
	const progressBar = document.getElementById("progress");

	progressBar.style.width = `${progress}%`;

	document.getElementById(
		"numbers"
	).innerText = `${completedTasks} / ${totalTasks}`;

	if (completedTasks === totalTasks) {
		epicConfetti();
	}
};

const editableNowIsActiv = (index) => {
	tasks[index].editableNow = !tasks[index].editableNow;
	updateTasksList();
};

const updateTasksList = () => {
	const taskList = document.getElementById("task-list");
	taskList.innerHTML = "";

	tasks.forEach(({ text, completed, editableNow }, index) => {
		const listItem = document.createElement("li");

		const taskTextContent = editableNow
			? `<input type="text" class="task-input" id="input-${index}" value="${text}">`
			: `<p>${text}</p>`;

		const taskImgContent = editableNow
			? `<img src="./img/changeTask.png" id="checkCircle" onClick="editTask('input-${index}', ${index})">`
			: `<img src="./img/edit.png" onClick="editableNowIsActiv(${index})">`;

		listItem.innerHTML =
			`
        <div class="taskItem">
            <div class="task ${completed ? "completed" : ""}">
                <input onChange="toggleTaskComplete(${index})" type="checkbox" id="checkbox-${index}" class="checkbox" ${
				completed ? "checked" : ""
			}>` +
			taskTextContent +
			`</div>
            <div class="icons">` +
			taskImgContent +
			`<img src="./img/bin.png" onClick="deleteTask(${index})">
            </div>
        </div>          
        `;
			taskList.append(listItem);

		
	});
};

document.getElementById("newTask").addEventListener("click", function (e) {
	e.preventDefault();

	addTask();
});

const epicConfetti = () => {
	const count = 200,
		defaults = {
			origin: { y: 0.7 },
		};

	function fire(particleRatio, opts) {
		confetti(
			Object.assign({}, defaults, opts, {
				particleCount: Math.floor(count * particleRatio),
			})
		);
	}

	fire(0.25, {
		spread: 26,
		startVelocity: 55,
	});

	fire(0.2, {
		spread: 60,
	});

	fire(0.35, {
		spread: 100,
		decay: 0.91,
		scalar: 0.8,
	});

	fire(0.1, {
		spread: 120,
		startVelocity: 25,
		decay: 0.92,
		scalar: 1.2,
	});

	fire(0.1, {
		spread: 120,
		startVelocity: 45,
	});
};
