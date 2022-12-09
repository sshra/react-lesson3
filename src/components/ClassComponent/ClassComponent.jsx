import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState(this.props.min, this.props.max);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.isGameOver) {
      this.setState(state => this.initState(this.props.min, this.props.max));
    } else {
      this.setState(state => {
        if (!state.userNumber) return state;

        let resultString = '';
        let gameOverFlag = false;
        const countTries = state.count + 1;

        if (state.userNumber > state.randomNumber) {
          resultString = `${state.userNumber} greater then conceived.`;
        } else if (state.userNumber < state.randomNumber) {
          resultString = `${state.userNumber} less then conceived.`;
        } else {
          resultString = `You are winner! My number is ${state.userNumber},
          tries: ${countTries}.`;
          gameOverFlag = true;
        }

        return {
          userNumber: '',
          count: countTries,
          result: resultString,
          isGameOver: gameOverFlag,
        };
      });
    }
  }

  handleChange(e) {
    this.setState({
      userNumber: e.target.value,
    });
  }

  render() {
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
