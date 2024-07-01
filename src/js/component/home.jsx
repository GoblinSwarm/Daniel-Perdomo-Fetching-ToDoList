import React, { useEffect, useState } from "react";

const initialTask = {
	label: "",
	is_done: false
}

const URLBASE = "https://playground.4geeks.com/todo"

//create your first component
const Home = () => {

	const [task, setTask] = useState(initialTask)
	const [todos, setTodos] = useState([])

	const handleChange = ({ target }) => {
		setTask({
			...task,
			[target.name]: target.value
		})
	}

	const handleKeyDown = async (event) => {
		if (event.key === "Enter") {
			addTask(event);
		}
	}

	const addTask = async (event) => {
		try {
			if (task.label.trim() !== "") {
				const response = await fetch(`${URLBASE}/todos/Daniel_Perdomo`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(task)
				})

				if (response.ok) {
					getAllTasks()
					setTask(initialTask)
				} else {
					console.log("There was an error while adding the task.")
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${URLBASE}/todos/${id}`, {
				method: "DELETE"
			})
			if (response.ok) {
				getAllTasks()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const getAllTasks = async () => {
		try {
			let response = await fetch(`${URLBASE}/users/Daniel_Perdomo`)
			let data = await response.json()

			if (response.status === 404) {
				createUser()
			} else {
				setTodos(data.todos)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const createUser = async () => {
		try {
			let response = await fetch(`${URLBASE}/users/Daniel_Perdomo`, {
				method: "POST"
			})
			if (response.ok) {
				getAllTasks()
			}
		} catch (error) {
			console.log(error)
		}
	}

	const deleteAll = async () => {
		try {
			let response = await fetch(`${URLBASE}/users/Daniel_Perdomo`, {
				method: "DELETE"
			})
			if (response.status === 204) {
				getAllTasks()
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAllTasks()
	}, [])

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-7">
					<h1 className="my-3">Todo list</h1>
					<form onSubmit={(event) => event.preventDefault()}>
						<input
							className="form-control"
							type="text"
							placeholder="Add task then press enter"
							name="label"
							value={task.label}
							onChange={handleChange}
							onKeyDown={handleKeyDown}
						/>
					</form>
					<br />
					{
						todos.map((item) => {
							return (
								
								<div key={item.id} className="d-flex justify-content-between">
									<div>{item.label}</div>
									<br />
									<button
										className="btn btn-danger"
										onClick={() => deleteTask(item.id)}
									><i class="fas fa-times"></i></button>
								</div>
							)
						})
					}
					<button
						className="btn btn-danger mt-3"
						onClick={deleteAll}
					>Eliminar todo</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
