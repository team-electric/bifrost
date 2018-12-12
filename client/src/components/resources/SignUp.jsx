import React, { PureComponent, Fragment } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
var background = require('../../assets/landingwallpaper.jpg');
import { connect } from 'react-redux';
import {
  getUser,
  getAuth,
  getUserLoading
} from '../../store/resources/users/selectors';
import { fetchUser, postUser } from '../../store/resources/users/actions';
import { ROUTES } from '../../routes';
import { Redirect } from 'react-router-dom';

const StyledForm = styled.form`
  overflow: hidden;
  width: 100vw;
  position: absolute;
  top: 25px;
  background: none;
  h3 {
    text-align: center;
  }
  h1 {
    text-align: center;
    font-weight: bolder;
  }
`;

const LabelInputContainer = styled.div`
  input {
    background: none;
    color: inherit;
    outline: none;
    border-left: none;
    border-right: none;
    border-top: none;
    border-bottom: 1px solid ${({ theme }) => theme.accentcolor};
  }

  background: none;
  color: inherit;
  text-align: center;
  font: inherit;
  outline: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  left: 20vw;
  position: relative;
  width: 100vw;
  height: 34px;
  margin: 20px;
`;
const ButtonWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  background: none;
  color: inherit;
  border: 1px solid ${({ theme }) => theme.accentcolor};
  padding: 3px;
  font: inherit;
  cursor: pointer;
  width: 100px;
  height: 40px;
`;

const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: -3;
  background: url(${background}) no-repeat center center;
  background-size: cover;
`;

class SignUp extends PureComponent {

  state = {
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  };

  componentDidMount() {
    this.props.fetchUser(this.props.auth.email);
  }

  onSubmit = event => {
    event.preventDefault();
    const { email } = this.props.auth;
    const { name, street, city, state, zip, phone } = this.state;
    this.props.postUser({ name, email, street, city, state, zip, phone });
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    if(!this.props.loading && this.props.user)
      return <Redirect to={ROUTES.DASHBOARD.linkTo()} />;
    if(this.props.loading) return <h1> LOADING </h1>;

    return (
      <Fragment>
        <BackgroundWrapper />
        <StyledForm onSubmit={this.onSubmit}>
          <h1>... just a little more info</h1>

          <LabelInputContainer>
            <label>
              Full Name{' '}
              <input
                id="name"
                name="name"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <LabelInputContainer>
            <label>
              Phone Number
              <input
                id="phone"
                name="phone"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <h3>Current Pickup Address:</h3>
          <LabelInputContainer>
            <label>
              street:
              <input
                id="street"
                name="street"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <LabelInputContainer>
            <label>
              city:
              <input
                id="city"
                name="city"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <LabelInputContainer>
            <label>
              state:
              <input
                id="state"
                name="state"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <LabelInputContainer>
            <label>
              zip:
              <input
                id="zip"
                name="zip"
                type="text"
                onChange={this.handleChange}
              />
            </label>
          </LabelInputContainer>
          <ButtonWrapper>
            <Button>Register</Button>
          </ButtonWrapper>
        </StyledForm>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  auth: getAuth(state),
  loading: getUserLoading(state)
});

const mapDispatchToProps = dispatch => ({
  fetchUser: email => dispatch(fetchUser(email)),
  postUser: user => dispatch(postUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
