import React, { Component } from "react";
import { Actions } from "react-native-router-flux";

import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Item,
	Label,
	Input,
	Body,
	Form,
	Text
} from "native-base";

class Login extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Login</Title>
					</Body>
				</Header>

				<Content>
					<Form>
						<Item stackedLabel>
							<Label>Username</Label>
							<Input />
						</Item>
						<Item stackedLabel last>
							<Label>Password</Label>
							<Input />
						</Item>
					</Form>
					<Button block style={{ margin: 15, marginTop: 50 }} onPress={() => Actions.home()}>
						<Text>Sign In</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default Login;