
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return (
            <div>
                <h3>TODO LIST</h3>
                <TodoList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="new-todo">
                        Add a task
                    </label><br />
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }

        const newItem = {
            text: this.state.text,
            id: Date.now
        };

        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ""
        }))
    }
}

class TodoCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let status = this.state.checked ? "checkbox slash" : "checkbox";

        return (
                <li>
                    <label className={status}>
                        <input type="checkbox" onChange={this.handleChange}></input>
                        {this.props.text}
                    </label>
                </li>
        )
    }

    handleChange(e) {
        this.setState({
            checked: !this.state.checked
        })
    }
}

class TodoList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.items.map(item => 
                    <TodoCheck key={item.id} onChange={this.onChange} text={item.text} />
                )}
            </ul>
        )
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById("root")
);