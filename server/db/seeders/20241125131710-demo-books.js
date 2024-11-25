'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const books = [
      {
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian social science fiction novel and cautionary tale.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A novel about the serious issues of rape and racial inequality.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/8228697-L.jpg',
      },
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A critique of the American Dream set in the Jazz Age.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/5897633-L.jpg',
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel of manners.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/8231996-L.jpg',
      },
      {
        title: 'Moby-Dick',
        author: 'Herman Melville',
        description: 'The voyage of the whaling ship Pequod.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/5547974-L.jpg',
      },
      {
        title: 'War and Peace',
        author: 'Leo Tolstoy',
        description: 'A chronicle of Napoleon’s invasion of Russia.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/7059948-L.jpg',
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        description: 'A story about teenage rebellion and angst.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/8226191-L.jpg',
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        description: 'A fantasy novel about the journey of Bilbo Baggins.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/8104896-L.jpg',
      },
      {
        title: 'Crime and Punishment',
        author: 'Fyodor Dostoevsky',
        description: 'A psychological drama about morality and redemption.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/10958302-L.jpg',
      },
      {
        title: 'Brave New World',
        author: 'Aldous Huxley',
        description:
          'A dystopian novel exploring the dangers of technological advancements.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/8772184-L.jpg',
      },
      {
        title: 'Jane Eyre',
        author: 'Charlotte Brontë',
        description: 'A novel about the moral and spiritual development of its heroine.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/8407881-L.jpg',
      },
      {
        title: 'Wuthering Heights',
        author: 'Emily Brontë',
        description: 'A story of intense, almost demonic love.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/8284336-L.jpg',
      },
      {
        title: 'The Brothers Karamazov',
        author: 'Fyodor Dostoevsky',
        description: 'A philosophical drama about faith, doubt, and reason.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/9271654-L.jpg',
      },
      {
        title: 'Anna Karenina',
        author: 'Leo Tolstoy',
        description: 'A tragic tale of love and infidelity.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/10363978-L.jpg',
      },
      {
        title: 'Ulysses',
        author: 'James Joyce',
        description: 'A modernist novel set in a single day in Dublin.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/7193562-L.jpg',
      },
      {
        title: 'The Odyssey',
        author: 'Homer',
        description: 'An epic poem about Odysseus’s journey home.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/7206223-L.jpg',
      },
      {
        title: 'The Iliad',
        author: 'Homer',
        description: 'An epic poem set during the Trojan War.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/7997211-L.jpg',
      },
      {
        title: 'Frankenstein',
        author: 'Mary Shelley',
        description: 'A novel about the consequences of unbridled scientific ambition.',
        status: 'unread',
        coverImage: 'https://covers.openlibrary.org/b/id/7784460-L.jpg',
      },
      {
        title: 'Don Quixote',
        author: 'Miguel de Cervantes',
        description: 'A satirical novel about chivalry and heroism.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/8312681-L.jpg',
      },
      {
        title: 'One Hundred Years of Solitude',
        author: 'Gabriel García Márquez',
        description: 'A magical realist chronicle of the Buendía family.',
        status: 'read',
        coverImage: 'https://covers.openlibrary.org/b/id/8557683-L.jpg',
      },
    ].map((book) => ({
      ...book,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Books', books, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
