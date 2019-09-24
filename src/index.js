
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: "", hideChecked: false };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeChecked = this.handleChangeChecked.bind(this);
    }

    render() {
        return (
            <div>
                <div>
                    <h3>TODO LIST</h3>
                    <TodoList items={this.state.items} hideChecked={this.state.hideChecked} />
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
                            Add
                        </button>
                    </form>
                </div>
                <div>
                    <TodoOptions onChange={this.handleChangeChecked} display={true}/>
                </div>
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

    handleChangeChecked(e) {
        this.setState({
            hideChecked: !this.state.hideChecked
        })
    }
}

class TodoCheck extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: false
        };

        if(this.props.onChange) {
            this.handleChange = this.props.onChange;
        }

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let status = (this.state.checked && this.props.slash) ? "checkbox slash" : "checkbox";

        if(!this.props.hide || !this.state.checked) {
            return (
                    <li>
                        <label className={status}>
                            <input
                                type="checkbox"
                                onChange={this.handleChange}
                                checked={this.state.checked || this.props.display}>
                            </input>
                            {this.props.text}
                        </label>
                    </li>
            )
        } else return null;
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
                    <TodoCheck key={item.id} slash={true} hide={this.props.hideChecked} text={item.text} />
                )}
            </ul>
        )
    }
}

class TodoOptions extends React.Component {
    render() {
        return (
            <div>
                <h4>OPTIONS</h4>
                <ul>
                    <TodoCheck
                        key="hideChecked"
                        slash={false}
                        hide={false}
                        onChange={this.props.onChange} 
                        // this requires the bind
                        // I assume this is because otherwise the function is passed and
                        // it's not part of the class anymore, because this is undefined
                        text="Hide Checked Items"
                    />
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <TodoApp />,
    document.getElementById("root")
);