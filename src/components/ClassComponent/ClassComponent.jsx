import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState(this.props.min, this.props.max);
  }

  initState(minValue, maxValue) {
    return {
      result: 'Input your number',
      count: 0,
      isGameOver: false,
      randomNumber:
        Math.floor(Math.random() * maxValue - minValue) + minValue,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.isGameOver) {
      this.setState(state => this.initState(this.props.min, this.props.max));
    } else {
      this.setState(state => {
        if (!state.userNumber) return state;

        if (state.userNumber > state.randomNumber) {
          return {
            userNumber: '',
            count: state.count + 1,
            result: `${state.userNumber} greater then conceived.`,
          };
        }

        if (state.userNumber < state.randomNumber) {
          return {
            userNumber: '',
            count: state.count + 1,
            result: `${state.userNumber} less then conceived.`,
          };
        }

        return {
          userNumber: '',
          count: state.count + 1,
          result: `You are winner! My number is ${state.userNumber},
            tries: ${state.count}.`,
          isGameOver: true,
        };
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      userNumber: e.target.value,
    });
  };

  render() {
    console.log(this.state.count);
    const isGameOver = this.state.isGameOver;

    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>
        <form className={style.form} onSubmit={this.handleSubmit}>
          {!isGameOver ?
            <>
              <label className={style.label} htmlFor='user_number'>
                Guess a number
              </label>
              <input
                className={style.input}
                type='number'
                id='user_number'
                onChange={this.handleChange}
                value={this.state.userNumber} />
              <button className={style.btn}>Try</button>
            </> :
              <button className={style.btn}>Start New Game</button>
          }
        </form>
      </div>
    );
  }
}

ClassComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
