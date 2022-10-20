import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const AddedTaskItem = props => {
  const {newAddTask} = props
  const {task, tags} = newAddTask
  return (
    <li className="adeed-item">
      <p className="task-style">{task}</p>
      <p className="tags-style">{tags}</p>
    </li>
  )
}

const TagsItem = props => {
  const {eachTags, filterTasks, isSelected} = props
  const {displayText} = eachTags

  const onFilterTasks = () => {
    filterTasks(displayText)
  }

  return (
    <li>
      {isSelected ? (
        <button
          className="selected-task-btn"
          type="button"
          onClick={onFilterTasks}
        >
          {displayText}
        </button>
      ) : (
        <button className="task-btn" type="button" onClick={onFilterTasks}>
          {displayText}
        </button>
      )}
    </li>
  )
}

class AllTasks extends Component {
  state = {allTask: [], taskInput: '', isSelected: false, tagInput: 'Health'}

  onFormSubmit = event => {
    event.preventDefault()
    const {taskInput, tagInput} = this.state
    const newTask = {
      task: taskInput,
      tags: tagInput,
      id: v4(),
    }
    this.setState(prevState => ({
      allTask: [...prevState.allTask, newTask],
      taskInput: '',
      tagInput: 'Health',
    }))
  }

  filteringTasks = displayText => {
    const {allTask} = this.state
    const filteredTask = allTask.filter(
      eachTasks => eachTasks.tags === displayText,
    )
    this.setState(prevState => ({
      allTask: [...filteredTask],
      isSelected: !prevState.isSelected,
    }))
  }

  onUserInput = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTags = event => {
    this.setState({tagInput: event.target.value})
  }

  render() {
    const {allTask, taskInput, tagInput, isSelected} = this.state
    const lenOfTask = allTask.length
    return (
      <div className="main-cont">
        <div className="form-cont">
          <h1 className="form-head">Create a Task!</h1>
          <form onSubmit={this.onFormSubmit} className="form-style">
            <div className="input-cont">
              <label className="label-text" htmlFor="task input">
                Task
              </label>
              <br />
              <input
                className="input-style"
                id="task input"
                type="text"
                placeholder="Enter the task here"
                onChange={this.onUserInput}
                value={taskInput}
              />
            </div>
            <div className="input-cont">
              <label className="label-text" htmlFor="tags input">
                Tags
              </label>
              <br />
              <select
                onChange={this.onChangeTags}
                id="tags input"
                className="input-style"
                value={tagInput}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId}>{eachTag.displayText}</option>
                ))}
              </select>
            </div>
            <button className="add-btn" type="submit">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-list-cont">
          <h1 className="task-head">Tags</h1>
          <ul className="tags-cont">
            {tagsList.map(eachTags => (
              <TagsItem
                eachTags={eachTags}
                key={eachTags.optionId}
                filterTasks={this.filteringTasks}
                isSelected={isSelected}
              />
            ))}
          </ul>
          <h1 className="task-head">Tasks</h1>
          {lenOfTask < 1 ? (
            <p className="no-task-para">No Tasks Added Yet</p>
          ) : (
            allTask.map(newAddTask => (
              <AddedTaskItem newAddTask={newAddTask} key={newAddTask.id} />
            ))
          )}
        </div>
      </div>
    )
  }
}

export default AllTasks
