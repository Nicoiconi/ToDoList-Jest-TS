'use client'

import { ChangeEvent, FormEvent, useState } from "react"

interface ToDo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {

  const [inputValue, setInputValue] = useState<string>("")
  const [toDoList, setToDoList] = useState<ToDo[]>([])
  const [toDosToComplete, setToDosToComplete] = useState<number[]>([])
  const [toDosToUncomplete, setToDosToUnComplete] = useState<number[]>([])
  const [toDosToDelete, setToDosToDelete] = useState<number[]>([])

  function handleInputData(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setInputValue(value)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newToDo: ToDo = {
      id: toDoList.length ? toDoList[toDoList.length - 1]?.id + 1 : 1,
      text: inputValue,
      completed: false
    }

    setToDoList(prevState => [...prevState, newToDo])
    setInputValue("")
  }

  function handleToggleComplete(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target
    if (checked) {
      setToDosToComplete(prevState => [...prevState, Number(value)])
    } else {
      setToDosToComplete(prevState => prevState.filter(toDoId => toDoId !== Number(value)))
    }
  }

  function handleCompleteToDos() {
    const completeToDos = toDosToComplete?.map(toDoId => {
      for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i]?.id === toDoId) {
          toDoList[i].completed = true
          setToDosToComplete(prevState => prevState.filter(id => id !== toDoId))
        }
      }
    })
  }

  function handleToggleUncomplete(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target
    if (checked) {
      setToDosToUnComplete(prevState => [...prevState, Number(value)])
    } else {
      setToDosToUnComplete(prevState => prevState.filter(toDoId => toDoId !== Number(value)))
    }
  }

  function handleUncompleteToDos() {
    const uncompleteToDos = toDosToUncomplete?.map(toDoId => {
      for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i]?.id === toDoId) {
          toDoList[i].completed = false
          setToDosToUnComplete(prevState => prevState.filter(id => id !== toDoId))
        }
      }
    })
  }

  function handleToggleDelete(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target
    if (checked) {
      setToDosToDelete(prevState => [...prevState, Number(value)])
    } else {
      setToDosToDelete(prevState => prevState.filter(toDoId => toDoId !== Number(value)))
    }
  }

  function handleDeleteToDos() {
    const deleteToDos = toDosToDelete?.map(toDoId => {
      for (let i = 0; i < toDoList.length; i++) {
        if (toDoList[i]?.id === toDoId) {
          setToDoList(prevState => prevState.filter(toDo => toDo.id !== toDoId))
          setToDosToUnComplete(prevState => prevState.filter(id => id !== toDoId))
        }
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-20">
      <div className="py-8">
        <form
          onSubmit={(e) => handleSubmit(e)}
          action=""
          className="flex "
        >
          <div className="px-3 flex">
            <input
              className="text-black px-1"
              data-testid="to-do-input"
              type="text"
              onChange={(e) => handleInputData(e)}
              value={inputValue}
            />
          </div>
          <div className="px-3">
            <button
              className="border px-3 py-1"
              type="submit"
              data-testid="submit-button"
              disabled={inputValue.length === 0}
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="flex">
        <div className="px-4">
          <button
            className="px-4 py-1 border rounded-md"
            data-testid="complete-button"
            onClick={() => handleCompleteToDos()}
            disabled={toDosToComplete?.length === 0}
          >
            Complete
          </button>
        </div>
        <div className="px-4">
          <button
            className="px-4 py-1 border rounded-md"
            data-testid="uncomplete-button"
            onClick={() => handleUncompleteToDos()}
            disabled={toDosToUncomplete?.length === 0}
          >
            Uncomplete
          </button>
        </div>
        <div className="px-4">
          <button
            className="px-4 py-1 border rounded-md"
            data-testid="delete-button"
            onClick={() => handleDeleteToDos()}
            disabled={toDosToDelete?.length === 0}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="flex gap-[50px] min-h-[300px] pt-10">
        <section
          className="min-w-[300px] border"
        >
          <div className="text-center w-full border-b">
            Completed List
          </div>
          <ul data-testid="uncompleted-list">
            {
              toDoList?.map((toDo) => {
                return (
                  <>
                    {
                      toDo?.completed
                        ? ""
                        : <li
                          className="flex justify-between"
                          key={toDo?.id}
                        >
                          <div>
                            {toDo?.text}
                          </div>
                          <div className="w-auto flex">
                            <div>
                              <label htmlFor={`${toDo?.text}-${toDo?.id}`}>
                                Complete
                              </label>
                              <input
                                data-testid="complete-checkbox"
                                id={`${toDo?.text}-${toDo?.id}`}
                                value={toDo?.id}
                                onChange={(e) => handleToggleComplete(e)}
                                type="checkbox"
                              />
                            </div>
                            <div>
                              <label htmlFor={`delete-${toDo?.text}-${toDo?.id}`}>
                                Delete
                              </label>
                              <input
                                data-testid="delete-checkbox"
                                id={`delete-${toDo?.text}-${toDo?.id}`}
                                value={toDo?.id}
                                onChange={(e) => handleToggleDelete(e)}
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </li>
                    }
                  </>
                )
              })
            }
          </ul>
        </section>
        <section
          className="min-w-[300px] border"
        >
          <div className="text-center w-full border-b">
            Uncompleted List
          </div>
          <ul data-testid="completed-list">
            {
              toDoList?.map((toDo) => {
                return (
                  <>
                    {
                      toDo?.completed
                        ? <li
                          className="flex justify-between"
                          key={toDo?.id}
                        >
                          <div>
                            {toDo?.text}
                          </div>
                          <div className="w-auto flex">
                            <div>
                              <label htmlFor={`${toDo?.text}-${toDo?.id}`}>
                                Uncomplete
                              </label>
                            </div>
                            <div>
                              <input
                                data-testid="uncomplete-checkbox"
                                id={`${toDo?.text}-${toDo?.id}`}
                                value={toDo?.id}
                                onChange={(e) => handleToggleUncomplete(e)}
                                type="checkbox"
                              />
                            </div>
                            <div>
                              <label htmlFor={`delete-${toDo?.text}-${toDo?.id}`}>
                                Delete
                              </label>
                              <input
                                data-testid="delete-checkbox"
                                id={`delete-${toDo?.text}-${toDo?.id}`}
                                value={toDo?.id}
                                onChange={(e) => handleToggleDelete(e)}
                                type="checkbox"
                              />
                            </div>
                          </div>
                        </li >
                        : ""
                    }
                  </>
                )
              })
            }
          </ul>
        </section>
      </div>

    </main >
  )
}
