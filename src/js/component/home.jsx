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


	// const addTask = (event) => {
	// 	if (event.key === "Enter") {
	// 		if (task.label.trim() !== "") {
	// 			setTodos([
	// 				...todos,
	// 				task
	// 			])

	// 			setTask(initialTask)
	// 		}
	// 	}

	// }

	const addTask = async (event) => {
		try {
			if (event.key === "Enter") {
				if (task.label.trim() !== "") {

					const responde = await fetch(`${URLBASE}/todos/deimian`, {
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
						console.log("debo manejar el error ")
					}
				}
			}
		} catch (error) {
			console.log(error)
		}

	}



	const deleteTask = (id) => {
		// const newTask = todos.filter((item, index) => index !== id)
		// setTodos(newTask)

		fetch(`${URLBASE}/todos/${id}`, {
			method: "DELETE"
		})
			.then((responde) => getAllTask())
			.catch((error) => console.log(error))

	}


	const getAllTask = async () => {
		try {
			let responde = await fetch(`${URLBASE}/users/deimian`)
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
			let response = await fetch(`${URLBASE}/users/deimian`, {
				method: "POST"

			})

			console.log(response)
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteAll() {
		try {
			let responde = await fetch(`${URLBASE}/users/Daniel_Perdomo`, {
				method: "DELETE"
			})
			if (responde.status == 204) {
				getAllTask()
			}

		} catch (error) {
			console.log(error)
		}
	}

	/*
	- si el user no existe dad 404
	*/

	useEffect(() => {
		getAllTask()
	}, [])


	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-7">
					<h1 className="my-3">Todo list</h1>
					<form
						onSubmit={(event) => event.preventDefault()}
					>
						<input
							className="form-control"
							type="text"
							placeholder="Ingresa la tarea"
							name="label"
							value={task.label}
							onChange={handleChange}
							onKeyDown={addTask}

						/>
					</form>
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