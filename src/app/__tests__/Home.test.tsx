import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Home from "../page"



describe("Home", () => {

  // afterEach(cleanup) //`cleanup` is performed automatically by your test runner, you don't need manual cleanups
  // it("should render", () => {
  //   render(<Home />)
  // })

  beforeEach(() => {
    render(<Home />)
  })

  it("should render an input", () => {
    const input = screen.getByTestId("to-do-input")
    expect(input).toBeInTheDocument()
  })

  it("should render a button", () => {
    const button = screen.getByTestId("submit-button")
    expect(button).toBeInTheDocument()
  })


  it("should disable the button when input has no value", async () => {
    const input = screen.getByTestId("to-do-input")
    const button = screen.getByTestId("submit-button")

    expect(button).toBeDisabled()

    await userEvent.type(input, "Hello world")

    expect(button).toBeEnabled()
  })

  it("should add a new to do", async () => {
    const input = screen.getByTestId("to-do-input")
    expect(input).toHaveValue("")

    const submitButton = screen.getByTestId("submit-button")
    expect(submitButton).toBeDisabled

    const uncompletedList = screen.getByTestId("uncompleted-list")
    expect(uncompletedList).toBeEmptyDOMElement()

    await userEvent.type(input, "New to do")
    await userEvent.click(submitButton)

    expect(input).toHaveValue("")
    expect(uncompletedList).toHaveTextContent("New to do")
  })

  it("should complete a task", async () => {
    const submitButton = screen.getByTestId("submit-button")
    expect(submitButton).toBeDisabled

    const input = screen.getByTestId("to-do-input")
    expect(input).toHaveValue("")

    const uncompletedList = screen.getByTestId("uncompleted-list")
    expect(uncompletedList).toBeEmptyDOMElement()

    await userEvent.type(input, "New to do")
    expect(submitButton).toBeEnabled()

    await userEvent.click(submitButton)
    expect(input).toHaveValue("")
    expect(uncompletedList).toHaveTextContent("New to do")

    const completeCheckbox = screen.getByTestId("complete-checkbox")
    expect(completeCheckbox).not.toBeChecked()

    const completedList = screen.getByTestId("completed-list")
    expect(completedList).toBeEmptyDOMElement()
    const completeButton = screen.getByTestId("complete-button")
    expect(completeButton).toBeDisabled()

    await userEvent.click(completeCheckbox)
    expect(completeCheckbox).toBeChecked()
    expect(completeButton).toBeEnabled()

    await userEvent.click(completeButton)

    expect(uncompletedList).toBeEmptyDOMElement()
    expect(completedList).toHaveTextContent("New to do")
    expect(completeButton).toBeDisabled()
  })

  it("should uncomplete a task", async () => {
    const submitButton = screen.getByTestId("submit-button")
    expect(submitButton).toBeDisabled

    const input = screen.getByTestId("to-do-input")
    expect(input).toHaveValue("")

    const uncompletedList = screen.getByTestId("uncompleted-list")
    expect(uncompletedList).toBeEmptyDOMElement()

    await userEvent.type(input, "New to do")
    expect(submitButton).toBeEnabled()

    await userEvent.click(submitButton)
    expect(input).toHaveValue("")
    expect(uncompletedList).toHaveTextContent("New to do")

    const completeCheckbox = screen.getByTestId("complete-checkbox")
    expect(completeCheckbox).not.toBeChecked()

    const completedList = screen.getByTestId("completed-list")
    expect(completedList).toBeEmptyDOMElement()
    const completeButton = screen.getByTestId("complete-button")
    expect(completeButton).toBeDisabled()

    await userEvent.click(completeCheckbox)
    expect(completeCheckbox).toBeChecked()
    expect(completeButton).toBeEnabled()

    await userEvent.click(completeButton)

    expect(uncompletedList).toBeEmptyDOMElement()
    expect(completedList).toHaveTextContent("New to do")
    expect(completeButton).toBeDisabled()

    const uncompleteCheckbox = screen.getByTestId("uncomplete-checkbox")
    expect(uncompleteCheckbox).not.toBeChecked()

    const uncompleteButton = screen.getByTestId("uncomplete-button")
    expect(uncompleteButton).toBeDisabled()

    await userEvent.click(uncompleteCheckbox)
    expect(uncompleteButton).toBeEnabled()

    await userEvent.click(uncompleteButton)

    expect(completedList).toBeEmptyDOMElement()
    expect(uncompletedList).toHaveTextContent("New to do")
  })

  it("should delete a to do", async () => {
    const submitButton = screen.getByTestId("submit-button")
    expect(submitButton).toBeDisabled

    const input = screen.getByTestId("to-do-input")
    expect(input).toHaveValue("")

    await userEvent.type(input, "New to do")
    expect(submitButton).toBeEnabled()

    await userEvent.click(submitButton)
    expect(input).toHaveValue("")

    const toDoToDelete = screen.getByText(/new to do/i)
    expect(toDoToDelete).toBeInTheDocument()

    const deleteButton = screen.getByTestId("delete-button")
    expect(deleteButton).toBeDisabled()

    const deleteCheckbox = screen.getByTestId("delete-checkbox")
    expect(deleteCheckbox).not.toBeChecked()

    await userEvent.click(deleteCheckbox)
    expect(deleteButton).toBeEnabled()

    await userEvent.click(deleteButton)
    expect(toDoToDelete).not.toBeInTheDocument()
  })
})
