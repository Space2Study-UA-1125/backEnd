const offers = {
  OFFER_1: {
    _id: '65e9c15ccfd82d656917e43c',
    price: 99,
    proficiencyLevel: ['Beginner'],
    title: 'First-class teacher. Director of the Hogwarts school of magic',
    description: 'I will teach you how to protect yourself and your family from dark arts',
    languages: ['English'],
    authorRole: 'tutor',
    author: '65e9c15ccfd82d656917e436',
    subject: '65e9c15ccfd82d656917e43a',
    category: '65e9c15ccfd82d656917e438',
    status: 'active',
    FAQ: [
      {
        question: 'Do you enjoy being a director of the Hogwarts?',
        answer: 'Actually yes, i really like it.',
        _id: '65e9c15ccfd82d656917e43d'
      }
    ]
  },
  OFFER_2: {
    _id: '65e845e9a36428a88672caf7',
    price: 300,
    proficiencyLevel: ['Beginner'],
    title: 'Request',
    description: 'Lorem ipsum dolor sit amet consectetur',
    languages: ['English', 'Ukrainian'],
    authorRole: 'student',
    author: '65eeb159556a02a698aac345',
    subject: '65e843d1a36428a88672cae6',
    category: '65e84080a86f0fbf7adecc48',
    status: 'active',
    FAQ: []
  },
  OFFER_3: {
    _id: '65e84631a36428a88672cafd',
    price: 300,
    proficiencyLevel: ['Beginner'],
    title: 'Almoust free!',
    description: 'Lorem ipsum dolor sit amet consectetur',
    languages: ['English', 'Ukrainian'],
    authorRole: 'tutor',
    author: '65eedb5c7e23e7bf706df823',
    subject: '65e843aea36428a88672cae3',
    category: '65e84054a86f0fbf7adecc44',
    status: 'active',
    FAQ: []
  },
  OFFER_4: {
    _id: '65e888b6e8409662aefe029d',
    price: 300,
    proficiencyLevel: ['Beginner'],
    title: 'For those who wants to study',
    description: 'Lorem ipsum dolor sit amet consectetur',
    languages: ['English', 'Ukrainian'],
    authorRole: 'tutor',
    author: '65e9c135eaeff547eaab4208',
    subject: '65e843aea36428a88672cae3',
    category: '65e84054a86f0fbf7adecc44',
    status: 'active',
    FAQ: []
  },
  OFFER_5: {
    _id: '65f1472fc5123d4825e92f30',
    price: 49,
    proficiencyLevel: ['Beginner'],
    title: 'Learn Graphic Design Basics',
    description:
      'Join my course and learn the fundamentals of graphic design, including typography, color theory, and layout design.',
    languages: ['English'],
    authorRole: 'tutor',
    author: '65eee7a7950a86032074f976',
    subject: '65ee5227059f0c987e8c84ab',
    category: '64884f66fdc2d1a130c24aca',
    status: 'active',
    FAQ: [
      {
        question: 'Do I need any prior experience in design?',
        answer: 'No, this course is suitable for beginners.',
        _id: '65f1472fc5123d4825e92f31'
      },
      {
        question: 'Will I receive a certificate after completing the course?',
        answer: 'Yes, you will receive a certificate of completion.',
        _id: '65f1472fc5123d4825e92f32'
      }
    ]
  },
  OFFER_6: {
    _id: '65f1477dc5123d4825e92f33',
    price: 79,
    proficiencyLevel: ['Beginner'],
    title: 'Mastering Python Programming',
    description:
      'Take your Python skills to the next level with this advanced programming course. Learn about decorators, generators, and advanced data structures.',
    languages: ['English'],
    authorRole: 'tutor',
    author: '65eae677869f7634a9c6517e',
    subject: '65ee521f059f0c987e8c84a9',
    category: '64884f59fdc2d1a130c24ac8',
    status: 'active',
    FAQ: [
      {
        question: 'What prerequisites do I need for this course?',
        answer: 'You should have a good understanding of basic Python programming concepts.',
        _id: '65f1477dc5123d4825e92f34'
      },
      {
        question: 'Will there be any practical exercises?',
        answer: 'Yes, the course includes hands-on coding exercises to reinforce your learning.',
        _id: '65f1477dc5123d4825e92f35'
      }
    ]
  },
  OFFER_7: {
    _id: '65f147d0c5123d4825e92f36',
    price: 69,
    proficiencyLevel: ['Beginner'],
    title: 'Advanced Music Theory Workshop',
    description:
      'Delve into advanced music theory concepts such as modal interchange, chromatic mediants, and extended chords in this intensive workshop.',
    languages: ['English'],
    authorRole: 'tutor',
    author: '65eedb5c7e23e7bf706df823',
    subject: '65ee520f059f0c987e8c84a5',
    category: '64884fedfdc2d1a130c24ade',
    status: 'active',
    FAQ: [
      {
        question: 'Is this workshop suitable for beginners?',
        answer: 'No, this workshop is intended for intermediate to advanced musicians.',
        _id: '65f147d0c5123d4825e92f37'
      },
      {
        question: 'Will there be any live demonstrations?',
        answer: 'Yes, I will demonstrate advanced concepts on various instruments.',
        _id: '65f147d0c5123d4825e92f38'
      }
    ]
  }
}

module.exports = offers
