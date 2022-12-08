import React from 'react';
import style from './LifeCycle.module.css';
import PropTypes from 'prop-types';

export class LifeCycle extends React.Component {
  /**
   * !render
   * constructor
   * getDerivedStateFromProps
   * render
   * -
   * !commit
   * обновляется DOM
   * componentDidMount
   * componentWillUnmount
   */

  constructor(props) {
    super(props);
    console.log('constructor');

    this.state = {
      field: 0,
      hasError: false,
    };

    //    this.handler = this.handler.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');
    return state;
  }

  componentDidMount() {
    console.log('componentDidMount');
    /*
    setInterval(() => {
      console.log('timer');
      this.setState(state => ({
        field: state.field + 1,
      }));
    }, 3000);
    */
    // document.addEventListener('scroll', this.handler);

    document.title = this.props.prop;
  }

  /**
   * !render
   * getDerivedStateFromProp
   * shouldComponentUpdate
   * render
   * -
   * !pre-commit
   * getSnapshotBeforeUpdate
   * обновляется DOM
   * !commit
   * componentDidUpdate
   */

  shouldComponentUpdate(nextProps, nextState, textContext) {
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return window.pageYOffset;
  }

  /* snapshot got from getSnapshotBeforeUpdate */
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
    window.scrollBy(0, -snapshot);
  }

  componentWillUnmount() {
    // document.removeEventListener('scroll');
  }

  /**
   * !error
   * getDerivedStateFromError
   * componentDidCatch
   */

  static getDerivedStateFromError(err) {
    console.log('getDerivedStateFromError');
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    // TODO error-log
    // sendLog(errorInfo.componentStack);
  }

  handler = () => {
    this.setState(state => ({
      field: state.field + 1,
    }));
  };

  render() {
    console.log('render');

    if (this.state.hasError) {
      return <h1 className={style.tutle}>Error</h1>;
    } else {
      return (
        <div>
          <h1 className={style.title}>Жизненный цикл</h1>

          <div className={style.container}>
            <div>
              <h2 className={style.title}>Типы</h2>
              <ul className={style.list}>
                <li>Монтирование</li>
                <li>Обновление</li>
                <li>Размонтирование</li>
                <li>Ошибки</li>
              </ul>
            </div>

            <div className='stage'>
              <h2 className={style.title}>Этапы</h2>
              <ul className={style.list}>
                <li>Render</li>
                <li>Pre-commit</li>
                <li>Commit</li>
              </ul>
            </div>
          </div>
          <button
            onClick={this.handler}
            className={style.btn}>Click {this.state.field}
          </button>
        </div>
      );
    }
  }
}

LifeCycle.propTypes = {
  prop: PropTypes.string,
};
