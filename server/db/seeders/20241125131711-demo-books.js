'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const books = [
      {
        title: '1984',
        author: 'Джордж Оруэлл',
        description: 'Антиутопический роман-предостережение о тоталитарном обществе.',
        status: 'read',
        coverImage: 'image_1.webp',
        userId: 1,
      },
      {
        title: 'Гарри Поттер и узник Азкабана',
        author: 'Джоан Роулинг',
        description:
          'Роман о серьёзных вопросах, таких как насилие и расовая несправедливость.',
        status: 'read',
        coverImage: 'image_2.webp',
        userId: 1,
      },
      {
        title: 'Великий Гэтсби',
        author: 'Фрэнсис Скотт Фицджеральд',
        description: 'Критика американской мечты в эпоху джаза.',
        status: 'unread',
        coverImage: 'image_3.webp',
        userId: 2,
      },
      {
        title: 'Гордость и предубеждение',
        author: 'Джейн Остин',
        description: 'Роман о романтике и манерах высшего общества.',
        status: 'unread',
        coverImage: 'image_4.webp',
        userId: 2,
      },
      {
        title: 'Моби Дик',
        author: 'Герман Мелвилл',
        description: 'История о путешествии китобойного судна "Пекод".',
        status: 'read',
        coverImage: 'image_5.webp',
        userId: 1,
      },
      {
        title: 'Война и мир',
        author: 'Лев Толстой',
        description: 'Хроника наполеоновского вторжения в Россию.',
        status: 'read',
        coverImage: 'image_6.webp',
        userId: 1,
      },
      {
        title: 'Над пропастью во ржи',
        author: 'Джером Сэлинджер',
        description: 'История о подростковом бунте и тревоге.',
        status: 'unread',
        coverImage: 'image_7.webp',
        userId: 2,
      },
      {
        title: 'Хоббит',
        author: 'Джон Рональд Руэл Толкин',
        description: 'Фэнтези-роман о путешествии Бильбо Бэггинса.',
        status: 'read',
        coverImage: 'image_8.webp',
        userId: 2,
      },
      {
        title: 'Преступление и наказание',
        author: 'Фёдор Достоевский',
        description: 'Психологическая драма о морали и искуплении.',
        status: 'unread',
        coverImage: 'image_9.webp',
        userId: 1,
      },
      {
        title: 'О дивный новый мир',
        author: 'Олдос Хаксли',
        description: 'Антиутопический роман о технологическом обществе будущего.',
        status: 'read',
        coverImage: 'image_10.webp',
        userId: 1,
      },
      {
        title: 'Джейн Эйр',
        author: 'Шарлотта Бронте',
        description: 'Роман о нравственном и духовном развитии героини.',
        status: 'read',
        coverImage: 'image_11.webp',
        userId: 1,
      },
      {
        title: 'Грозовой перевал',
        author: 'Эмили Бронте',
        description: 'История об интенсивной, почти демонической любви.',
        status: 'unread',
        coverImage: 'image_12.webp',
        userId: 2,
      },
      {
        title: 'Братья Карамазовы',
        author: 'Фёдор Достоевский',
        description: 'Философская драма о вере, сомнении и разуме.',
        status: 'read',
        coverImage: 'image_13.webp',
        userId: 2,
      },
      {
        title: 'Анна Каренина',
        author: 'Лев Толстой',
        description: 'Трагическая история о любви и неверности.',
        status: 'unread',
        coverImage: 'image_14.webp',
        userId: 1,
      },
      {
        title: 'Улисс',
        author: 'Джеймс Джойс',
        description:
          'Модернистский роман, действие которого происходит за один день в Дублине.',
        status: 'read',
        coverImage: 'image_15.webp',
        userId: 1,
      },
      {
        title: 'Одиссея',
        author: 'Гомер',
        description: 'Эпическая поэма о путешествии Одиссея домой.',
        status: 'unread',
        coverImage: 'image_16.webp',
        userId: 2,
      },
      {
        title: 'Илиада',
        author: 'Гомер',
        description:
          'Эпическая поэма, действие которой происходит во время Троянской войны.',
        status: 'read',
        coverImage: 'image_17.webp',
        userId: 1,
      },
      {
        title: 'Франкенштейн',
        author: 'Мэри Шелли',
        description: 'Роман о последствиях необузданной научной амбиции.',
        status: 'unread',
        coverImage: 'image_18.webp',
        userId: 2,
      },
      {
        title: 'Дон Кихот',
        author: 'Мигель де Сервантес',
        description: 'Сатирический роман о рыцарстве и героизме.',
        status: 'read',
        coverImage: 'image_19.webp',
        userId: 1,
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
