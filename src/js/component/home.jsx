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

	const addTask = async (event) => {
		try {
			if (event.key === "Enter") {
				if (task.label.trim() !== "") {

					const responde = await fetch(`${URLBASE}/todos/Daniel_Perdomo`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(task)
					})

					if (responde.ok) {
						getAllTask()
						setTask(initialTask)
					} else {
						console.log("There is an error while adding the task.-")
					}
				}
			}
		} catch (error) {
			console.log(error)
		}

	}

	const deleteTask = (id) => {
		fetch(`${URLBASE}/todos/${id}`, {
			method: "DELETE"
		})
			.then((responde) => getAllTask())
			.catch((error) => console.log(error))
	}

	const getAllTask = async () => {
		try {
			let responde = await fetch(`${URLBASE}/users/Daniel_Perdomo`)
			let data = await responde.json()

			if (responde.status == 404) {
				createUser()
				getAllTask()
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

			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteAll() {
		try {
			let response = await fetch(`${URLBASE}/users/Daniel_Perdomo`, {
				method: "DELETE"
			})
			if (response.status == 204) {
				getAllTask()
			}

		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getAllTask()
	}, [])

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-7">
					<h1 className="my-3">Todo list</h1>
					<form
						onSubmit={(event) => event.preventDefault()}
					>
						<input
							className="form-control"
							type="text"
							placeholder="Add task then press enter"
							name="label"
							value={task.label}
							onChange={handleChange}
							onKeyDown={addTask}
						/>
					</form>
					<br />
					{
						todos.map((item) => {
							return (
								<div key={item.id}
									className="d-flex justify-content-between"
								>
									<div>
										{item.label}
									</div>
									<button
										className="btn btn-danger"
										onClick={() => deleteTask(item.id)}
									>x</button>
								</div>
							)
						})
					}
					<button
						onClick={() => { deleteAll() }}
					>Eliminar todo</button>
				</div>
			</div>
		</div>
	);
};

export default Home;