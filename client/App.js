import React from "react";
import ReactDOM from "react-dom";
import LoginForm from './LoginForm';


const App = () => {

	return (
		<div>
			<LoginForm></LoginForm>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));