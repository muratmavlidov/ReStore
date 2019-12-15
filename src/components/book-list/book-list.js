import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import { compose } from '../../utils';

import './book-list.sass';

class BookList extends Component {

  componentDidMount() {
    // 1. recieve data
    const { bookstoreService, booksLoaded } = this.props;
    const data = bookstoreService.getBooks();

    // 2. dispatch action to store
    booksLoaded(data);
  }

  render() {
    const { books } = this.props;
    return (
      <ul className="book-list">
        {
          books.map(book => {
            return (
              <li key={book.id}>
                <BookListItem book={ book } />
              </li>
            );
          })
        }
      </ul>
    );
  }
}

const mapStateToProps = ({ books }) => {
  return { books }
};

const mapDispatchToProps = {
  booksLoaded
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);
